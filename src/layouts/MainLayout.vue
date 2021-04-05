<!--
 * @Author: Aven
 * @Date: 2021-04-02 14:59:50
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-05 18:50:44
 * @Description: 
-->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="z-top bg-transparent">
      <div class="top row reverse">
        <state-button
          @send="clickToLogin"
          contexst="Connect To Unipass"
          :state="false"
          class="z-top"
          to="test1"
          :value="0"
        ></state-button>
      </div>
    </q-header>
    <q-page-container class="bg-grey-1">
      <router-view class="bg-grey-2" />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import StateButton from 'src/components/StateButtons.vue';
export default defineComponent({
  name: 'MainLayout',
  components: { StateButton },
  setup() {
    return {};
  },
  methods: {
    clickToLogin() {
      console.log('clickToLogin');
    }
  }
});
</script>
<style lang="scss" scoped>
.top {
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 16px;
}
</style>
