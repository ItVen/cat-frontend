<!--
 * @Author: Aven
 * @Date: 2021-04-02 14:59:50
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-18 16:32:02
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
        <q-btn flat round dense icon="gamepad" class="text-black" />
        <q-btn flat round dense icon="more" class="text-black" />
      </q-toolbar>
    </q-header>
    <q-page-container class="bg-grey-1">
      <router-view class="bg-grey-2" />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import { login } from '../composition/getLoginStatus'; //
import { showAddress } from '../composition/utils'; //

import { initPWCore } from 'src/composition/loginMetamask';
import { PWCoreData } from 'src/composition/interface';
import { toHash } from 'src/composition/getHash';
export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup() {
    const contactsLoading = ref(false);
    let address = ref('Connect a wallet');
    onMounted(async () => {
      contactsLoading.value = true;
      const pwData = await initPWCore();
      address.value = showAddress(pwData.ethAddress);
      if (pwData.address) await login(pwData.ethAddress, pwData.address);
      contactsLoading.value = false;
    });
    return {
      route: '/',
      login,
      contactsLoading,
      address,
      showAddress,
      toHash
    };
  },
  methods: {
    async loginMetamask() {
      this.ckb = await initPWCore();
      // // console.log(this.ckb);
      // toHash(
      //   'name',
      //   '0x96d970f8c7c6d8e67442e83ab98a13a70511ba04bc1e2447ddc073bc7426a1c3'
      // );
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
