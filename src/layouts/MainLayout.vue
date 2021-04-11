<!--
 * @Author: Aven
 * @Date: 2021-04-02 14:59:50
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-11 18:51:53
 * @Description: 
-->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-grey-1">
      <q-toolbar>
        <q-btn
          flat
          dense
          icon="assignment_ind"
          label="sourly cat"
          class="text-black"
          @click="route = '/'"
          to="/"
        />
        <q-space />
        <q-btn
          flat
          no-caps
          class="q-mr-xs"
          label="Home"
          @click="route = '/'"
          to="/"
          :class="route != '/' ? 'q-mr-xs text-black' : 'q-mr-xs text-blue'"
        />
        <q-btn
          flat
          no-caps
          label="Account"
          @click="route = '/nfts'"
          to="/nfts"
          :class="route != '/nfts' ? 'q-mr-xs text-black' : 'q-mr-xs text-blue'"
        />
        <q-btn
          class=" q-mr-xs text-black"
          flat
          no-caps
          :label="address"
          @click="loginMetamask"
        />
        <q-btn
          flat
          round
          dense
          icon="gamepad"
          class="text-black"
          @click="test"
        />
        <q-btn flat round dense icon="more" class="text-black" />
      </q-toolbar>
    </q-header>
    <q-page-container class="bg-grey-1">
      <router-view class="bg-grey-2" />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import { login } from '../composition/getLoginStatus'; //
import { showAddress } from '../composition/utils'; //

import TestData from '../composition/testJson';
import { initPWCore } from 'src/composition/loginMetamask';
import { setCell } from 'src/composition/userCells';
export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup() {
    let address = ref('Connect a wallet');
    const datas = new TestData();
    return {
      route: '/',
      login,
      datas,
      address,
      setCell,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      showAddress
    };
  },
  methods: {
    async loginMetamask() {
      console.log('lolo', this.address);
      this.ckb = await initPWCore();
      console.log(this.ckb);
      this.address = showAddress(this.ckb.ethAddress);
      console.log(this.ckb);
      // // todo unipass 交互
      // // window.location.href = 'https://unipass-demo.vercel.app/#/';
      // const user = this.datas.login();
      // await getLiveCell(user);
      // // todo 服务器交互
      // await login(user);
    },
    test() {
      console.log('test');
      const data = {
        name: 'name',
        fishes: 60,
        hash: 'sssss'
      };
      console.log(setCell('create', null, JSON.stringify(data)));
    }
  }
});
</script>
<style lang="scss" scoped>
.top {
  padding-left: 8px;
  padding-right: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
