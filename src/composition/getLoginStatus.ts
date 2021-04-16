/*
 * @Author: Aven
 * @Date: 2021-04-06 10:19:36
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-16 18:12:58
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
import { setCellData } from './getHash';
import PWCore from '@lay2/pw-core';
import { NameUsed } from './interface';
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
export async function login(ethAddress: string, address: string) {
  // 后台服务器绑定地址
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await createUserInfo({
    ethAddress,
    address
  });
  // todo 查询账户下的cells
  // void getLiveCell(account);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
}

export async function getNameIsUsed(name: string): Promise<boolean> {
  const data = await getNameUsed(name);
  const used = (data.data as NameUsed).used;
  return used;
}

export function getUserInfo() {
  let data = getStorage(CAT_DATA);
  const cat = getStorage('cell');
  data = Object.assign(data, { cat });
  return data;
}

export function updateMyCell(cells: unknown): void {
  console.log(cells);
}
