<!--
 * @Author: Aven
 * @Date: 2021-04-06 14:01:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-10 15:48:29
 * @Description: 
-->
<template>
  <!-- todo 转为纵向列表 -->
  <div class="q-pa-md">
    <q-table
      grid
      :card-container-class="cardContainerClass"
      :title="title"
      :data="list"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      :pagination.sync="pagination"
      :rows-per-page-options="rowsPerPageOptions"
    >
      <template v-slot:top-right>
        <all-cat />
      </template>
      <template v-slot:item="props">
        <cat-info :cat="props.row" :mine="mine"></cat-info>
      </template>
    </q-table>
  </div>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api';
import AllCat from './AllCat.vue';
import CatInfo from './CatInfo.vue';
export default defineComponent({
  components: { CatInfo, AllCat },
  name: 'CatList',
  props: {
    list: Array,
    title: String,
    mine: {
      type: Boolean,
      defluat: false
    }
  },
  setup() {
    return {
      filter: ref(''),
      search: ref('')
    };
  }
});
</script>
