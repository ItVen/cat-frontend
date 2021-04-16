/*
 * @Author: Aven
 * @Date: 2021-04-08 11:54:56
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-16 23:34:22
 * @Description:
 */

import { Amount, Cell, IndexerCollector } from '@lay2/pw-core';
export interface Account {
  email: string;
  address: string;
  lock_arg: string;
  lock_hash: string;
  code_hash: string;
}

export interface OutputCell {
  capacity: string;
  lock: {
    args: string;
    code_hash: string;
    hash_type: string;
  };
  type: string | null;
  data?: { name: string; hash: string; fishes: number };
}

export interface Cells {
  type: string;
  block_number: string;
  out_point: {
    index: string;
    tx_hash: string;
  };
  output: {
    capacity: string;
    lock: {
      args: string;
      code_hash: string;
      hash_type: string;
    };
    type: string | null;
  };
  output_data: string;
  tx_index: string;
  name?: string;
}

export interface RpcResponse {
  id: number;
  jsonrpc: string;
  result: {
    objects: IndexerCollector[];
  };
}

export interface ApiResponse {
  list: any[];
  address: string;
  code: number;
  message: string;
  data?:
    | HomeCell
    | UserList
    | NameUsed
    | BindInfo
    | BattleCells
    | BattleCell
    | BattleUsed
    | unknown;
}

export interface BindInfo {
  id: number;
  email: string;
  address: string;
  fishes: number;
  token: string;
}

export interface NameUsed {
  used: boolean;
}
export interface MyCell {
  inputCell: Cell;
  outputCell: Cell;
}

export interface Cat {
  name: string;
  fishes: string;
  output_data: string;
  userdata: string;
  hash: string;
  atk?: number;
  def?: number;
  lck?: number;
  ph?: number;
}
export interface UserList {
  address: string;
  create_cat: number;
  mine: boolean;
  list: Cat[];
}

export interface ChainsModel {
  name: string;
  shortName: string;
  chain: string;
  network: string;
  chainId: number;
  networkId: number;
  rpcUrl: string;
  nativeCurrency: {
    symbol: string;
    name: string;
    decimals: string;
    contractAddress: string;
    balance: string;
  };
}
export interface PWCoreData {
  ckbBalance: Amount;
  address: string;
  ethAddress: string;
  myCat?: Record<string, unknown>;
}

export interface NTFCat {
  name: string;
  hash: string;
  address: string;
  fishes: string;
  mine: boolean;
  output?: Cell;
  output_data?: string;
}

export interface NTFAttr {
  ph: number;
  atk: number;
  def: number;
  lck: number;
}

export interface BattleResult {
  winer: NTFCat;
  loser: NTFCat;
  state?: boolean;
  mineWin: boolean;
}
export interface BattleCell {
  address: string;
  output: string;
  output_data: string;
  userdata: string;
}

export interface HomeCell {
  userdata: string;
}

export interface BattleCells {
  mine: BattleCell;
  battle: BattleCell;
}

export interface NameUsed {
  used: boolean;
}
export interface BattleUsed {
  state: boolean;
}
