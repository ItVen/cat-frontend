/* eslint-disable @typescript-eslint/no-unsafe-call */
/*
 * @Author: Aven
 * @Date: 2021-04-16 02:18:43
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-21 15:24:34
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
import { CatCollector } from 'src/composition/catCollector';
import { SourlyCatType } from 'src/composition/sourlyCatType';
import { NTFCat } from './interface';

export class BattleBuilder extends Builder {
  receiverInputCell!: Cell;
  receiverOutputCell!: Cell;

  constructor(
    private sudt: SourlyCatType,
    protected address: Address[],
    protected amount: Amount,
    feeRate?: number,
    collector?: CatCollector,
    protected options: BuilderOption = {},
    protected output_data: string,
    protected userWin: boolean
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    super(feeRate, collector, options.witnessArgs);
  }
  // 被挑战者的输入cell和输出cell对应第一位 input[] output[]
  // 挑战者的都在第二位 input[] output[]
  async build(): Promise<Transaction> {
    console.log(this.output_data, this.userWin);
    const inputCells = [];
    let outputCells = [];
    let inputCKBSum = Amount.ZERO;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userCells = await (this.collector as CatCollector).collectSUDT(
      this.sudt,
      this.address[0],
      {
        neededAmount: new Amount('1', AmountUnit.shannon)
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const mineCells = await (this.collector as CatCollector).collectSUDT(
      this.sudt,
      PWCore.provider.address,
      {
        neededAmount: new Amount('10', AmountUnit.shannon)
      }
    );
    console.log(mineCells, 'mine', userCells, 'userCells');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!userCells || userCells.length === 0) {
      throw new Error('The userCells has no sudt cell');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userCellInput = userCells[0]; //被挑战者
    const userCelloutPut = userCellInput.clone();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const mineCellInput = mineCells[0]; // 挑战者
    const mineCelloutPut = mineCellInput.clone();
    if (this.userWin) {
      mineCelloutPut.setHexData(this.output_data);
    } else {
      userCelloutPut.setHexData(this.output_data);
    }
    mineCelloutPut.lock = PWCore.provider.address.toLockScript();
    inputCKBSum = inputCKBSum.add(mineCellInput.capacity);
    const ckbAmount = new Amount('10', AmountUnit.shannon);

    mineCelloutPut.capacity = inputCKBSum.sub(ckbAmount);
    inputCells.push(userCellInput); //被挑战者
    inputCells.push(mineCellInput); // 挑战者

    // outputCells.push();
    outputCells = [userCelloutPut, mineCelloutPut];
    // todo
    this.rectifyTx(inputCells, outputCells);
    mineCelloutPut.capacity = mineCelloutPut.capacity.sub(this.fee);
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
      // [Builder.WITNESS_ARGS.Secp256k1]
      [this.witnessArgs, this.witnessArgs]
    );
    tx.witnesses[0] = '0x';

    // console.log(this.witnessArgs.lock, this.witnessArgs.lock.length);
    this.fee = Builder.calcFee(tx, this.feeRate);
    console.log(JSON.stringify(tx), '------rectifyTx');
    return tx;
  }
}
