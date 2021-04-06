<!--
 * @Author: Aven
 * @Date: 2021-04-06 14:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-06 23:48:37
 * @Description: 
-->
<template>
  <q-page class="flex column">
    <span class="text-h6">{{ title }} </span>
    <q-list bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>Single line item</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Item with caption</q-item-label>
          <q-item-label caption>Caption</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label overline>OVERLINE</q-item-label>
          <q-item-label>Item with caption</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  name: 'RankingList',
  props: {
    title: String
  },
  setup() {
    return {};
  }
});
</script>
