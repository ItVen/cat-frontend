/*
 * @Author: Aven
 * @Date: 2021-04-02 15:10:42
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-19 10:03:18
 * @Description:
 */
interface Urls {
  base_url: string;
  socket_url: string;
  rpc_url: string;
  indexer_rpc: string;
  ckb_test_net: string;
}
const urls: Record<string, Urls> = {
  test: {
    base_url: 'https://api.sourlycat.com',
    // base_url: 'http://127.0.0.1:3000',
    socket_url: 'https://cellapitest.ckb.pw',
    ckb_test_net: 'https://testnet.ckb.dev',
    indexer_rpc: 'https://testnet.ckb.dev/indexer',
    rpc_url: 'https://ckbtestnetrpc.ckbapp.dev' //https://ckbtestnetrpc.ckbapp.dev//https://ckbrpc.ckbapp.dev
  }
};
interface Config extends Urls {
  platform: string;
  showHeader: boolean;
}

const config: Config = {
  ...urls.test,
  platform: '',
  showHeader: true
};
export function useConfig() {
  return config;
}
