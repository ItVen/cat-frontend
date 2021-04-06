/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Notify, LocalStorage } from 'quasar';
import axios, { AxiosError } from 'axios';
import { useConfig } from './baseConfig';
const TOKEN_KEY = 'scToken';
export const CAT_DATA = 'cat_data';
export function getToken(): string | null {
  return LocalStorage.getItem(TOKEN_KEY);
}

function setStorage(key: string, val: string): void {
  LocalStorage.set(key, val);
}
export function getStorage(key: string): string | null {
  return LocalStorage.getItem(key);
}
interface ApiResponse {
  code: number;
  msg: string;
  data: unknown;
}
const apiGet = async (
  url: string,
  params?: Record<string, string | undefined>,
  authorization?: boolean
) => get(useConfig().base_url + url, params, authorization);
const get = async (
  url: string,
  params?: Record<string, string | undefined>,
  authorization?: boolean
) => {
  let config = undefined;
  if (authorization) {
    const token = getToken();
    config = {
      headers: { Authorization: `Bearer ${token || ''}` }
    };
  }

  url += '?';
  for (const p in params) {
    if (params[p] !== undefined) {
      url += `${p}=${params[p] as string}&`;
    }
  }
  let ret = null;
  console.log('[apiGet] url: ', url);
  try {
    ret = await axios.get(url, config);
  } catch (e) {
    if ((e as AxiosError).response?.status === 401) {
      // todo  跳转登录
      return;
    }
    Notify.create({
      message: `[API] - ${(e as Error).toString()}`,
      position: 'top',
      timeout: 2000,
      color: 'negative'
    });
  }
  if (ret?.data) {
    ret.data = (ret?.data as ApiResponse).data;
  }

  return ret;
};
const apiPost = async (
  url: string,
  params: Record<string, unknown>,
  authorization?: boolean
) => post(useConfig().base_url + url, params, authorization);
const post = async (
  url: string,
  params: Record<string, unknown>,
  authorization?: boolean
) => {
  let config = undefined;
  if (authorization) {
    const token = getToken();
    config = {
      headers: { Authorization: `Bearer ${token || ''}` }
    };
  }
  let ret = null;
  try {
    ret = await axios.post(url, params, config);
  } catch (e) {
    if ((e as AxiosError).response?.status === 401) {
      return;
    }
    Notify.create({
      message: `[API] - ${(e as Error).message} Params: ${JSON.stringify(
        params
      )}`,
      position: 'top',
      timeout: 2000,
      color: 'negative'
    });
  }
  if (ret?.data) {
    ret.data = (ret?.data as ApiResponse).data;
  }
  return ret;
};
const apiPATCH = async (
  url: string,
  params: Record<string, unknown>,
  authorization?: boolean
) => patch(useConfig().base_url + url, params, authorization);
const patch = async (
  url: string,
  params: Record<string, unknown>,
  authorization?: boolean
) => {
  let config = undefined;
  if (authorization) {
    const token = getToken();
    config = {
      headers: { Authorization: `Bearer ${token || ''}` }
    };
  }
  let ret = null;
  try {
    ret = await axios.patch(url, params, config);
  } catch (e) {
    if ((e as AxiosError).response?.status === 401) {
      return;
    }
    Notify.create({
      message: `[API] - ${(e as Error).message} Params: ${JSON.stringify(
        params
      )}`,
      position: 'top',
      timeout: 2000,
      color: 'negative'
    });
  }
  if (ret?.data) {
    ret.data = (ret?.data as ApiResponse).data;
  }
  return ret;
};
const apiPUT = async (
  url: string,
  params: Record<string, unknown>,
  authorization?: boolean
) => put(useConfig().base_url + url, params, authorization);
const put = async (
  url: string,
  params: Record<string, unknown>,
  authorization?: boolean
) => {
  let config = undefined;
  if (authorization) {
    const token = getToken();
    config = {
      headers: { Authorization: `Bearer ${token || ''}` }
    };
  }
  let ret = null;
  try {
    ret = await axios.put(url, params, config);
  } catch (e) {
    if ((e as AxiosError).response?.status === 401) {
      return;
    }
    Notify.create({
      message: `[API] - ${(e as Error).message} Params: ${JSON.stringify(
        params
      )}`,
      position: 'top',
      timeout: 2000,
      color: 'negative'
    });
  }
  if (ret?.data) {
    ret.data = (ret?.data as ApiResponse).data;
  }
  return ret;
};
export async function createUserInfo(email: string, address: string) {
  const res = await apiPost(
    '/user',
    {
      address,
      email
    },
    false
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const token = res.data.token;
  setStorage(TOKEN_KEY, token);
  setStorage(CAT_DATA, res.data);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.data;
}

export async function getNameUsed(name: string) {
  const res = await apiGet(
    '/user/name',
    {
      name
    },
    true
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.data;
}

export async function getCatInfoByName(name: string) {
  const res = await apiGet(
    '/user/cat',
    {
      name
    },
    true
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.data;
}
export interface Cell {
  capacity: string;
  lock: string;
  data: {
    name: string;
    hash: string;
    fishes: number;
  };
}
export async function putMyUserData(cell: Cell) {
  const res = await apiPUT(
    '/user',
    {
      capacity: cell.capacity,
      lock: cell.lock,
      data: cell.data
    },
    true
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.data;
}

export async function patchTxStatusData(
  txHash: string,
  status: string,
  tx_type: string
) {
  const res = await apiPATCH(
    '/tx',
    {
      tx_type,
      status,
      txHash
    },
    true
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.data;
}

export async function postMyTxData(
  from: string,
  to: string,
  name: string,
  txHash: string
) {
  const res = await apiPost(
    '/tx',
    {
      from,
      to,
      name,
      txHash
    },
    true
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.data;
}
