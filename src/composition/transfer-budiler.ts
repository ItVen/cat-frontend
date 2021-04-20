/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
  Transaction
} from '@lay2/pw-core';
import { CatCollector } from 'src/composition/catCollector';
import { SourlyCatType } from 'src/composition/sourlyCatType';
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
    console.log('eth账户地址，', PWCore.provider.address.addressString);
    console.log('账户地址，', PWCore.provider.address.toLockScript());
    const receiverSUDTCells = await (this
      .collector as CatCollector).collectSUDT(
      this.sudt,
      PWCore.provider.address,
      {
        neededAmount: totalSendAmount
      }
    );
    console.log('账户下的NTFCell', receiverSUDTCells);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!receiverSUDTCells || receiverSUDTCells.length < 1) {
      throw new Error('No live sudt cell to transfer');
    }
    let inputSum = Amount.ZERO;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const cell = receiverSUDTCells[0];
    console.log('转账的cell', cell);
    // cell.lock = PWCore.provider.address.toLockScript();
    inputCells.push(cell);
    console.log('放入输入数组', inputCells);
    inputSum = inputSum.add(new Amount('10', AmountUnit.ckb));
    const receiverOutputCell = cell.clone();
    receiverOutputCell.lock = this.address.toLockScript();
    console.log('转账方cell,克隆后 修改lock', receiverOutputCell);
    outputCells.push(receiverOutputCell);
    console.log('放入输入数组', outputCells);
    if (!inputSum.eq(totalSendAmount)) {
      throw new Error(
        `SUDT amount is not meet,  expect ${totalSendAmount.toString(
          AmountUnit.shannon
        )}, but got ${inputSum.toString(AmountUnit.shannon)}`
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
      '0x3c6fbb3bbda63274635df9304a7cc55913a5454aafecb34bbefe3f17209d5f63',
      '0x0'
    );
    const pw = new OutPoint(
      '0x57a62003daeab9d54aa29b944fc3b451213a5ebdf2e232216a3cfed0dde61b38',
      '0x0'
    );
    const catCelldep = new CellDep(DepType.code, outPoint);
    const pwCelldep = new CellDep(DepType.code, pw);
    const sudtCellDeps = [
      PWCore.config.defaultLock.cellDep,
      catCelldep,
      pwCelldep
    ];
    const tx = new Transaction(
      new RawTransaction(inputCells, outputCells, sudtCellDeps),
      [this.witnessArgs]
    );
    this.fee = Builder.calcFee(tx, this.feeRate);
    console.log('-------------', this.fee, this.feeRate);
    console.log(JSON.stringify(tx));
    console.log('---------------');
    return tx;
  }
}
