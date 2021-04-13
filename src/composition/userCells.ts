/*
 * @Author: Aven
 * @Date: 2021-04-08 12:06:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-12 11:04:57
 * @Description: cell create update delete
 */
import PWCore, {
  Cell,
  Amount,
  Address,
  AddressType,
  SUDT,
  Builder
} from '@lay2/pw-core';
import { sendTransaction } from './loginMetamask';
import { TransferBuilder } from './transfer-budiler';
import { BatchCoffeeBuilder } from './transferBudiler';
// import TransferBuilder from './transfer-budiler';

export function setCell(
  mode: string,
  cell?: Cell | null,
  data?: string
): Promise<Record<string, unknown>> {
  let inputCell: Cell;
  let outputCell: Cell;
  if (mode === 'delete' || mode === 'update') {
    if (cell) {
      inputCell = cell;
      inputCell.setHexData('0x');
    }
  }
  if (mode === 'create' || mode === 'update') {
    outputCell = new Cell(
      new Amount('200'),
      PWCore.provider.address.toLockScript()
    );
    if (data) {
      if (data.startsWith('0x')) {
        outputCell.setHexData(data);
      } else {
        outputCell.setData(data);
      }
    }
    outputCell.resize();
  }
  return { inputCell, outputCell };
}

export function getAddress(): string {
  console.log(PWCore.provider.address.toLockScript());

  const address = PWCore.provider.address.addressString;
  return address;
}

export function getLockHash(): string {
  const hash = PWCore.provider.address.toLockScript().codeHash;
  return hash;
}

export async function getTransferBuilder(
  eth: string,
  count: string
): Promise<string> {
  const address = new Address(eth, AddressType.ckb);
  const amount = new Amount(count);
  const sudt = new SUDT(
    '0x297fb72de7f76ba0784e63dff941b01cbbb372a26c0786d2d511ae9709d8ca57'
  );
  console.log(eth, count, address, amount, sudt);
  // const builder = new TransferBuilder(sudt, address, amount);
  const builder = new BatchCoffeeBuilder(sudt, [address]);
  console.log(builder);
  const txHash = await sendTransaction(builder);
  console.log(txHash);
  return txHash;
}

export function getBattleBuilder(): string {
  const hash = PWCore.provider.address.toLockScript().codeHash;
  return hash;
}
