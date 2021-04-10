<!--
 * @Author: Aven
 * @Date: 2021-04-10 21:33:39
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-11 00:03:49
 * @Description: 
-->
<template>
  <div class="fit column  justify-center">
    <span class="text-h4" style="margin-bottom: 3px;"> {{ title }}</span>
    <div :v-show="show" class="fit row  justify-center">
      <q-select
        flat
        round
        dense
        outlined
        v-model="sort"
        class="col-10  self-center   "
        :options="sortList"
        @change="setSort"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HistoryHeader',
  props: {
    title: String,
    show: {
      type: Boolean,
      defulat: true
    }
  },

  setup() {
    return {
      sort: 'Latest',
      sortList: ['Latest', 'Fishes', 'Wins']
    };
  },
  methods: {
    setSort() {
      console.log('sort');
    }
  }
});
</script>
