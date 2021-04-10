<!--
 * @Author: Aven
 * @Date: 2021-04-10 12:01:26
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-10 12:07:08
 * @Description: 
-->
<template>
  <q-toolbar calss="col-8" style=" width: 60vw; margin-top: 10px;">
    <span>Account</span>
    <q-space />
    <div>
      <span> Etherum Address: </span>
      <span>Address</span>
    </div>
  </q-toolbar>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'AddressView',
  props: {
    Address: String,
    Account: String
  },
  setup() {
    return {};
  },
  methods: {
    setSort() {
      // todo copy
    }
  }
});
</script>
