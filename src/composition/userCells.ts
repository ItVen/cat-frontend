/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*
 * @Author: Aven
 * @Date: 2021-04-08 12:06:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-19 17:12:21
 * @Description: cell create update delete
 */
import PWCore, {
  Cell,
  Amount,
  Address,
  AddressType,
  Builder
} from '@lay2/pw-core';
import { CatCollector } from 'src/composition/catCollector';
import { SourlyCatType } from 'src/composition/sourlyCatType';
import { apiGet } from './apiBase';
import { useConfig } from './baseConfig';
import { goBattle } from './battle';
import { BattleBuilder } from './battle-builder';
import { getAttribute } from './getHash';
import { ApiResponse, BattleCell, BattleCells, NTFCat } from './interface';
import { sendTransaction } from './loginMetamask';
import { getLiveCell } from './rpcApi';
import { BatchCatBuilder } from './transfer-budiler';

export function getAddress(): string {
  console.log(PWCore.provider.address.toLockScript());

  const address = PWCore.provider.address.addressString;
  return address;
}

export function getLockHash(): string {
  const hash = PWCore.provider.address.toLockScript().codeHash;
  return hash;
}

export async function getTransferBuilder(
  eth: string,
  count?: string
): Promise<string | boolean> {
  const address = new Address(eth, AddressType.ckb);
  const sudt = new SourlyCatType(
    '0x9ec9ae72e4579980e41554100f1219ff97599f8ab7e79c074b30f2fa241a790c'
  );
  const cells = await getLiveCell(PWCore.provider.address);
  console.log(cells);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const options = { witnessArgs: Builder.WITNESS_ARGS.RawSecp256k1 };
  const builder = new BatchCatBuilder(
    sudt,
    address,
    1000,
    new CatCollector(useConfig().indexer_rpc),
    options
  );
  let txHash = '0x';
  try {
    txHash = await sendTransaction(builder);
    console.log('txHash--', txHash);
  } catch (e) {
    console.log('e--', e);
    return false;
  }
  if (txHash.endsWith('0x')) return false;
  // todo 更新转账交易 from to tx
  return txHash;
}

export async function getBattleCell(name?: string) {
  const data = { name };
  const res = await apiGet('/user/battle', data, true);
  const success = (res?.data as ApiResponse).success;
  const resdata = (res?.data as ApiResponse).data as BattleCells;
  const battle = JSON.parse(resdata.battle.userdata) as NTFCat;
  battle.address = resdata.battle.address;
  battle.mine = false;
  battle.attr = getAttribute(battle.hash);
  battle.output = (resdata.battle.output as unknown) as Cell;
  battle.output_data = resdata.battle.output_data;
  if (success) {
    const mine = JSON.parse(resdata.mine.userdata) as NTFCat;
    mine.address = resdata.mine.address;
    mine.mine = true;
    mine.attr = getAttribute(mine.hash);
    mine.output = (resdata.mine.output as unknown) as Cell;
    mine.output_data = resdata.mine.output_data;
    return { mine, battle };
  } else {
    const mine = undefined;
    return { mine, battle };
  }
}
