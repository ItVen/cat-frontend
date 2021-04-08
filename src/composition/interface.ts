/*
 * @Author: Aven
 * @Date: 2021-04-08 11:54:56
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-09 00:04:40
 * @Description:
 */
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

export interface Cat {
  name: string;
  fishes: number;
  hash: number;
  atk: number;
  def: number;
  lck: number;
  ph: number;
}
