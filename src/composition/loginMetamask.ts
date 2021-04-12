/*
 * @Author: Aven
 * @Date: 2021-04-09 11:47:05
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-12 11:07:45
 * @Description:
 */

import PWCore, {
  Web3ModalProvider,
  PwCollector,
  Address,
  Amount,
  AddressType,
  Builder
} from '@lay2/pw-core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import supported from 'src/composition/chains';
import { ChainsModel, PWCoreData } from './interface';
import { useConfig } from './baseConfig';
import { getLiveCell } from './rpcApi';
let web3Modal: Web3Modal | undefined = undefined;
let web3: Web3 | undefined = undefined;
let pw: PWCore | undefined = undefined;
const chainId = 1;

async function haveWeb3(): Promise<Web3> {
  if (web3) {
    console.log(web3.currentProvider);
    return web3;
  }
  const providerOptions = {};
  web3Modal = new Web3Modal({
    network: getNetwork(),
    cacheProvider: true,
    providerOptions
  });
  web3 = new Web3(await web3Modal.connect());
  return web3;
}
function getNetwork(): string {
  return getChainData(chainId).network;
}

function getChainData(chainId: number): ChainsModel {
  const chainData = supported.filter(chain => chain.chainId == chainId)[0];
  if (!chainData) {
    throw new Error('ChainId missing or not supported');
  }
  const API_KEY = '89a648e271d54224ba4827d348cbaa54'; // todo 不知道是什么的api key
  if (
    chainData.rpcUrl.includes('infura.io') &&
    chainData.rpcUrl.includes('%API_KEY%') &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpcUrl.replace('%API_KEY%', API_KEY);
    return {
      ...chainData,
      rpcUrl: rpcUrl
    };
  }
  return chainData;
}

export async function initPWCore(): Promise<PWCoreData> {
  web3 = await haveWeb3();
  if (!pw) {
    pw = await new PWCore(useConfig().ckb_test_net).init(
      new Web3ModalProvider(web3), // http://cellapitest.ckb.pw/
      new PwCollector(useConfig().socket_url)
      // new CellCollector()
    );
  }
  const ethAddress = PWCore.provider.address.addressString;
  // 获取ckb 地址
  const address = PWCore.provider.address.toCKBAddress();
  // 获取账户余额
  const ckbBalance = await PWCore.defaultCollector.getBalance(
    PWCore.provider.address
  );
  console.log(ckbBalance.toString());
  // getLiveCell(PWCore.provider.address);
  return {
    ckbBalance,
    address,
    ethAddress
  };
}

export async function getPw(): Promise<PWCore> {
  console.log('=======console.log(pw);');
  web3 = await haveWeb3();
  if (!pw) {
    pw = await new PWCore(useConfig().ckb_test_net).init(
      new Web3ModalProvider(web3), // http://cellapitest.ckb.pw/
      new PwCollector(useConfig().socket_url)
    );
  }
  console.log(pw);
  return pw;
}
// 发起交易 todo buider
export async function send(address: string, amount: string): Promise<string> {
  if (!pw) return '';
  const ckbAddress = new Address(address, AddressType.ckb);
  console.log(ckbAddress);
  const txHash = await pw.send(ckbAddress, new Amount(amount));
  return txHash;
}

export async function sendTransaction(builder: Builder): Promise<string> {
  if (!pw) return '';
  console.log(builder);
  const txHash = await pw.sendTransaction(builder);
  return txHash;
}
