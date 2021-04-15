import PWCore, {
  Address,
  Amount,
  AmountUnit,
  Builder,
  BuilderOption,
  Cell,
  CellDep,
  DepType,
  OutPoint,
  RawTransaction,
  SUDTCollector,
  Transaction
} from '@lay2/pw-core';
import { CatCollector } from 'src/pw-code/catCollector';
import { SourlyCatType } from 'src/pw-code/SourlyCatType';
//包含这个cell所占的ckb。转的是整个cell存储空间。转账的时候，就是把A的lock换成B的lock，然后capacity这边再扣除一部分作为手续费
export class BatchCatBuilder extends Builder {
  constructor(
    private sudt: SourlyCatType,
    private address: Address,
    feeRate?: number,
    collector?: CatCollector,
    protected options: BuilderOption = {}
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    super(feeRate, collector, options.witnessArgs);
  }

  async build(): Promise<Transaction> {
    const outputCells: Cell[] = [];
    const inputCells: Cell[] = [];

    const totalSendAmount = new Amount('10', AmountUnit.ckb);

    const receiverSUDTCells = await this.collector.collectSUDT(
      this.sudt,
      PWCore.provider.address,
      {
        neededAmount: totalSendAmount
      }
    );
    if (!receiverSUDTCells || receiverSUDTCells.length < 1) {
      throw new Error('No live sudt cell to transfer');
    }
    let inputSum = Amount.ZERO;
    console.log(inputSum);
    const cell = receiverSUDTCells[0];
    inputCells.push(cell);
    console.log('inputCells', inputCells);
    inputSum = inputSum.add(new Amount('10', AmountUnit.ckb));
    console.log('inputSum', inputSum);
    const receiverOutputCell = cell.clone();
    console.log('receiverOutputCell', receiverOutputCell);
    receiverOutputCell.lock = this.address.toLockScript();
    outputCells.push(receiverOutputCell);
    console.log('outputCells', outputCells);
    if (!inputSum.eq(totalSendAmount)) {
      throw new Error(
        `SUDT amount is not meet,  expect ${totalSendAmount.toString(
          AmountUnit.shannon
        )}, but got ${inputSum.toString(AmountUnit.shannon)}`
      );
    }
    this.rectifyTx(inputCells, outputCells);
    let found = false;
    console.log(found, '---------this.fee-', this.fee);
    for (const outputCell of outputCells) {
      console.log(outputCell, '---------outputCell');
      console.log(outputCell.availableFee().gte(this.fee), 'this.fee');
      if (outputCell.availableFee().gte(this.fee)) {
        outputCell.capacity = outputCell.capacity.sub(this.fee);
        found = true;

        break;
      }
    }
    console.log(found, '---------found-');
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
    console.log(ckbCells);
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
    const outPoint = new OutPoint(
      '0x297fb72de7f76ba0784e63dff941b01cbbb372a26c0786d2d511ae9709d8ca57',
      '0x0'
    );
    const catCelldep = new CellDep(DepType.code, outPoint);
    const sudtCellDeps = [PWCore.config.defaultLock.cellDep, catCelldep];
    const tx = new Transaction(
      new RawTransaction(inputCells, outputCells, sudtCellDeps),
      [this.witnessArgs]
    );
    // console.log(this.witnessArgs.lock, this.witnessArgs.lock.length);
    this.fee = Builder.calcFee(tx, this.feeRate);
    console.log('-------------', this.fee, this.feeRate);
    // console.log(JSON.stringify(tx));
    console.log('---------------');
    return tx;
  }
}
