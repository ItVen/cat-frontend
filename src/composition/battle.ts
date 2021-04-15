import { apiPost } from './apiBase';
import { getAttribute, setData, toHash } from './getHash';
import { NTFAttr, NTFCat } from './interface';
import { toBattleBuilder } from './userCells';
//输的一方要更改Hash, blake160(hash+lock_hash)
const max_fight_count = 3000;
async function getResult(
  winer: NTFCat,
  loser: NTFCat,
  winerAttr: NTFAttr,
  loserAttr: NTFAttr,
  count: number,
  start: string
) {
  //胜者：小鱼干数量 +（败者HP*0.1）；name 和 hash 不变
  //败者：小鱼干数量 - （胜者ATK*0.1）；name 不变，hash 变成 hash( 原hash + 胜者 lock_hash )
  //当某 NFT 的小鱼干数量 === 0 时 小鱼干 + 999
  const afterWiner = {
    name: winer.name,
    hash: winer.hash,
    address: winer.address,
    fishes: winer.fishes,
    mine: winer.mine,
    output: winer.output
  };
  const afterLoser = {
    name: winer.name,
    hash: winer.hash,
    address: winer.address,
    fishes: winer.fishes,
    mine: winer.mine,
    output: winer.output
  };
  let winer_fishes = loserAttr.ph * 0.1;
  winer_fishes = parseInt(winer_fishes.toFixed());
  let loser_fishes = winerAttr.atk * 0.1;
  loser_fishes = parseInt(loser_fishes.toFixed());
  afterWiner.fishes = (parseInt(winer.fishes) + winer_fishes).toFixed();
  afterLoser.fishes = (parseInt(loser.fishes) - loser_fishes).toFixed();
  console.log(winer_fishes, loser_fishes, afterWiner.fishes, afterLoser.fishes);
  if (loser.fishes == '0') {
    loser.fishes = '999';
  }
  const output = winer.output;
  const loserHash = toHash(loser.hash, output.lock.codeHash);
  afterLoser.hash = loserHash;
  const output_data =
    '0x' +
    setData(loser.name, 16) +
    setData(loserHash, 20) +
    setData(afterLoser.fishes, 4);
  //   //todo data 更新
  // todo buider 提交()
  //   await toBattleBuilder(winer, loser, winer_fishes, loser_fishes);
  // todo  更新后台数据库信息
  await postBattleData(
    winer,
    loser,
    afterWiner,
    afterLoser,
    winer_fishes,
    loser_fishes,
    '11',
    output_data,
    count,
    start
  );
  return { winer, loser };
}
export async function goBattle(mine: NTFCat, user: NTFCat) {
  const start = mine.name;
  console.log(mine.fishes, user.fishes, 'goBattle');
  //计算双方的挑战前属性值
  const mineAttr = getAttribute(mine.hash);
  const battleAttr = getAttribute(user.hash);
  console.log(mineAttr, battleAttr);
  // Hurt1 = ATK1*( 1 - DEF2/(DEF2 - LCK2*2 + 250) )
  const hurtMine =
    mineAttr.atk *
    (1 - battleAttr.def / (battleAttr.def - battleAttr.lck * 2 + 250));
  // Hurt2 = ATK2*( 1 - DEF1/(DEF1 - LCK1*2 + 250) )
  const hurtBattle =
    battleAttr.atk *
    (1 - mineAttr.def / (mineAttr.def - mineAttr.lck * 2 + 250));
  console.log(hurtMine, hurtBattle);
  let userWin = false;
  let n = 0;
  for (n = 0; n < max_fight_count; n++) {
    console.log(n, max_fight_count);
    // 传入任意 n 值，满足下列两个条件之一，则可以确认战斗结果
    //n * Hurt1 >= 10 * HP2 且 (n-1) * Hurt2 < 10 * HP1 则 <被挑战者> 胜利
    if (
      hurtMine * n >= 10 * battleAttr.ph &&
      hurtBattle * (n - 1) < 10 * mineAttr.ph
    ) {
      console.log('battle win');
      userWin = true;
      await getResult(user, mine, battleAttr, mineAttr, n, start);
      break;
    } else if (
      hurtMine * n < 10 * battleAttr.ph &&
      hurtBattle * n >= 10 * mineAttr.ph
    ) {
      console.log('mine win');
      await getResult(mine, user, mineAttr, battleAttr, n, start);
      break;
      //n * Hurt1 < 10 * HP2 且 n * Hurt2 >= 10 * HP1 则 <挑战者> 胜利
    } else {
      console.log('回合+1');
    }
  }
  console.log('n==', n, userWin);
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
  console.log(JSON.stringify(data));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const res = await apiPost('/tx/battle', data, true);
  console.log(res);
}
