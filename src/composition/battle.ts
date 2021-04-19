/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import PWCore, {
  Address,
  AddressType,
  Amount,
  Builder,
  Cell
} from '@lay2/pw-core';
import { CatCollector } from 'src/composition/catCollector';
import { SourlyCatType } from 'src/composition/sourlyCatType';
import { apiPost } from './apiBase';
import { useConfig } from './baseConfig';
import { BattleBuilder } from './battle-builder';
import { getAttribute, setData, toHash } from './getHash';
import { BattleResult, BattleUsed, NTFAttr, NTFCat } from './interface';
import { sendTransaction } from './loginMetamask';
//输的一方要更改Hash, blake160(hash+lock_hash)
const max_fight_count = 3000;
async function getResult(
  winer: NTFCat,
  loser: NTFCat,
  winerAttr: NTFAttr,
  loserAttr: NTFAttr,
  count: number,
  start: string,
  mineWin: boolean
): Promise<BattleResult> {
  //胜者：小鱼干数量 +（败者HP*0.1）；name 和 hash 不变
  //败者：小鱼干数量 - （胜者ATK*0.1）；name 不变，hash 变成 hash( 原hash + 胜者 lock_hash )
  //当某 NFT 的小鱼干数量 === 0 时 小鱼干 + 999
  const afterWiner: NTFCat = {
    name: winer.name,
    hash: winer.hash,
    address: winer.address,
    fishes: winer.fishes,
    mine: winer.mine,
    output: winer.output
  };
  const afterLoser: NTFCat = {
    name: loser.name,
    hash: loser.hash,
    address: loser.address,
    fishes: loser.fishes,
    mine: loser.mine,
    output: loser.output
  };
  let winer_fishes = loserAttr.ph * 0.1;
  winer_fishes = parseInt(winer_fishes.toFixed());
  let loser_fishes = winerAttr.atk * 0.1;
  loser_fishes = parseInt(loser_fishes.toFixed());
  afterWiner.fishes = (parseInt(winer.fishes) + winer_fishes).toFixed();
  afterLoser.fishes = (parseInt(loser.fishes) - loser_fishes).toFixed();
  if (loser.fishes == '0') {
    loser.fishes = '999';
  }
  const output = winer.output as Cell;
  const lock = JSON.stringify(output.lock);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const lockData = JSON.parse(lock).code_hash;
  const loserHash = toHash(loser.hash, lockData);
  afterLoser.hash = loserHash;
  const output_data =
    '0x' +
    setData(loser.name, 16) +
    setData(loserHash, 20) +
    setData(afterLoser.fishes, 4);
  //   //todo data 更新

  // todo  更新后台数据库信息
  const state = await postBattleData(
    winer,
    loser,
    afterWiner,
    afterLoser,
    winer_fishes,
    loser_fishes,
    loserHash,
    output_data,
    count,
    start
  );
  return { winer, loser, afterWiner, afterLoser, mineWin, state };
}
export async function goBattle(mine: NTFCat, user: NTFCat) {
  const start = mine.name;
  //计算双方的挑战前属性值
  const mineAttr = getAttribute(mine.hash);
  const battleAttr = getAttribute(user.hash);
  // Hurt1 = ATK1*( 1 - DEF2/(DEF2 - LCK2*2 + 250) )
  const hurtMine =
    mineAttr.atk *
    (1 - battleAttr.def / (battleAttr.def - battleAttr.lck * 2 + 250));
  // Hurt2 = ATK2*( 1 - DEF1/(DEF1 - LCK1*2 + 250) )
  const hurtBattle =
    battleAttr.atk *
    (1 - mineAttr.def / (mineAttr.def - mineAttr.lck * 2 + 250));
  let userWin = false;
  let n = 0;
  let result;
  for (n = 0; n < max_fight_count; n++) {
    // 传入任意 n 值，满足下列两个条件之一，则可以确认战斗结果
    //n * Hurt1 >= 10 * HP2 且 (n-1) * Hurt2 < 10 * HP1 则 <被挑战者> 胜利
    if (
      hurtMine * n >= 10 * battleAttr.ph &&
      hurtBattle * (n - 1) < 10 * mineAttr.ph
    ) {
      console.log('battle win');
      userWin = true;
      result = await getResult(
        user,
        mine,
        battleAttr,
        mineAttr,
        n,
        start,
        userWin
      );
      break;
    } else if (
      hurtMine * n < 10 * battleAttr.ph &&
      hurtBattle * n >= 10 * mineAttr.ph
    ) {
      console.log('mine win');
      result = await getResult(
        mine,
        user,
        mineAttr,
        battleAttr,
        n,
        start,
        userWin
      );
      //n * Hurt1 < 10 * HP2 且 n * Hurt2 >= 10 * HP1 则 <挑战者> 胜利
      break;
    } else {
    }
  }
  let cat = setBattleRuest(
    result?.winer as NTFCat,
    result?.afterWiner as NTFCat
  );
  let mineCat = mine;
  let battleCat = user;
  userWin ? (cat.mine = false) : (cat.mine = true);
  userWin ? (battleCat = cat) : (mineCat = cat);
  console.log(cat, userWin);
  cat = setBattleRuest(result?.loser as NTFCat, result?.afterLoser as NTFCat);
  userWin ? (cat.mine = true) : (cat.mine = false);
  userWin ? (mineCat = cat) : (battleCat = cat);
  console.log(mineCat, battleCat);
  // await toBattleBuilder(mine, user, n.toString());
  return {
    battleCat,
    mineCat
  };
}
async function postBattleData(
  winer: NTFCat,
  loser: NTFCat,
  afterWiner: NTFCat,
  afterLoser: NTFCat,
  winnerFishes: number,
  loserFishes: number,
  txHash: string,
  output_data: string,
  count: number,
  start: string
) {
  const data = {
    winer,
    loser,
    afterWiner,
    afterLoser,
    winnerFishes,
    loserFishes,
    txHash,
    output_data,
    count,
    start
  };
  const res = await apiPost('/tx/battle', data, true);
  return (res as BattleUsed).state;
}

