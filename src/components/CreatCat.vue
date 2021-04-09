<!--
 * @Author: Aven
 * @Date: 2021-04-06 09:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-09 10:33:23
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
    <div>
      <q-btn
        v-if="loading"
        no-caps
        label="create"
        color="primary"
        style="width: 100px"
        @click="login"
        disable
      >
      </q-btn>
      <q-btn
        v-else
        no-caps
        label="create"
        color="primary"
        style="width: 100px"
        @click="login"
      >
      </q-btn>
      <q-spinner
        v-if="loading"
        class="row  justify-center items-center "
        size="3em"
        :thickness="2"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { getNameIsUsed, resetUserInfo } from '../composition/getLoginStatus';
export default defineComponent({
  name: 'CreateCate',
  setup() {
    return { name: '', getNameIsUsed, resetUserInfo, loading: false };
  },
  methods: {
    async login() {
      this.loading = true;
      // todo 验证名字是否已经创建
      if (this.name) {
        const data = await getNameIsUsed(this.name);
        console.log('ntf', data);
        // todo cat 置0
        resetUserInfo();
        // todo 展示卡片
        this.$emit('show', data);
      }
      this.loading = false;
    }
  }
});
</script>
