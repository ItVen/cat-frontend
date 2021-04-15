/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*
 * @Author: Aven
 * @Date: 2021-04-08 12:06:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-12 11:04:57
 * @Description: cell create update delete
 */
import PWCore, {
  Cell,
  Amount,
  Address,
  AddressType,
  Builder
} from '@lay2/pw-core';
import { CatCollector } from 'src/pw-code/catCollector';
import { SourlyCatType } from 'src/pw-code/SourlyCatType';
import { apiGet } from './apiBase';
import { useConfig } from './baseConfig';
import { goBattle } from './battle';
import { BattleBuilder } from './battle-builder';
import { ApiResponse, NTFCat } from './interface';
import { sendTransaction } from './loginMetamask';
import { getLiveCell } from './rpcApi';
import { BatchCatBuilder } from './transfer-budiler';

export function setCell(
  mode: string,
  cell?: Cell | null,
  data?: string
): Promise<Record<string, unknown>> {
  let inputCell: Cell;
  let outputCell: Cell;
  if (mode === 'delete' || mode === 'update') {
    if (cell) {
      inputCell = cell;
      inputCell.setHexData('0x');
    }
  }
  if (mode === 'create' || mode === 'update') {
    outputCell = new Cell(
      new Amount('200'),
      PWCore.provider.address.toLockScript()
    );
    if (data) {
      if (data.startsWith('0x')) {
        outputCell.setHexData(data);
      } else {
        outputCell.setData(data);
      }
    }
    outputCell.resize();
  }
  return { inputCell, outputCell };
}

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
  count: string
): Promise<string> {
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
  try {
    const txHash = await sendTransaction(builder);
    console.log(txHash);
  } catch (e) {
    console.log(e);
  }

  // return txHash;
}

export function getBattleBuilder(mine: NTFCat, battle: NTFCat) {
  goBattle(mine, battle);
}
export async function toBattleBuilder(
  winer: NTFCat,
  loser: NTFCat,
  winer_fishes: number,
  loser_fishes: number
) {
  winer.fishes = (parseInt(winer.fishes) + winer_fishes).toFixed();
  loser.fishes = (parseInt(loser.fishes) - loser_fishes).toFixed();
  if (loser.fishes == '0') {
    loser.fishes = '999';
  }
  if (winer.lock_hash) {
    const loserHash = toHash(loser.hash + winer.lock_hash);
    afterLoser.hash = loserHash;
  }
  const sudt = new SourlyCatType(
    '0x9ec9ae72e4579980e41554100f1219ff97599f8ab7e79c074b30f2fa241a790c'
  );
  const address = new Address(battle.address, AddressType.ckb);
  console.log(address);
  const amount = new Amount('1');
  const data = ''; // todo battle的data
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const options = { witnessArgs: Builder.WITNESS_ARGS.RawSecp256k1 };
  const builder = new BattleBuilder(
    sudt,
    address,
    amount,
    new CatCollector(useConfig().indexer_rpc),
    options
  );
  console.log(builder);
  try {
    const txHash = await sendTransaction(builder);
    console.log(txHash);
  } catch (e) {
    console.log(e);
  }
}
export async function getBattleCell(name: string) {
  const data = { name };
  const res = await apiGet('/user/battle', data, true);
  console.log(res);
  const resdata = (res?.data as ApiResponse).data;
  const mine = JSON.parse(resdata.mine.userdata);
  mine.address = resdata.mine.address;
  mine.mine = true;
  mine.output = resdata.mine.output;
  const battle = JSON.parse(resdata.battle.userdata);
  battle.address = resdata.battle.address;
  battle.mine = false;
  battle.output = resdata.battle.output;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { mine, battle };
}
