<!--
 * @Author: Aven
 * @Date: 2021-04-05 18:01:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-07 00:01:17
 * @Description: 
-->
<template>
  <q-page class="fullscreen flex flex-center">
    <history-list />
  </q-page>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import HistoryList from 'src/components/HistoryList.vue';

export default defineComponent({
  components: { HistoryList },
  name: 'History',
  setup() {
    return {};
  }
});
</script>