async function toBattleBuilder(mine: NTFCat, user: NTFCat, count: string) {
  const sudt = new SourlyCatType(
    '0x9ec9ae72e4579980e41554100f1219ff97599f8ab7e79c074b30f2fa241a790c'
  );
  // const addressMine = new Address(mine.address, AddressType.ckb);
  const addressUser = new Address(user.address, AddressType.ckb);
  // 挑战者 被挑战者
  const address = [addressUser];
  const amount = new Amount('1');
  // todo witnessArgs

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const witnessArgs = Builder.WITNESS_ARGS.RawSecp256k1;
  witnessArgs.input_type = '0x' + setData(count, 2);
  const options = {
    witnessArgs
  };
  const builder = new BattleBuilder(
    sudt,
    address,
    amount,
    1000,
    new CatCollector(useConfig().indexer_rpc),
    options,
    mine,
    user
  );
  console.log(builder);
  try {
    const txHash = await sendTransaction(builder);
    console.log(txHash);
  } catch (e) {
    console.log(e);
  }
}
function setBattleRuest(befor: NTFCat, after: NTFCat): NTFCat {
  const fishes = parseInt(after.fishes) - parseInt(befor.fishes);
  const battle = getAttribute('');
  const attr = getAttribute(after.hash);
  if (fishes < 0) {
    const beforAttr = getAttribute(befor.hash);
    battle.atk = attr.atk - beforAttr.atk;
    battle.lck = attr.lck - beforAttr.lck;
    battle.def = attr.def - beforAttr.def;
    battle.ph = attr.ph - beforAttr.ph;
  }
  battle.fishes = fishes;
  console.log('name', after.name);
  const cat = {
    battle,
    attr,
    name: after.name,
    address: after.address,
    hash: after.hash,
    fishes: after.fishes,
    mine: false,
    output: after.output
  };
  return cat;
}
