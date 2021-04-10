<!--
 * @Author: Aven
 * @Date: 2021-04-10 12:01:26
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-10 17:14:01
 * @Description: 
-->
<template>
  <q-toolbar class="row justify-center items-center content-center">
    <span class="self-center " style="margin: 30px;">{{ account }}</span>
    <q-space />
    <q-card class="my-card" style="margin: 30px;" flat bordered>
      <div class="column" style="margin: 30px;">
        <span> Etherum Address: </span>
        <br />
        <div class="row items-center">
          <span>{{ address }}</span>
          <q-btn
            flat
            round
            dense
            icon="more"
            class="text-black"
            @click="copy"
          />
        </div>
      </div>
    </q-card>
  </q-toolbar>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'AddressView',
  props: {
    address: String,
    account: String
  },
  setup() {
    return {};
  },
  methods: {
    copy() {
      // todo copy
      console.log('copy');
    }
  }
});
</script>
