<!--
 * @Author: Aven
 * @Date: 2021-04-06 09:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-06 14:23:37
 * @Description: 
-->
<template>
  <q-page class="flex column">
    <span class="text-h4">Welcome to Sourly Cat </span>
    <span class="text-subtitle1"
      >get your sourly cat and join thr battleground
    </span>
    <q-btn
      no-caps
      label="Connect to Unipass"
      color="primary"
      style="width: 200px"
      @click="login"
    ></q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { login } from '../composition/getLoginStatus';
export default defineComponent({
  name: 'Welcome',
  setup() {
    return {};
  },
  methods: {
    login() {
      // await login('email', 'address');
      // todo unipass交互
      window.location.href = 'https://unipass-demo.vercel.app/#/';
    }
  }
});
</script>
