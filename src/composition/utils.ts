import { getAttribute } from './getHash';

/*
 * @Author: Aven
 * @Date: 2021-04-07 15:31:25
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-21 07:25:00
 * @Description:
 */
export function isEmail(email: string): boolean {
  const regexp = new RegExp(
    /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  );
  const isok = regexp.test(email);
  return isok;
}

export function getCatIcon(name: string): string {
  if (name) return 'https://robohash.org/' + name + '?set=set4';
  return 'https://robohash.org/sourlycat?set=set4';
}

export function showAddress(address: string, style?: number): string {
  if (address.length <= 13) return address;
  if (style) {
    const start = address.substr(0, 20);
    address = start + '...';
    return address;
  }
  const start = address.substr(0, 6);
  const end = address.substr(address.length - 4, address.length);
  address = start + '...' + end;
  return address;
}
export function showEmail(context: string): string {
  const splitText: string[] = context.split('@');
  let text = splitText[0].substr(0, 4);
  if (splitText[1]) {
    text = text + '...@' + splitText[1];

    return text;
  }
  return context;
}

/**
 * 只允许输入英文和数字，然后限制在16bytes内
 * */

export function verifyName(name: string): boolean {
  const regexp = new RegExp(/^[a-zA-Z0-9]{2,16}$/);
  const data = regexp.test(name);
  return data;
}
export function hexToByteArray(h: string) {
  if (!/^(0x)?([0-9a-fA-F][0-9a-fA-F])*$/.test(h)) {
    throw new Error('Invalid hex string!');
  }
  if (h.startsWith('0x')) {
    h = h.slice(2);
  }
  const array = [];
  while (h.length >= 2) {
    array.push(parseInt(h.slice(0, 2), 16));
    h = h.slice(2);
  }
  return array;
}

export function getHashData(hexData: string, mine: boolean, address: string) {
  hexData = hexData.substring(2, hexData.length);
  const nameArray = [];
  for (const i of hexToByteArray(hexData.substring(0, 32))) {
    if (i > 0) {
      nameArray.push(i);
    }
  }

  const name = nameArray.map(char => String.fromCharCode(char)).join('');
  const hash = hexData.substring(32, 72);
  const attr = getAttribute(hash);
  const fishes = hexToByteArray(hexData.substring(72, 80))
    .map(char => String.fromCharCode(char))
    .join('');
  return {
    name,
    hash,
    fishes,
    mine,
    attr,
    address
  };
}
