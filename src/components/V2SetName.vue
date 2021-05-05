<!--
 * @Author: Aven
 * @Date: 2021-04-18 00:23:18
 * @LastEditors: Aven
 * @LastEditTime: 2021-05-01 16:39:27
 * @Description: 
-->
<template>
  <div
    class="fixed-bottom full-width column wrap justify-start items-center content-center"
    style="padding:50px 40px 40px;40px; height:50%"
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
        label="Adopt"
        :disable="disable"
        class="text-grey col-6"
        color="primary"
        @click="send"
      ></q-btn>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
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
    t(type: string, name: string) {
      this.$t(type, name);
    },
    async send() {
      console.log('send');
      this.loading = true;
      const used = await getNameIsUsed(this.name);
      if (used) {
        this.loading = false;
        return;
      }
      const data = await getCellCreateData(this.name);
      console.log(data);
      // todo 更新卡片信息
      if (data) {
        await issuesCat(data as Record<string, string>);
        location.reload();
        // void this.$router.push({ path: '/battle' });
      }
      // 失败
      this.loading = false;
    },
    verify(name: string) {
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
