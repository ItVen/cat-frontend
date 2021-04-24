<!--
 * @Author: Aven
 * @Date: 2021-04-18 00:23:18
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-22 14:04:24
 * @Description:
-->
<template>
  <div
    class="fixed-bottom full-width column wrap justify-start items-center content-center"
    style="padding:50px 40px 40px;40px; height:50%"
  >
    <span class="text-center text-white text-body1 q-mt-md">
      Seem you don't have a Sourly Cat yet, create one for free
    </span>
    <div class="row full-width justify-around" style="margin-top:20px">
      <q-input
        dense
        round
        flat
        square
        ref="input"
        filled
        outlined
        class="q-ml-md col-10 text-black"
        v-model="name"
        placeholder="Name your sourly cat"
        :rules="[val => verify(val) || 'Please use 0-9 a-z maximum 16 byte']"
      >
        <template v-if="name" v-slot:append>
          <q-icon
            name="cancel"
            @click.stop="name = null"
            class="cursor-pointer"
          />
        </template>
      </q-input>
      <!-- <q-btn class="text-white" round dense flat icon="send" @click="send" /> -->
    </div>
    <div class="full-width row justify-center" style="padding-top:10px">
      <q-btn
        no-caps
        label="Create"
        :disable="disable"
        class="col-6"
        color="primary"
        @click="send"
      ></q-btn>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, watch } from '@vue/composition-api';
import { getNameIsUsed } from 'src/composition/getLoginStatus';
import { getCellCreateData } from 'src/composition/getHash';
import { issuesCat } from 'src/composition/get-home-data';
import { verifyName } from 'src/composition/utils';

export default defineComponent({
  name: 'V2SetName',
  setup() {
    return {
      getNameIsUsed,
      getCellCreateData,
      issuesCat,
      name: '',
      loading: ref(false),
      disable: ref(true),
      verifyName
    };
  },
  methods: {
    async send() {
      console.log('send');
      this.loading = true;
      const used = await getNameIsUsed(this.name);
      if (used) {
        this.loading = false;
        return;
      }
      const data = await getCellCreateData(this.name);
      console.log(data, '--------getCellCreateData');
      // todo 更新卡片信息
      if (data) {
        await issuesCat(data);
        location.reload();
        // void this.$router.push({ path: '/battle' });
      }
      // 失败
      this.loading = false;
    },
    verify(name) {
      const verify = verifyName(name);
      this.disable = !verify;
      console.log(verify, this.disable);
      return verify;
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
