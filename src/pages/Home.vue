<!--
 * @Author: Aven
 * @Date: 2021-04-05 18:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-06 23:13:01
 * @Description: 
-->
<template>
  <q-page class="flex flex-center">
    <welcome v-show="!login"></welcome>
    <login-home v-show="login"></login-home>
  </q-page>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import Welcome from '../components/Welcome.vue';
import { isLogin } from '../composition/getLoginStatus';
import LoginHome from '../components/LoginHome.vue';
export default defineComponent({
  name: 'Home',
  components: { Welcome, LoginHome },
  setup() {
    const login = isLogin();
    return { login };
  },
  methods: {}
});
</script>
