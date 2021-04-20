import PWCore, { Address, AddressType, Builder } from '@lay2/pw-core';
import { postMyTxData } from './apiBase';
import { useConfig } from './baseConfig';
import { CatCollector } from './catCollector';
import { getPw, sendTransaction } from './loginMetamask';
import { SourlyCatType } from './sourlyCatType';
import { BatchCatBuilder } from './transferBuilder';

export async function getTransferBuilder(
  eth: string,
  count?: string
): Promise<string | boolean> {
  const address = new Address(eth, AddressType.ckb);
  const sudt = new SourlyCatType(
    '0x9ec9ae72e4579980e41554100f1219ff97599f8ab7e79c074b30f2fa241a790c'
  );
  // const cells = await getLiveCell(PWCore.provider.address);
  // console.log(cells);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const options = { witnessArgs: Builder.WITNESS_ARGS.Secp256k1 };
  const builder = new BatchCatBuilder(
    sudt,
    address,
    1000,
    new CatCollector(useConfig().indexer_rpc),
    options
  );
  let txHash = '0x';
  try {
    txHash = await sendTransaction(builder);
  } catch (e) {
    console.log(e);
    return false;
  }
  if (txHash.endsWith('0x')) return false;
  // todo 更新转账交易 from to tx
  return txHash;
}
export async function pushTransfer(txHash: string, to: string, name: string) {
  console.log('pushTransfer----', txHash, to, name);
  // await getPw();
  const from = PWCore.provider.address.toCKBAddress();
  const data = { txHash, from, to, name };
  const rest = await postMyTxData(data);
  console.log(rest);
}
