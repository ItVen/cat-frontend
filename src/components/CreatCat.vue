<!--
 * @Author: Aven
 * @Date: 2021-04-06 09:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-08 23:59:18
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
import { getNameIsUsed } from '../composition/getLoginStatus';
export default defineComponent({
  name: 'CreateCate',
  setup() {
    return { name: '', getNameIsUsed };
  },
  methods: {
    async login() {
      // todo 验证名字是否已经创建
      if (this.name) {
        const data = await getNameIsUsed(this.name);
        console.log(data);
        // todo 展示卡片
        this.$emit('show', data);
      }
    }
  }
});
</script>
