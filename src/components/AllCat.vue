<!--
 * @Author: Aven
 * @Date: 2021-04-09 15:07:08
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-10 12:07:01
 * @Description: 
-->
<template>
  <q-toolbar style=" width: 60vw; margin-top: 10px;">
    <q-space />
    <q-select
      outlined
      v-model="state"
      :options="stateList"
      flat
      round
      dense
      style="width: 10vw; margin-right: 10px;"
    />
    <q-select
      flat
      round
      dense
      outlined
      v-model="sort"
      :options="sortList"
      style="width: 10vw;"
      @change="setSort"
    />
  </q-toolbar>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'AllCat',
  setup() {
    return {
      state: 'All',
      sort: 'Latest',
      stateList: ['All', 'Alive', 'Dead'],
      sortList: ['Latest', 'Fishes', 'Wins', 'Mutations']
    };
  },
  methods: {
    setSort() {
      console.log('sort');
    }
  }
});
</script>
