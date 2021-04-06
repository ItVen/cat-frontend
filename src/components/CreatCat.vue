<!--
 * @Author: Aven
 * @Date: 2021-04-06 09:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-06 21:53:48
 * @Description: 
-->
<template>
  <q-page class="flex column">
    <span class="text-subtitle1"
      >get your sourly cat and join thr battleground
    </span>
    <br />
    <q-input color="teal" outlined v-model="name" label="Name your sourly cat">
      <template v-slot:append>
        <q-avatar>
          <q-icon name="favorite" />
        </q-avatar>
      </template>
    </q-input>
    <br />
    <span>only lowercase letters and numbers,less than 12 bytes</span>
    <br />
    <q-btn
      no-caps
      label="create"
      color="primary"
      style="width: 100px"
      @click="login"
    ></q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { login } from '../composition/getLoginStatus';
export default defineComponent({
  name: 'CreateCate',
  setup() {
    return { name: '' };
  },
  methods: {
    async login() {
      await login('email', 'address');
    }
  }
});
</script>
