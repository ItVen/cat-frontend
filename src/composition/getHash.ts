/*
 * @Author: Aven
 * @Date: 2021-04-06 16:26:30
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-16 16:41:09
 * @Description:
 */

import { putMyUserData } from './apiBase';
import PWCore, { Blake2bHasher, byteArrayToHex } from '@lay2/pw-core';
import { getLiveCell } from '../composition/rpcApi';
import { date } from 'quasar';
import { ApiResponse, NTFAttr } from './interface';
export function getAttribute(hash: string): NTFAttr {
  if (!hash)
    return {
      ph: 0,
      atk: 0,
      def: 0,
      lck: 0
    };
  hash = hash.replace('0x', '');
  const array = Buffer.from(hash);
  const ph = getCount(array.slice(0, 10));
  const atk = getCount(array.slice(10, 20));
  const def = getCount(array.slice(20, 30));
  const lck = getCount(array.slice(30, 40));
  return {
    ph,
    atk,
    def,
    lck
  };
}

function getCount(array: Buffer) {
  let sum = 1;
  for (const item of array) {
    sum += item;
  }
  return parseInt((sum % 100).toFixed());
}

function getfishers(data: NTFAttr) {
  const sum = 100;
  const attr = (data.ph + data.def + data.lck + data.atk) * 0.2;

  return (sum - attr).toFixed();
}

export async function setCellData(
  userdata: Record<string, unknown>
): Promise<boolean | ApiResponse> {
  // 获取还活在的cell
  const address = PWCore.provider.address;
  const cells = (await getLiveCell(address)) as unknown[];
  console.log(cells);
  delete userdata.output_data;
  const newdata = JSON.stringify(userdata);
  if (cells.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const cell = cells[cells.length - 1];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = Object.assign(cell, {
      name: userdata.name,
      address: address.addressString,
      userdata: newdata
    });
    console.log(data, '----------', data);
    const res = await putMyUserData(data);
    return res;
  }
  return false;
}

export function toHash(name: string, lock_hash: string): string {
  let todoHash = name + lock_hash;
  const hasher = new Blake2bHasher();
  todoHash = hasher.hash(todoHash).serializeJson();
  console.log('name', name);
  console.log('lock_hash', lock_hash);
  console.log('todoHash', todoHash);
  return todoHash.substring(0, 42);
}

export function getCellCreateData(
  name: string,
  lock_hash: string
): Record<string, unknown> {
  let hash = toHash(name, lock_hash);
  hash = hash.replace('0x', '');
  console.log(hash, hash.length);
  // 获取小鱼干
  const attr = getAttribute(hash);
  // 计算小鱼干属性
  const fishes = getfishers(attr);
  // const fishes = '100';
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
