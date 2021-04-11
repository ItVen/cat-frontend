/*
 * @Author: Aven
 * @Date: 2021-04-08 12:06:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-11 22:18:36
 * @Description: cell create update delete
 */
import PWCore, { Cell, Amount } from '@lay2/pw-core';
import SDBuilder from './sd-builder';

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
