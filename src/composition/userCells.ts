/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*
 * @Author: Aven
 * @Date: 2021-04-08 12:06:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-19 22:37:41
 * @Description: cell create update delete
 */
import PWCore, { Cell } from '@lay2/pw-core';
import { apiGet } from './apiBase';
import { getAttribute } from './getHash';
import { ApiResponse, BattleCells, NTFCat } from './interface';
import { ShowLiveCat } from './loginMetamask';

export function getAddress(): string {
  console.log(PWCore.provider.address.toLockScript());

  const address = PWCore.provider.address.addressString;
  return address;
}

export function getLockHash(): string {
  const hash = PWCore.provider.address.toLockScript().codeHash;
  return hash;
}
export async function getBattleCell(name?: string) {
  const live = await ShowLiveCat();
  console.log(live);
  if (!name) name = '雷兔';
  const data = { name };
  const res = await apiGet('/user/battle', data, true);
  const success = (res?.data as ApiResponse).success;
  const resdata = (res?.data as ApiResponse).data as BattleCells;
  const battle = JSON.parse(resdata.battle.userdata) as NTFCat;
  battle.address = resdata.battle.address;
  battle.mine = false;
  battle.attr = getAttribute(battle.hash);
  battle.battle = getAttribute('');
  battle.output = (resdata.battle.output as unknown) as Cell;
  battle.output_data = resdata.battle.output_data;
  if (live && success) {
    const mine = live as NTFCat;
    mine.battle = getAttribute('');
    return { mine, battle };
  } else {
    const mine = undefined;
    return { mine, battle };
  }
}
