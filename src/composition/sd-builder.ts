/*
 * @Author: Aven
 * @Date: 2021-04-11 20:26:15
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-11 22:42:15
 * @Description: 
 */
import PWCore, {
  Builder,
  Transaction,
  Cell,
  RawTransaction,
  Amount,
  AmountUnit
} from '@lay2/pw-core';
export default class SDBuilder extends Builder {
  constructor(public inputCell: Cell, public outputCell: Cell) {
    super();
  }
  // async build(fee: Amount = Amount.ZERO): Promise<Transaction> {
  //   console.log(this.outputCell);
  //   console.log(this.inputCell);
  //   const inputCells = [];
  //   let inputSum;
  //   if (this.inputCell) {
  //     inputCells.push(this.inputCell);
  //   }
  //   let neededAmount;
  //   if (fee) neededAmount = fee;
  //   if (!this.inputCell) {
  //     // if no inputCell provided, we need to get all the capacity from unspent cells
  //     neededAmount = !neededAmount
  //       ? this.outputCell.capacity
  //       : neededAmount.add(this.outputCell.capacity);
  //   } else if (this.outputCell) {
  //     if (this.inputCell.capacity.lt(this.outputCell.capacity)) {
  //       // if new cell is bigger than the old one, we need extra input cells
  //       neededAmount = !neededAmount
  //         ? this.outputCell.capacity
  //         : neededAmount.add(
  //             this.outputCell.capacity.sub(this.inputCell.capacity)
  //           );
  //     }
  //   }
  //   let changeCell = this.inputCell;
  //   if (neededAmount) {
  //     // we need to fetch unspent cells
  //     console.log(
  //       '[sd-builder] neededAmount ',
  //       neededAmount.toString(AmountUnit.ckb)
  //     );

  //     const cells = await this.collector.collect(PWCore.provider.address, {
  //       neededAmount,
  //       withData: false
  //     });

  //     let sum = Amount.ZERO;

  //     for (const cell of cells) {
  //       inputCells.push(cell);
  //       sum = sum.add(cell.capacity);
  //       if (sum.gt(neededAmount)) break;
  //     }

  //     if (sum.lt(neededAmount)) {
  //       throw new Error(
  //         `[1] input capacity not enough, need ${neededAmount.toString(
  //           AmountUnit.ckb
  //         )}, got ${sum.toString(AmountUnit.ckb)}`
  //       );
  //     }

  //     inputSum = this.inputCell ? sum.add(this.inputCell.capacity) : sum;

  //     changeCell = new Cell(
  //       inputSum.sub(this.outputCell.capacity),
  //       PWCore.provider.address.toLockScript()
  //     );
  //   }
  //   const outputCells = [changeCell];
  //   if (this.outputCell) {
  //     if (changeCell.capacity.lt(Builder.MIN_CHANGE)) {
  //       // Change cell is too small, so we merge it into the output cell.
  //       this.outputCell.capacity.add(changeCell.capacity);
  //       outputCells.pop();
  //     }
  //     outputCells.unshift(this.outputCell);
  //   }
  //   const tx = new Transaction(new RawTransaction(inputCells, outputCells), [
  //     Builder.WITNESS_ARGS.Secp256k1
  //   ]);

  //   this.fee = Builder.calcFee(tx);

  //   const lastCell = outputCells[outputCells.length - 1];
  //   if (this.fee.add(Builder.MIN_CHANGE).gt(lastCell.capacity)) {
  //     // if the last cell (either a change cell or the data cell itself) is too small,
  //     // we add the fee from this round and build again.
  //     return this.build(this.fee);
  //   }
  //   lastCell.capacity = lastCell.capacity.sub(this.fee);
  //   tx.raw.outputs.pop();
  //   tx.raw.outputs.push(lastCell);

  //   console.log('[sd-builder] tx: ', tx);

  //   lastCell.capacity = lastCell.capacity.sub(this.fee);
  //   tx.raw.outputs.pop();
  //   tx.raw.outputs.push(lastCell);
  //   console.log('[sd-builder] tx: ', tx);
  //   return this.build(this.fee);
  // }

  async build(fee: Amount = Amount.ZERO): Promise<Transaction> {
    console.log(this.outputCell);
    console.log(this.inputCell);
    const inputCells = [];
    let inputSum;
    if (this.inputCell) {
      inputCells.push(this.inputCell);
    }
    let neededAmount;
    if (fee) neededAmount = fee;
    if (!this.inputCell) {
      // if no inputCell provided, we need to get all the capacity from unspent cells
      neededAmount = !neededAmount
        ? this.outputCell.capacity
        : neededAmount.add(this.outputCell.capacity);
    } else if (this.outputCell) {
      if (this.inputCell.capacity.lt(this.outputCell.capacity)) {
        // if new cell is bigger than the old one, we need extra input cells
        neededAmount = !neededAmount
          ? this.outputCell.capacity
          : neededAmount.add(
              this.outputCell.capacity.sub(this.inputCell.capacity)
            );
      }
    }
    let changeCell = this.inputCell;
    if (neededAmount) {
      // we need to fetch unspent cells
      console.log(
        '[sd-builder] neededAmount ',
        neededAmount.toString(AmountUnit.ckb)
      );

      const cells = await this.collector.collect(PWCore.provider.address, {
        neededAmount,
        withData: false
      });

      let sum = Amount.ZERO;

      for (const cell of cells) {
        inputCells.push(cell);
        sum = sum.add(cell.capacity);
        if (sum.gt(neededAmount)) break;
      }

      if (sum.lt(neededAmount)) {
        throw new Error(
          `[1] input capacity not enough, need ${neededAmount.toString(
            AmountUnit.ckb
          )}, got ${sum.toString(AmountUnit.ckb)}`
        );
      }

      inputSum = this.inputCell ? sum.add(this.inputCell.capacity) : sum;

      changeCell = new Cell(
        inputSum.sub(this.outputCell.capacity),
        PWCore.provider.address.toLockScript()
      );
    }
    const outputCells = [changeCell];
    if (this.outputCell) {
      if (changeCell.capacity.lt(Builder.MIN_CHANGE)) {
        // Change cell is too small, so we merge it into the output cell.
        this.outputCell.capacity.add(changeCell.capacity);
        outputCells.pop();
      }
      outputCells.unshift(this.outputCell);
    }
    const tx = new Transaction(new RawTransaction(inputCells, outputCells), [
      Builder.WITNESS_ARGS.Secp256k1
    ]);

    this.fee = Builder.calcFee(tx);

    const lastCell = outputCells[outputCells.length - 1];
    if (this.fee.add(Builder.MIN_CHANGE).gt(lastCell.capacity)) {
      // if the last cell (either a change cell or the data cell itself) is too small,
      // we add the fee from this round and build again.
      return this.build(this.fee);
    }
    lastCell.capacity = lastCell.capacity.sub(this.fee);
    tx.raw.outputs.pop();
    tx.raw.outputs.push(lastCell);

    console.log('[sd-builder] tx: ', tx);

    lastCell.capacity = lastCell.capacity.sub(this.fee);
    tx.raw.outputs.pop();
    tx.raw.outputs.push(lastCell);
    console.log('[sd-builder] tx: ', tx);
    return this.build(this.fee);
  }
  getCollector() {
    return this.collector;
  }
}
