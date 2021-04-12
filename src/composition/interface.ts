/*
 * @Author: Aven
 * @Date: 2021-04-08 11:54:56
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-12 23:04:49
 * @Description:
 */

import { Amount, Cell } from '@lay2/pw-core';
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
  result: unknown;
}

export interface ApiResponse {
  code: number;
  message: string;
  data: unknown | BindInfo | NameUsed;
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
  fishes: number;
  hash: number;
  atk: number;
  def: number;
  lck: number;
  ph: number;
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
  ckbBalance: Amount | null;
  address: string | undefined;
  ethAddress: string | undefined;
  myCat?: Record<string, unknown>;
}
