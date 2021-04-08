<!--
 * @Author: Aven
 * @Date: 2021-04-06 14:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-07 09:45:47
 * @Description: 
-->
<template>
  <div class="flex column">
    <span class="text-h6">{{ title }} </span>
    <q-table :data="data" :columns="columns" row-key="name" flat hide-bottom />
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  name: 'RankingList',
  props: {
    title: String
  },
  setup() {
    return {
      columns: [
        { name: 'name', label: 'name', field: 'name' },
        { name: 'count', label: 'count', field: 'count' }
      ],
      data: [
        {
          name: 'ssssss',
          fishes: 60,
          hash:
            '0x36a491bcf8ff9e94e49f2bd99969ed51ceb256a8cfbe1ed0583da0c6edb15cd8',
          count: 60
        },
        {
          name: 'zzzsasa',
          fishes: 56,
          hash:
            '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601',
          count: 56
        },
        {
          name: 'ssssss',
          fishes: 60,
          hash:
            '0x36a491bcf8ff9e94e49f2bd99969ed51ceb256a8cfbe1ed0583da0c6edb15cd8',
          count: 20
        },
        {
          name: 'zzzsasa',
          fishes: 56,
          hash:
            '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601',
          count: 10
        }
      ]
    };
  }
});
</script>
