import { getAttribute, toHash } from './getHash';
import { NTFAttr, NTFCat } from './interface';
//输的一方要更改Hash, blake160(hash+lock_hash)
const max_fight_count = 300;
function getResult(
  winer: NTFCat,
  loser: NTFCat,
  winerAttr: NTFAttr,
  loserAttr: NTFAttr
) {
  //胜者：小鱼干数量 +（败者HP*0.1）；name 和 hash 不变
  //败者：小鱼干数量 - （胜者ATK*0.1）；name 不变，hash 变成 hash( 原hash + 胜者 lock_hash )
  //当某 NFT 的小鱼干数量 === 0 时 小鱼干 + 999
  const winer_fishes = loserAttr.ph * 0.1;
  winer.fishes += winer_fishes;

  const loser_fishes = winerAttr.atk * 0.1;
  loser.fishes = loser.fishes - loser_fishes;
  if (loser.fishes === 0) {
    loser.fishes = 999;
  }
  if (winer.lock_hash) {
    const loserHash = toHash(loser.hash + winer.lock_hash);
    loser.hash = loserHash;
  }
  console.log(
    winer_fishes,
    loser_fishes,
    winer.fishes,
    loser.fishes,
    loser.hash
  );
  return { winer, loser };
}
export function goBattle(mine: NTFCat, user: NTFCat) {
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
      getResult(user, mine, battleAttr, mineAttr);
      break;
    } else if (
      hurtMine * n < 10 * battleAttr.ph &&
      hurtBattle * n >= 10 * mineAttr.ph
    ) {
      console.log('mine win');
      getResult(mine, user, mineAttr, battleAttr);
      break;
      //n * Hurt1 < 10 * HP2 且 n * Hurt2 >= 10 * HP1 则 <挑战者> 胜利
    } else {
      console.log('回合+1');
    }
  }
  console.log('n==', n, userWin);
}
