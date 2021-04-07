/*
 * @Author: Aven
 * @Date: 2021-04-06 16:26:30
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-08 00:58:17
 * @Description:
 */

import { Cell, putMyUserData } from './apiBase';
import keccak from 'keccak';
import blake2b from 'blake2b';
import crypto from 'crypto';

export function getAttribute(hash: string): Record<string, unknown> {
  const array = Buffer.from(hash);
  const ph = getCount(array.slice(0, 5));
  const atk = getCount(array.slice(5, 10));
  const def = getCount(array.slice(10, 15));
  const lck = getCount(array.slice(15, 20));
  // 计算属性
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
    sum += item;
  }
  return sum % 100;
}

function getfishers(data: Record<string, unknown>): number {
  const sum = 100;
  const attr = (data.ph + data.def + data.lck + data.atk) * 0.2;

  return parseInt(sum - attr);
}

function setCellData(cellData: any, name: string): Cell {
  // 初始化小鱼干和属性
  const cell: Cell = <Cell>cellData;
  // todo 计算hash hash= hash(name+lock_hash)
  const hash = toHash(name, cell.lock);
  //生成属性
  const attr = getAttribute(hash);
  // 计算小鱼干属性
  const fishes = getfishers(attr);
  const data = {
    name,
    fishes,
    hash
  };
  cell.data = data;
  // todo 创建cell & 后台备份
  return cell;
}

export function toHash(name: string, lock_hash: string): string {
  name = '不二';
  lock_hash =
    '0x67548db9c888e698734e4b69d424eae6d134902c4596bacce55b5467a5137b7d';
  let todoHash = name + lock_hash;
  const hash = crypto.createHash('sha256');
  todoHash = hash
    .update(todoHash)
    .digest('hex')
    .toString();
  return todoHash;
}
