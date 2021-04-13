/* eslint-disable @typescript-eslint/restrict-plus-operands */
import PWCore, {
  Address,
  Amount,
  AmountUnit,
  Builder,
  Cell,
  Collector,
  RawTransaction,
  SUDT,
  SUDTCollector,
  Transaction
} from '@lay2/pw-core';

export class BatchCoffeeBuilder extends Builder {
  constructor(
    private sudt: SUDT,
    private addressList: Address[],
    feeRate?: number,
    collector?: SUDTCollector
  ) {
    super(feeRate, collector);
  }

  async build(): Promise<Transaction> {
    const inputCells = [];
    const outputCells = [];
    let inputSUDTSum = Amount.ZERO;

    const totalSendAmount = new Amount(
      this.addressList.length + '',
      AmountUnit.shannon
    );

    const receiverSUDTCells = await (this
      .collector as SUDTCollector).collectSUDT(
      this.sudt,
      PWCore.provider.address,
      {
        neededAmount: totalSendAmount
      }
    );

    console.log('receiverSUDTCells', receiverSUDTCells);

    if (!receiverSUDTCells || receiverSUDTCells.length < 1) {
      throw new Error('No live sudt cell to transfer');
    }

    for (let i = 0; i < this.addressList.length; i++) {
      const cell = receiverSUDTCells[i];
      inputSUDTSum = inputSUDTSum.add(cell.getSUDTAmount());
      inputCells.push(cell);

      const receiverOutputCell = cell.clone();
      receiverOutputCell.lock = this.addressList[i].toLockScript();
      outputCells.push(receiverOutputCell);

      if (inputSUDTSum.gte(totalSendAmount)) {
        break;
      }
    }

    if (!inputSUDTSum.eq(totalSendAmount)) {
      throw new Error(
        `SUDT amount is not meet,  expect ${totalSendAmount.toString(
          AmountUnit.shannon
        )}, but got ${inputSUDTSum.toString(AmountUnit.shannon)}`
      );
    }

    this.rectifyTx(inputCells, outputCells);
    let found = false;
    for (const outputCell of outputCells) {
      if (outputCell.availableFee().gte(this.fee)) {
        outputCell.capacity = outputCell.capacity.sub(this.fee);
        found = true;
        break;
      }
    }

    // outputCells[0].capacity = outputCells[0].capacity.sub(this.fee);
    if (found) {
      return this.rectifyTx(inputCells, outputCells);
    }

    // fetch pure ckb cell to pay tx fee
    const ckbCells = await this.collector.collect(PWCore.provider.address, {
      neededAmount: this.fee.add(Builder.MIN_CHANGE).add(Builder.MIN_CHANGE)
    });
    if (!ckbCells || ckbCells.length < 1) {
      throw new Error('no ckb to pay tx fee');
    }

    let inputSumCKB = Amount.ZERO;
    for (const cell of ckbCells) {
      inputCells.push(cell);
      inputSumCKB = inputSumCKB.add(cell.capacity);
    }

    const changeCell = ckbCells[0].clone();
    changeCell.capacity = inputSumCKB;
    outputCells.push(changeCell);

    this.rectifyTx(inputCells, outputCells);
    changeCell.capacity = changeCell.capacity.sub(this.fee);
    if (changeCell.capacity.lt(Builder.MIN_CHANGE)) {
      throw new Error('no cell to pay ');
    }

    return this.rectifyTx(inputCells, outputCells);
  }

  private rectifyTx(inputCells: Cell[], outputCells: Cell[]) {
    const sudtCellDeps = [
      PWCore.config.defaultLock.cellDep,
      PWCore.config.pwLock.cellDep,
      PWCore.config.sudtType.cellDep
    ];
    const tx = new Transaction(
      new RawTransaction(inputCells, outputCells, sudtCellDeps),
      [Builder.WITNESS_ARGS.RawSecp256k1]
    );

    this.fee = Builder.calcFee(tx, this.feeRate);
    return tx;
  }
}
