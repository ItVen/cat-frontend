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
      hide-bottom
    />
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  name: 'HistoryList',
  props: {
    list: {
      list: Array,
      paget: Number
    }
  },
  setup(props) {
    return {
      columns: [
        { name: 'from', label: 'from', field: 'from' },
        { name: 'to', label: 'to', field: 'to' },
        { name: 'win', label: 'win', field: 'win' },
        { name: 'fishes', label: 'fishes', field: 'fishes' },
        { name: 'tx_hash', label: 'tx_hash', field: 'tx_hash' }
      ],
      data: props.list
    };
  }
});
</script>
