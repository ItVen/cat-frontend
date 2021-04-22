/*
 * @Author: Aven
 * @Date: 2021-04-06 16:26:30
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-21 14:37:10
 * @Description:
 */

import { putMyUserData } from './apiBase';
import PWCore, { Blake2bHasher, byteArrayToHex } from '@lay2/pw-core';
import { getLiveCell } from '../composition/rpcApi';
import { date } from 'quasar';
import { ApiResponse, NTFAttr } from './interface';
import { getPw, initPWCore, ShowLiveCat } from './loginMetamask';
export function getAttribute(hash: string): NTFAttr {
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

  const ph = Math.floor((hashBuffer[4] % 100) + 1);
  const atk = Math.floor((hashBuffer[9] % 100) + 1);
  const def = Math.floor((hashBuffer[14] % 100) + 1);
  const lck = Math.floor((hashBuffer[19] % 100) + 1);
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
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const attr = (data.ph + data.def + data.lck + data.atk) * 0.2;

  return (sum - attr).toFixed();
}

export async function setCellData2(
  userdata: Record<string, unknown>
): Promise<boolean | ApiResponse> {
  // 获取还活在的cell
  const address = PWCore.provider.address;
  const cat = await ShowLiveCat();
  console.log(cat, 'ShowLiveCat');
  const cells = (await getLiveCell(address)) as unknown[];
  console.log(cells, 'getLiveCell');

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
    console.log(res);

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
    await getPw();
    lock_hash = PWCore.provider.address.toLockScript().codeHash;
  }
  let hash = toHash(name, lock_hash);
  hash = hash.replace('0x', '');
  // 获取小鱼干
  const attr = getAttribute(hash);
  // 计算小鱼干属性
  // const fishes = getfishers(attr);
  const fishes = Number(100).toString(16);
  //todo 转hash
  const output_data = '0x' + setData(name, 16) + hash + fishes.padStart(8, '0');
  console.log(output_data);
  const data = {
    name,
    hash,
    fishes,
    output_data,
    ckb_address: PWCore.provider.address.toCKBAddress()
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
