/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*
 * @Author: Aven
 * @Date: 2021-04-12 15:05:46
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-16 23:30:01
 * @Description:
 */

import { getHomeList, getCatInfoByName, getUserList, apiPost } from './apiBase';
import { showAddress, hexToByteArray } from './utils';
import PWCore from '@lay2/pw-core';
import { setCellData } from './getHash';
import { BattleCell, Cat, HomeCell, NTFCat, UserList } from './interface';

export async function getList() {
  const query = {};
  const cat = [];
  const data = (await (await getHomeList(query)).data) as HomeCell[];
  for (const item of data) {
    try {
      const data = JSON.parse(item.userdata) as Cat;
      cat.push(data);
    } catch (e) {
      continue;
    }
  }
  return cat;
}
export async function issuesCat(data: Record<string, string>) {
  const res = await apiPost('/user/issues', data, true);
  console.log(res);
  await setCellData(data);
}

export async function getUsetList(address: string) {
  if (!address) address = PWCore.provider.address.addressString;
  const query = { name: address };
  const data = (await (await getUserList(query)).data) as UserList;
  const cat = [];
  for (const item of data.list) {
    try {
      const data = JSON.parse(item.userdata) as Cat;
      data.output_data = item.output_data;
      cat.push(data);
    } catch (e) {
      continue;
    }
  }
  data.address = showAddress(address);
  data.list = cat;
  console.log(data);
  return data;
}

export async function getOneCat(name: string | null) {
  if (!name) {
    // 查询自己账户下的详情或者 创建小猫
    return {
      name: '',
      hash: '',
      address: '',
      fishes: '',
      mine: true,
      output_data: ''
    };
  }
  const data = await getCatInfoByName(name);
  const cat = JSON.parse((data.data as BattleCell).userdata) as NTFCat;
  cat.address = (data.data as BattleCell).address;
  cat.output_data = (data.data as BattleCell).output_data;
  cat.mine = false;
  const address = PWCore.provider.address.addressString;
  if (cat.address == address) cat.mine = true;
  return cat;
}
