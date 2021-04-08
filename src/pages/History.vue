<!--
 * @Author: Aven
 * @Date: 2021-04-05 18:01:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-07 09:43:19
 * @Description: 
-->
<template>
  <q-page class="full-width column">
    <history-list :data="list" />
  </q-page>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import HistoryList from 'src/components/HistoryList.vue';
import TestData from '../composition/testJson';
export default defineComponent({
  components: { HistoryList },
  name: 'History',
  setup() {
    const datas = new TestData();
    list = datas.historyList();
    return { datas, ...list };
  }
});
</script>
