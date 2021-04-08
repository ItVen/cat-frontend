interface Urls {
  base_url: string;
  socket_url: string;
  rpc_url: string;
  indexer_rpc: string;
}
const urls: Record<string, Urls> = {
  test: {
    base_url: 'http://localhost:3000',
    socket_url: 'http://cellapitest.ckb.pw/',
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
