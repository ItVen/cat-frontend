/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*
 * @Author: Aven
 * @Date: 2021-04-12 15:05:46
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-16 11:52:44
 * @Description:
 */

import { getHomeList, getCatInfoByName, getUserList, apiPost } from './apiBase';
import { showAddress, hexToByteArray } from './utils';
import PWCore from '@lay2/pw-core';
import { setCellData } from './getHash';

export async function getList() {
  const query = {};
  const cat = [];
  const data = await getHomeList(query);
  if (data.data as unknown[]) {
    for (const item of data.data) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const data = JSON.parse(item.userdata);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        cat.output_data = item.output_data;
        cat.push(data);
      } catch (e) {
        continue;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
  let data = await getUserList(query);
  data = data.data;
  const cat = [];
  for (const item of data.list) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const data = JSON.parse(item.userdata);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
  let cat = {};
  if (!name) {
    // 查询自己账户下的详情或者 创建小猫
    return cat;
  }
  const data = await getCatInfoByName(name);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  cat = data.data.userdata as string;
  cat = JSON.parse(cat as string);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  cat.address = data.data.address;
  cat.output_data = data.data.output_data;
  cat.mine = false;
  const address = PWCore.provider.address.addressString;
  if (cat.address == address) cat.mine = true;
  return cat;
}
