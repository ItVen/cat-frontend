interface Urls {
  base_url: string;
  socket_url: string;
}
const urls: Record<string, Urls> = {
  test: {
    base_url: 'http://localhost:3000',
    socket_url: 'http://cellapitest.ckb.pw/'
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
