<!--
 * @Author: Aven
 * @Date: 2021-04-05 18:03:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-07 00:01:09
 * @Description: 
-->
<template>
  <q-page class="fit column  justify-center items-center content-start">
    <ranking-list :title="fishesTitle" />
    <ranking-list :title="victoriesTitle" />
  </q-page>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import RankingList from 'src/components/RankingList.vue';

export default defineComponent({
  components: { RankingList },
  name: 'Ranking',
  setup() {
    return {
      fishesTitle: 'Ranking of Fishes',
      victoriesTitle: 'Ranking of Victories'
    };
  }
});
</script>
