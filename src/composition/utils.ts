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
