<!--
 * @Author: Aven
 * @Date: 2021-04-06 14:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-06 23:58:03
 * @Description: 
-->
<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      :data="data"
      :columns="columns"
      row-key="name"
      flat
      bordered
    />
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  name: 'HistoryList',
  setup() {
    return {
      columns: [],
      data: []
    };
  }
});
</script>
