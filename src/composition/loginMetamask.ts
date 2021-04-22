/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/*
 * @Author: Aven
 * @Date: 2021-04-09 11:47:05
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-21 15:14:03
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
  AmountUnit,
  DefaultSigner
} from '@lay2/pw-core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import supported from 'src/composition/chains';
import { ApiResponse, ChainsModel, NTFCat, PWCoreData } from './interface';
import { useConfig } from './baseConfig';
import { getLiveCell } from './rpcApi';
import { CatCollector } from 'src/composition/catCollector';
import { SourlyCatType } from 'src/composition/sourlyCatType';
import { putMyUserData } from './apiBase';
import { Notify } from 'quasar';
import { login } from './getLoginStatus';
import { RPC, transformers } from 'ckb-js-toolkit';
import { getHashData } from './utils';
import { BattleSigner } from './singer';

let web3Modal: Web3Modal | undefined = undefined;
let web3: Web3 | undefined = undefined;
let pw: PWCore | undefined = undefined;
const chainId = 1;
const sudt = new SourlyCatType(
  '0x9ec9ae72e4579980e41554100f1219ff97599f8ab7e79c074b30f2fa241a790c'
);
console.log(window.ethereum);
const CKB_URL = 'https://testnet.ckb.dev';
const rpc = new RPC(CKB_URL);
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

export async function initPWCore(tologin?: boolean) {
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
  if (true) {
    const ethAddress = PWCore.provider.address.addressString;
    // 获取ckb 地址
    const address = PWCore.provider.address.toCKBAddress();

    const liveCells = await collector.collectSUDT(
      sudt,
      PWCore.provider.address,
      {
        neededAmount: new Amount('1', AmountUnit.shannon)
      }
    );
    console.log(liveCells);
    // todo 更新token
    if (address) void login(ethAddress, address, liveCells.length);
    return true;
  }
}
export async function ShowLiveCat(): Promise<NTFCat | unknown> {
  await getPw();
  let liveCells = await collector.collectSUDT(sudt, PWCore.provider.address, {
    neededAmount: new Amount('1', AmountUnit.shannon)
  });
  console.log(liveCells);
  liveCells = liveCells.reverse();
  console.log(liveCells, 'revers');
  let cat;
  for (const item of liveCells) {
    cat = getHashData(
      item.getHexData(),
      true,
      PWCore.provider.address.toCKBAddress()
    ) as NTFCat;
    cat.output = item;
    if (cat.hash) break;
  }
  if (liveCells.length > 0) return cat as NTFCat;
  return undefined;
}

export async function getPw(): Promise<PWCore> {
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
  return pw;
}
// 发起交易 todo buider
export async function send(address: string, amount: string): Promise<string> {
  const pw = await getPw();
  const ckbAddress = new Address(address, AddressType.ckb);
  console.log(ckbAddress);
  const txHash = await pw.send(ckbAddress, new Amount(amount));
  return txHash;
}

export async function sendTransaction(builder: Builder): Promise<string> {
  await getPw();
  console.log(builder);
  const tx = await builder.build();
  const signer = new BattleSigner(PWCore.provider);
  const data = transformers.TransformTransaction(await signer.sign(tx));
  console.log(JSON.stringify(data));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const txHash = (await rpc.send_transaction(data)) as string;
  // const txHash = await pw.sendTransaction(builder);
  console.log('txHash--------', txHash);
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
export async function waitUntilCommitted(txHash: string, timeout = 180) {
  for (let index = 0; index < timeout; index++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await rpc.get_transaction(txHash);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const status = data.tx_status.status;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`tx ${txHash} is ${status}, waited for ${index} seconds`);
    console.log('asyncSleep 1000');
    await asyncSleep(1000);
    if (status === 'committed') {
      return 'committed';
    }
  }
  throw new Error(`tx ${txHash} not committed in ${timeout} seconds`);
}
function asyncSleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });
}
