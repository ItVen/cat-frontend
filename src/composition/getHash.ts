/*
 * @Author: Aven
 * @Date: 2021-04-06 16:26:30
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-07 22:20:11
 * @Description:
 */

import { Cell, putMyUserData } from './apiBase';

export function getAttribute(hash: string): Record<string, unknown> {
  // 计算属性
  return {
    ph: -1,
    atk: -1,
    def: -1,
    lck: -1
  };
}

function setCellData(cellData: any, name: string): void {
  // todo 初始化小鱼干和属性
  const cell: Cell = <Cell>cellData;
  // todo 计算hash hash= hash(name+lock_hash)
}

export function getHash(name: string, lock_hash: string): string {
  name = '不二';
  lock_hash =
    '0x67548db9c888e698734e4b69d424eae6d134902c4596bacce55b5467a5137b7d';
  const todoHash = name + lock_hash;

  return todoHash;
}
