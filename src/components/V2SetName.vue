<!--
 * @Author: Aven
 * @Date: 2021-04-18 00:23:18
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-18 21:45:58
 * @Description: 
-->
<template>
  <div
    class="full-width column wrap justify-start items-center content-center"
    style="height:50%;padding:50px 40px 40px;40px"
  >
    <span class="text-center text-white text-body1">
      Seem you don't have a Sourly Cat yet, adopt one for free
    </span>
    <div class="row full-width justify-around" style="margin-top:20px">
      <q-input
        dense
        round
        flat
        square
        outlined
        class="q-ml-md bg-white col-9 text-black"
        v-model="name"
        placeholder="Name your sourly cat"
      >
      </q-input>
      <q-btn class="text-white" round dense flat icon="send" @click="send" />
    </div>
    <q-btn
      style="margin-top:20px"
      no-caps
      label="Adopt"
      class="text-grey"
      color="primary"
      @click="send"
    ></q-btn>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api';
import { getNameIsUsed } from 'src/composition/getLoginStatus';
import { getCellCreateData } from 'src/composition/getHash';
import { issuesCat } from 'src/composition/get-home-data';

export default defineComponent({
  name: 'V2SetName',
  setup() {
    return {
      getNameIsUsed,
      getCellCreateData,
      issuesCat,
      name: '',
      loading: ref(false)
    };
  },
  methods: {
    async send() {
      console.log('send');
      this.loading = true;
      const used = await getNameIsUsed(this.name);
      if (used) {
        console.log('昵称已存在');
        this.loading = false;
        return;
      }
      const data = await getCellCreateData(this.name);
      console.log(data);
      // todo 更新卡片信息
      if (data) {
        await issuesCat(data);
        void this.$router.push({ path: '/battle' });
      }
      // 失败
      this.loading = false;
    }
  }
});
</script>
<style lang="scss" scoped>
.header {
  height: 45px;
  width: 190px;
  background-image: url('../../public/icons/v2/logo-white.png');
  background-size: contain;
}
</style>
