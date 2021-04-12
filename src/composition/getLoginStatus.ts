/*
 * @Author: Aven
 * @Date: 2021-04-06 10:19:36
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-12 19:50:22
 * @Description:
 */
import {
  getToken,
  createUserInfo,
  CAT_DATA,
  getStorage,
  setStorage,
  getNameUsed
} from './apiBase';
import { Account, Cells } from './interface';
import { getLiveCell } from './rpcApi';
import { setCellData } from './getHash';
import PWCore from '@lay2/pw-core';
export function isLogin(): boolean {
  const token = getToken();
  if (token) return true;
  return false;
}
type UserData = {
  email: string;
  create_cat: number;
  address: string;
  fishes: number;
};
export async function login(
  ethAddress: string,
  address: string
): Promise<UserData | null> {
  // 后台服务器绑定地址
  const data = await createUserInfo({
    ethAddress,
    address
  });
  // todo 查询账户下的cells
  // void getLiveCell(account);
  return data;
}

export async function getNameIsUsed(name: string): Promise<boolean> {
  const data = await getNameUsed(name);
  const used = data.data.used;
  return used;
}
export async function putMyCell(name: string) {
  console.log(PWCore.provider.address.toLockScript());
  console.log(PWCore.provider.address.toLockScript().codeHash);
  const;
  const cell = await setCellData(name);
  // console.log(cell);
  // if (cell) return cell;
  // return used;
}
export function getUserInfo(): UserData | string | null {
  let data = getStorage(CAT_DATA);
  const cat = getStorage('cell');
  data = Object.assign(data, { cat });
  console.log(data);
  return data;
}

export function resetUserInfo(): void {
  const data = getStorage(CAT_DATA);
  console.log(data.create_cat);
  data.create_cat = parseInt(data.create_cat) - 1;
  setStorage(CAT_DATA, data);
}
export function updateMyCell(cells: unknown): void {
  console.log(cells);
}
