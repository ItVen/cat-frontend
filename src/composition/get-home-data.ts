/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*
 * @Author: Aven
 * @Date: 2021-04-12 15:05:46
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-13 01:18:02
 * @Description:
 */
import {
  getToken,
  createUserInfo,
  CAT_DATA,
  getStorage,
  setStorage
} from './apiBase';
import { getHomeList, getCatInfoByName, getUserList } from './apiBase';
import { showAddress, hexToByteArray } from './utils';
import PWCore, { Account } from '@lay2/pw-core';

export async function getList(): Promise<Record<string, unknown>[]> {
  const query = {};
  const cat = [];
  const data = await getHomeList(query);
  for (const item of data.data) {
    const dd = hexToByteArray(item.output_data)
      .map(char => String.fromCharCode(char))
      .join('');
    cat.push(JSON.parse(dd));
  }
  return cat;
}

export async function getUsetList(
  address: string
): Promise<Record<string, unknown>[]> {
  if (!address) address = PWCore.provider.address.toCKBAddress();
  const query = { name: address };
  let data = await getUserList(query);
  data = data.data;
  const cat = [];
  for (const item of data.list) {
    const dd = hexToByteArray(item.output_data)
      .map(char => String.fromCharCode(char))
      .join('');
    cat.push(JSON.parse(dd));
  }
  data.address = showAddress(address);
  data.list = cat;
  console.log(data);
  return data;
}

export async function getOneCat(
  name: string | null
): Promise<Record<string, unknown>> {
  let cat = {};
  if (!name) {
    // 查询自己账户下的详情或者 创建小猫
    return cat;
  }
  const data = await getCatInfoByName(name);
  cat = hexToByteArray(data.data.output_data)
    .map(char => String.fromCharCode(char))
    .join('');
  cat = JSON.parse(cat);
  console.log(cat);
  return cat;
}
