/* eslint-disable @typescript-eslint/no-unsafe-call */
/*
 * @Author: Aven
 * @Date: 2021-04-09 11:47:05
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-19 14:42:12
 * @Description:
 */

import PWCore, {
  Web3ModalProvider,
  PwCollector,
  Address,
  Amount,
  AddressType,
  Builder,
  Cell,
  AmountUnit
} from '@lay2/pw-core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import supported from 'src/composition/chains';
import { ApiResponse, ChainsModel, PWCoreData } from './interface';
import { useConfig } from './baseConfig';
import { getLiveCell } from './rpcApi';
import { CatCollector } from 'src/composition/catCollector';
import { SourlyCatType } from 'src/composition/sourlyCatType';
import { putMyUserData } from './apiBase';
import { Notify } from 'quasar';
import { login } from './getLoginStatus';

let web3Modal: Web3Modal | undefined = undefined;
let web3: Web3 | undefined = undefined;
let pw: PWCore | undefined = undefined;
const chainId = 1;
const sudt = new SourlyCatType(
  '0x9ec9ae72e4579980e41554100f1219ff97599f8ab7e79c074b30f2fa241a790c'
);
console.log(window.ethereum);
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const ethereum: any = window.ethereum;
try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  ethereum.on('accountsChanged', async function(accounts: any[]) {
    await initPWCore(true);
    window.location.reload();
  });
} catch (e) {
  Notify.create({
    message: 'not find MataMask',
    position: 'bottom',
    timeout: 2000,
    color: 'negative'
  });
}

const collector = new CatCollector(useConfig().indexer_rpc);
export async function canCreateCell(): Promise<boolean> {
  const sudt = new SourlyCatType(
    '0x9ec9ae72e4579980e41554100f1219ff97599f8ab7e79c074b30f2fa241a790c'
  );
  try {
    const cell = await new CatCollector(useConfig().indexer_rpc).collectSUDT(
      sudt,
      PWCore.provider.address,
      {
        neededAmount: new Amount('1')
      }
    );
    console.log(cell);
    if (cell.length > 0) return false;
    return true;
  } catch (e) {
    return false;
  }
}
export async function getAccount() {
  try {
    const ethAddress = PWCore.provider.address.addressString;
    console.log(ethAddress);
  } catch (e) {
    await initPWCore();
    const ethAddress = PWCore.provider.address.addressString;
    console.log(ethAddress);
  }
}

async function haveWeb3(): Promise<Web3> {
  console.log('haveWeb3', window.ethereum, window.web3);
  if (web3) {
    console.log(web3.currentProvider);
    return web3;
  }
  if (
    typeof window.ethereum !== 'undefined' ||
    typeof window.web3 !== 'undefined'
  ) {
    // Web3 browser user detected. You can now use the provider.
    const providerOptions = {};
    web3Modal = new Web3Modal({
      network: getNetwork(),
      cacheProvider: true,
      providerOptions
    });
    web3 = new Web3(await web3Modal.connect());
  } else {
    throw new Error('No Web3');
  }
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

export async function initPWCore(tologin?: boolean): Promise<PWCoreData> {
  try {
    web3 = await haveWeb3();
  } catch (e) {
    // todo 弹窗警告
    Notify.create({
      message: 'not find MataMask',
      position: 'bottom',
      timeout: 2000,
      color: 'negative'
    });
  }
  if (!pw) {
    pw = await new PWCore(useConfig().ckb_test_net).init(
      new Web3ModalProvider(web3), // http://cellapitest.ckb.pw/
      collector
    );
  }
  const ethAddress = PWCore.provider.address.addressString;
  // 获取ckb 地址
  const address = PWCore.provider.address.toCKBAddress();
  // 获取账户余额
  const ckbBalance = await PWCore.defaultCollector.getBalance(
    PWCore.provider.address
  );
  const userCells = await collector.collectSUDT(sudt, PWCore.provider.address, {
    neededAmount: new Amount('1', AmountUnit.shannon)
  });
  // todo login
  let myCat = undefined;
  if (userCells.length > 0) {
    // todo 更新到后台cell数据
    const cell = userCells[0];
    const data = cell.getData();
    myCat = {
      cat: '1',
      data,
      hexData: cell.getHexData()
    };
  }
  // todo 更新token
  if (tologin && address) await login(ethAddress, address);
  return {
    ckbBalance,
    address,
    ethAddress,
    myCat
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
export async function setCellData(
  userdata?: Record<string, unknown>
): Promise<boolean | ApiResponse> {
  // 获取还活在的cell
  const address = PWCore.provider.address;
  const userCells = await collector.collectSUDT(sudt, PWCore.provider.address, {
    neededAmount: new Amount('1', AmountUnit.shannon)
  });
  console.log('setCellData----------', userCells.length);
  if (userCells.length > 0) {
    const cell = userCells[0];
    console.log(userdata);
    console.log(cell.getData());
    console.log(cell.getHexData());
    // const data = Object.assign(cell, {
    //   name: userdata.name,
    //   address: address,
    //   userdata: newdata
    // });
    // const res = await putMyUserData(data);
    // return res;
  }
  return false;
}
