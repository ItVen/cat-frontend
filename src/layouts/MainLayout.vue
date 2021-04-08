<!--
 * @Author: Aven
 * @Date: 2021-04-02 14:59:50
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-08 21:46:43
 * @Description: 
-->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-grey-1">
      <div class="top row reverse">
        <state-button
          @send="clickToLogin"
          :state="false"
          to="test1"
          :value="0"
        ></state-button>
      </div>
    </q-header>
    <q-page-container class="bg-grey-1">
      <router-view class="bg-grey-2" />
    </q-page-container>

    <q-footer elevated class="bg-grey-1">
      <div class="q-gutter-y-md">
        <q-tabs
          v-model="tab"
          narrow-indicator
          dense
          align="justify"
          @click="jumb"
        >
          <q-tab
            :class="tab != '/' ? 'text-grey' : 'text-teal'"
            :ripple="{ color: 'primary' }"
            no-caps
            name="/"
            label="Home"
            :to="home"
          />
          <q-tab
            :class="tab != '/ranking' ? 'text-grey' : 'text-teal'"
            :ripple="{ color: 'primary' }"
            no-caps
            name="/ranking"
            label="Ranking"
            :to="ranking"
          />
          <q-tab
            :class="tab != '/history' ? 'text-grey' : 'text-teal'"
            :ripple="{ color: 'primary' }"
            no-caps
            name="/history"
            label="History"
            :to="history"
          />
        </q-tabs>
      </div>
    </q-footer>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import StateButton from 'src/components/StateButtons.vue';
import { login } from '../composition/getLoginStatus';
import { toHash } from '../composition/getHash';
import TestData from '../composition/testJson';
import { getLiveCell, getTransaction, getTip } from '../composition/rpcApi';
export default defineComponent({
  name: 'MainLayout',
  components: { StateButton },
  setup() {
    const datas = new TestData();
    return {
      tab: '/',
      login,
      toHash,
      datas,
      getLiveCell,
      getTransaction,
      getTip
    };
  },
  methods: {
    async clickToLogin() {
      // todo unipass 交互
      // window.location.href = 'https://unipass-demo.vercel.app/#/';
      const user = this.datas.login();
      await getLiveCell(user);
      // todo 服务器交互
      await login(user);
    },
    jumb() {
      void this.$router.push(this.tab);
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
