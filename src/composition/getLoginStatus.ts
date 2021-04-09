/*
 * @Author: Aven
 * @Date: 2021-04-06 10:19:36
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-09 09:49:05
 * @Description:
 */
import {
  getToken,
  createUserInfo,
  CAT_DATA,
  getStorage,
  getNameUsed
} from './apiBase';
import { Account, NameUsed, Cells } from './interface';
import { getLiveCell } from './rpcApi';
import { setCellData } from './getHash';
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
export async function login(account: Account): Promise<UserData | null> {
  // 后台服务器绑定地址
  console.log(account);
  const data = (await createUserInfo(
    account.email,
    account.address
  )) as UserData | null;
  // todo 查询账户下的cells
  void getLiveCell(account);
  return data;
}

export async function getNameIsUsed(name: string): Promise<Cells | boolean> {
  // todo 假数据
  // const data = await getNameUsed(name);
  // let used = (data.data as NameUsed).used;
  const data = null;
  let used = true;
  if (!data) {
    // todo 假数据
    used = false;
  }
  console.log(used);
  if (!used) {
    const cell = await setCellData(name);
    console.log(cell);
    if (cell) return cell;
    return false;
  } else {
  }
  return false;
}
export function getUserInfo(): UserData | string | null {
  const data = getStorage(CAT_DATA);

  return data;
}

export function updateMyCell(cells: unknown): void {
  console.log(cells);
}
