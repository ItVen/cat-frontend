/*
 * @Author: Aven
 * @Date: 2021-04-06 16:26:30
 * @LastEditors: Aven
 * @LastEditTime: 2021-05-01 14:20:10
 * @Description:
 */

import { putMyUserData } from './apiBase';
import PWCore, { Blake2bHasher, byteArrayToHex } from '@lay2/pw-core';
import { getLiveCell } from '../composition/rpcApi';
import { ApiResponse, NTFAttr } from './interface';
import { initPWCore } from './loginMetamask';
export function getAttribute(hash: string): NTFAttr {
  console.log(hash);
  if (!hash)
    return {
      ph: 0,
      atk: 0,
      def: 0,
      lck: 0
    };

  hash = hash.replace('0x', '');
  const array = hash.match(/[\da-f]{2}/gi)?.map(function(h) {
    return parseInt(h, 16);
  }) as number[];
  const hashBuffer = new Uint8Array(array);

  const ph = (hashBuffer[4] % 100) + 1;
  const atk = (hashBuffer[9] % 100) + 1;
  const def = (hashBuffer[14] % 100) + 1;
  const lck = (hashBuffer[19] % 100) + 1;
  return {
    ph,
    atk,
    def,
    lck
  };
}

export async function setCellData2(
  userdata: Record<string, unknown>
): Promise<boolean | ApiResponse> {
  // 获取还活在的cell
  const address = PWCore.provider.address;
  const cells = (await getLiveCell(address)) as unknown[];
  delete userdata.output_data;
  const newdata = JSON.stringify(userdata);
  if (cells.length > 0) {
    const cell = cells[cells.length - 1];
    const data = Object.assign(cell, {
      name: userdata.name,
      address: address.addressString,
      userdata: newdata
    });
    console.log(JSON.stringify(data));
    const res = await putMyUserData(data);
    return res;
  }
  return false;
}

export function toHash(name: string, lock_hash: string): string {
  let todoHash = name + lock_hash;
  const hasher = new Blake2bHasher();
  todoHash = hasher.hash(todoHash).serializeJson();
  getAttribute(todoHash);
  return todoHash.substring(0, 42);
}

export async function getCellCreateData(
  name: string,
  lock_hash?: string
): Promise<Record<string, unknown>> {
  try {
    lock_hash = PWCore.provider.address.toLockScript().codeHash;
  } catch (e) {
    console.log(e);
    await initPWCore();
    lock_hash = PWCore.provider.address.toLockScript().codeHash;
  }
  let hash = toHash(name, lock_hash);
  hash = hash.replace('0x', '');
  console.log(hash, hash.length);
  // 获取小鱼干
  const fishes = '100';
  //todo 转hash
  const output_data = '0x' + setData(name, 16) + hash + setData(fishes, 4);
  const data = {
    name,
    hash,
    fishes,
    output_data
  };
  return data;
}
export function setData(data: string | number, length: number) {
  data = data as string;
  data = data + '';
  data = data.trim();
  const bytes = [];
  for (let i = 0; i < data.length; i++) {
    bytes.push(data.charCodeAt(i));
  }
  data = byteArrayToHex(bytes);
  data = data.replace('0x', '');
  if (data.length < length * 2) {
    data = data + '0'.repeat(length * 2 - data.length);
  }
  return data;
}
