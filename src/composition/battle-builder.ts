/*
 * @Author: Aven
 * @Date: 2021-04-16 02:18:43
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-16 12:37:10
 * @Description:
 */
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
import { CatCollector } from 'src/pw-code/catCollector';
import { SourlyCatType } from 'src/pw-code/SourlyCatType';
import { NTFCat } from './interface';

export class BattleBuilder extends Builder {
  mineCat: NTFCat;
  userCat: NTFCat;
  constructor(
    private sudt: SourlyCatType,
    protected address: Address[],
    protected amount: Amount,
    collector?: CatCollector,
    protected options: BuilderOption = {},
    private mines: NTFCat,
    private user: NTFCat
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    super(options.feeRate, options.collector, options.witnessArgs);
    this.mineCat = mines;
    this.userCat = user;
  }
  // 被挑战者的输入cell和输出cell对应第一位 input[] output[]
  // 挑战者的都在第二位 input[] output[]
  async build(): Promise<Transaction> {
    let outputCells: Cell[] = [];
    let inputCells: Cell[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const cellMine = await this.collector.collectSUDT(
      this.sudt,
      this.address[0],
      { neededAmount: new Amount('1', AmountUnit.shannon) }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const cellUser = await this.collector.collectSUDT(
      this.sudt,
      this.address[1],
      { neededAmount: new Amount('1', AmountUnit.shannon) }
    );
    const mineInputCell = cellMine[0];
    const mineOuputCell = mineInputCell.clone();
    const userInputCell = cellUser[0];
    const userOuputCell = userInputCell.clone();
    inputCells = [mineInputCell, userInputCell];
    outputCells = [mineOuputCell, userOuputCell];
    // todo 费率
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
    console.log(JSON.stringify(tx));
    console.log('---------------');
    return tx;
  }
}
