import PWCore, {
  Address,
  Amount,
  AmountUnit,
  Builder,
  BuilderOption,
  Cell,
  RawTransaction,
  Transaction
} from '@lay2/pw-core';
import { CatCollector } from 'src/pw-code/catCollector';
import { SourlyCatType } from 'src/pw-code/SourlyCatType';

export class BattleBuilder extends Builder {
  receiverInputCell: Cell | undefined;
  receiverOutputCell: Cell | undefined;

  constructor(
    private sudt: SourlyCatType,
    protected address: Address,
    protected amount: Amount,
    collector?: CatCollector,
    protected options: BuilderOption = {}
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    super(options.feeRate, options.collector, options.witnessArgs);
  }
  async build(): Promise<Transaction> {
    console.log(this.collector);
    const receiverCells = await this.collector.collect(this.address, {
      neededAmount: new Amount('1', AmountUnit.shannon)
    });
    console.log(receiverCells);
    if (!receiverCells || receiverCells.length === 0) {
      throw new Error('The receiver has no sudt cell');
    }
    this.receiverInputCell = receiverCells[0];
    console.log(this.receiverInputCell, 'receiverInputCell');
    this.receiverOutputCell = this.receiverInputCell.clone();
    console.log(this.receiverOutputCell, 'receiverOutputCell');
    this.receiverOutputCell.capacity = new Amount('1', AmountUnit.shannon);
    console.log(this.receiverOutputCell.capacity, 'receiverOutputCell');
    return this.buildSenderCells();
  }
  async buildSenderCells(fee: Amount = Amount.ZERO): Promise<Transaction> {
    const neededAmount = this.amount.add(Builder.MIN_CHANGE).add(fee);
    console.log(neededAmount, 'neededAmount');
    let inputSum = new Amount('62').add(fee);
    console.log(inputSum, 'inputSum');
    const inputCells: Cell[] = [];
    // fill the inputs
    const cells = await this.collector.collect(PWCore.provider.address, {
      neededAmount
    });

    for (const cell of cells) {
      inputCells.push(cell);
      inputSum = inputSum.add(cell.capacity);
      if (inputSum.gt(neededAmount)) break;
    }

    if (inputSum.lt(neededAmount)) {
      throw new Error(
        `input capacity not enough, need ${neededAmount.toString(
          AmountUnit.ckb
        )}, got ${inputSum.toString(AmountUnit.ckb)}`
      );
    }

    const changeCell = new Cell(
      inputSum.sub(this.amount),
      PWCore.provider.address.toLockScript()
    );

    const tx = new Transaction(
      new RawTransaction(
        [...inputCells, this.receiverInputCell],
        [this.receiverOutputCell, changeCell]
      ),
      [this.witnessArgs]
    );

    this.fee = Builder.calcFee(tx, this.feeRate);

    if (changeCell.capacity.gte(Builder.MIN_CHANGE.add(this.fee))) {
      changeCell.capacity = changeCell.capacity.sub(this.fee);
      tx.raw.outputs.pop();
      tx.raw.outputs.push(changeCell);
      return tx;
    }

    return this.buildSenderCells(this.fee);
  }
}
