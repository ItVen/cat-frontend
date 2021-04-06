/*
 * @Author: Aven
 * @Date: 2021-04-06 10:19:36
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-06 23:35:26
 * @Description:
 */
import { getToken, createUserInfo, CAT_DATA, getStorage } from './apiBase';

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
export async function login(email: string, address: string): Promise<UserData> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: UserData = await createUserInfo(email, address);
  return data;
}

export function getUserInfo(): UserData {
  const data: UserData = getStorage(CAT_DATA);
  return data;
}
