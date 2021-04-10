/*
 * @Author: Aven
 * @Date: 2021-04-07 15:31:25
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-10 17:11:39
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
    console.log(tesx);

    return text;
  }
  return context;
}
