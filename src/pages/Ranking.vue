<!--
 * @Author: Aven
 * @Date: 2021-04-05 18:03:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-07 09:46:05
 * @Description: 
-->
<template>
  <q-page class="full-width column">
    <ranking-list :title="fishesTitle" :data="rankf" />
    <br />
    <ranking-list :title="victoriesTitle" :data="rankv" />
  </q-page>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import RankingList from 'src/components/RankingList.vue';

export default defineComponent({
  components: { RankingList },

  name: 'Ranking',
  name: 'History',
  setup() {
    const datas = new TestData();
    rankf = datas.fishesList();
    rankv = datas.VictoryList();
    return {
      fishesTitle: 'Ranking of Fishes',
      victoriesTitle: 'Ranking of Victories',
      rankf,
      rankv
    };
  }
});
</script>
