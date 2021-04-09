/*
 * @Author: Aven
 * @Date: 2021-04-08 11:39:37
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-09 10:01:23
 * @Description:
 */
import { Account, ApiResponse } from './interface';
export default class TestData {
  login(): Account {
    const user = {
      email: 'test@gamil.com',
      address: 'ckt1qyqz0njzt6xjh705nd4plqs5nhh5ls4kpksq3ur7j2',
      lock_arg: '0x27ce425e8d2bf9f49b6a1f82149def4fc2b60da0',
      code_hash:
        '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
      lock_hash:
        '0x67548db9c888e698734e4b69d424eae6d134902c4596bacce55b5467a5137b7d'
    };
    return user;
  }
  bind(): ApiResponse {
    const data = {
      success: true,
      code: 200,
      message: '请求绑定我的账户成功',
      data: {
        id: 3,
        email: 'test@gamil.com',
        create_cat: 1,
        address: 'ckt1qyqz0njzt6xjh705nd4plqs5nhh5ls4kpksq3ur7j2',
        fishes: 0,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJzc3NzIiwiaWF0IjoxNjE3ODg0ODQ4LCJleHAiOjE2MTc5NzEyNDh9.fq85-llXIAAdEojwvcsFePNKplA5sU8Mzl--OzOpn88'
      }
    };
    return data;
  }

  fishesList(): Record<string, unknown> {
    const data = {
      list: [
        {
          name: 'ssssss',
          fishes: 60,
          hash:
            '0x36a491bcf8ff9e94e49f2bd99969ed51ceb256a8cfbe1ed0583da0c6edb15cd8'
        },
        {
          name: 'zzzsasa',
          fishes: 56,
          hash:
            '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
        }
      ],
      page: 0
    };
    return data;
  }
  VictoryList(): Record<string, unknown> {
    const data = {
      list: [
        {
          name: 'ssssss',
          fishes: 60,
          hash:
            '0x36a491bcf8ff9e94e49f2bd99969ed51ceb256a8cfbe1ed0583da0c6edb15cd8',
          count: 20
        },
        {
          name: 'zzzsasa',
          fishes: 56,
          hash:
            '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601',
          count: 10
        }
      ],
      page: 0
    };

    return data;
  }

  historyList(): Record<string, unknown> {
    const data = {
      list: [
        {
          from: 'ssssss',
          to: 'sss',
          win: false,
          fishes: '-3',
          time: '2021/04/09 10:00',
          tx_hash:
            '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
        },
        {
          from: 'zzzzz',
          to: 's',
          win: true,
          fishes: '3',
          time: '2021/04/09 10:00',
          tx_hash:
            '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
        }
      ],
      page: 0
    };

    return data;
  }
}
