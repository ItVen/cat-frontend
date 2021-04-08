/*
 * @Author: Aven
 * @Date: 2021-04-06 16:26:30
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-09 00:12:44
 * @Description:
 */

import { putMyUserData } from './apiBase';
import { OutputCell, Cells } from './interface';
import { Blake2bHasher, Cell } from '@lay2/pw-core';
import { getLiveCell } from '../composition/rpcApi';
import TestData from '../composition/testJson';
export function getAttribute(hash: string): Record<string, unknown> {
  hash = hash.replace('0x', '');
  const array = Buffer.from(hash);
  const ph = getCount(array.slice(0, 5));
  const atk = getCount(array.slice(5, 10));
  const def = getCount(array.slice(10, 15));
  const lck = getCount(array.slice(15, 20));
  return {
    ph,
    atk,
    def,
    lck
  };
}

function getCount(array: Buffer): number {
  let sum = 1;
  for (const item of array) {
    sum += parseInt(item);
  }
  return sum % 100;
}

function getfishers(data: Record<string, unknown>): number {
  const sum = 100;
  const attr = (data.ph + data.def + data.lck + data.atk) * 0.2;

  return parseInt(sum - attr);
}

export async function setCellData(
  name: string
): Promise<Record<string, unknown> | boolean> {
  // todo 获取还活在的cell
  const account = new TestData().login();
  const cells = await getLiveCell(account);
  const hash = toHash(name, account.lock_hash);
  const attr = getAttribute(hash);
  // 计算小鱼干属性
  const fishes = getfishers(attr);
  const data = {
    name,
    fishes,
    hash
  };
  if (cells.length > 0) {
    // todo 获取 Capacity Lock Type todo 没有发起交易过的cell
    cells[0].output_data = JSON.stringify(data);
    cells[0].name = name;
  } else {
    // todo 创建cell?
    return false;
  }

  // todo 创建链上创建完成cell后 & 后台备份
  void putMyUserData(cells[0]);
  // todo 获取卡属性
  return data;
}

export function toHash(name: string, lock_hash: string): string {
  let todoHash = name + lock_hash;
  const hasher = new Blake2bHasher();
  todoHash = hasher.hash(todoHash).serializeJson();
  // getAttribute(todoHash);
  return todoHash;
}
