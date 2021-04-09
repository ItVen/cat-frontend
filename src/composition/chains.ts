import { ChainsModel } from './interface';
const eth = {
  name: 'Ethereum Mainnet',
  shortName: 'eth',
  chain: 'ETH',
  network: 'mainnet',
  chainId: 1,
  networkId: 1,
  rpcUrl: 'https://mainnet.infura.io/v3/%API_KEY%',
  nativeCurrency: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: '18',
    contractAddress: '',
    balance: ''
  }
};

const rop = {
  name: 'Ethereum Ropsten',
  shortName: 'rop',
  chain: 'ETH',
  network: 'ropsten',
  chainId: 3,
  networkId: 3,
  rpcUrl: 'https://ropsten.infura.io/v3/%API_KEY%',
  nativeCurrency: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: '18',
    contractAddress: '',
    balance: ''
  }
};
const rin = {
  name: 'Ethereum Rinkeby',
  shortName: 'rin',
  chain: 'ETH',
  network: 'rinkeby',
  chainId: 4,
  networkId: 4,
  rpcUrl: 'https://rinkeby.infura.io/v3/%API_KEY%',
  nativeCurrency: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: '18',
    contractAddress: '',
    balance: ''
  }
};
const gor = {
  name: 'Ethereum Görli',
  shortName: 'gor',
  chain: 'ETH',
  network: 'goerli',
  chainId: 5,
  networkId: 5,
  rpcUrl: 'https://goerli.infura.io/v3/%API_KEY%',
  nativeCurrency: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: '18',
    contractAddress: '',
    balance: ''
  }
};
const rsk = {
  name: 'RSK Mainnet',
  shortName: 'rsk',
  chain: 'RSK',
  network: 'mainnet',
  chainId: 30,
  networkId: 30,
  rpcUrl: 'https://public-node.rsk.co',
  nativeCurrency: {
    symbol: 'RSK',
    name: 'RSK',
    decimals: '18',
    contractAddress: '',
    balance: ''
  }
};
const kov = {
  name: 'Ethereum Kovan',
  shortName: 'kov',
  chain: 'ETH',
  network: 'kovan',
  chainId: 42,
  networkId: 42,
  rpcUrl: 'https://kovan.infura.io/v3/%API_KEY%',
  nativeCurrency: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: '18',
    contractAddress: '',
    balance: ''
  }
};
const etc = {
  name: 'Ethereum Classic Mainnet',
  shortName: 'etc',
  chain: 'ETC',
  network: 'mainnet',
  chainId: 61,
  networkId: 1,
  rpcUrl: 'https://ethereumclassic.network',
  nativeCurrency: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: '18',
    contractAddress: '',
    balance: ''
  }
};
const poa = {
  name: 'POA Network Sokol',
  shortName: 'poa',
  chain: 'POA',
  network: 'sokol',
  chainId: 77,
  networkId: 77,
  rpcUrl: 'https://sokol.poa.network',
  nativeCurrency: {
    symbol: 'POA',
    name: 'POA',
    decimals: '18',
    contractAddress: '',
    balance: ''
  }
};
const skl = {
  name: 'POA Network Core',
  shortName: 'skl',
  chain: 'POA',
  network: 'core',
  chainId: 99,
  networkId: 99,
  rpcUrl: 'https://core.poa.network',
  nativeCurrency: {
    symbol: 'POA',
    name: 'POA',
    decimals: '18',
    contractAddress: '',
    balance: ''
  }
};
const xdai = {
  name: 'xDAI Chain',
  shortName: 'xdai',
  chain: 'POA',
  network: 'dai',
  chainId: 100,
  networkId: 100,
  rpcUrl: 'https://dai.poa.network',
  nativeCurrency: {
    symbol: 'xDAI',
    name: 'xDAI',
    decimals: '18',
    contractAddress: '',
    balance: ''
  }
};
const clo = {
  name: 'Callisto Mainnet',
  shortName: 'clo',
  chain: 'callisto',
  network: 'mainnet',
  chainId: 820,
  networkId: 1,
  rpcUrl: 'https://clo-geth.0xinfra.com/',
  nativeCurrency: {
    symbol: 'CLO',
    name: 'CLO',
    decimals: '18',
    contractAddress: '',
    balance: ''
  }
};

const supported: Array<ChainsModel> = [
  eth,
  rop,
  rin,
  gor,
  rsk,
  kov,
  etc,
  poa,
  skl,
  xdai,
  clo
];
export default supported;
