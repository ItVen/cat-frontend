<!--
 * @Author: Aven
 * @Date: 2021-04-10 15:38:18
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-10 16:24:26
 * @Description: 
-->
<template>
  <q-page class="fit row wrap justify-between items-start content-start">
    <cat-details
      :mine="mine"
      :cat="cat"
      style="margin-top: 30px;"
    ></cat-details>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import CatDetails from 'src/components/CatDetails.vue';

export default defineComponent({
  name: 'Account',
  components: { CatDetails },
  setup(props, ctx) {
    const mine = ctx.root.$route.query.mine;
    let cat = ctx.root.$route.query.cat;
    // todo 查询卡片的胜负记录
    cat.win = 10;
    cat.mur = 10;
    return { cat, mine };
  },
  methods: {
    ok() {
      console.log(this.$route.query);
    }
  }
});
</script>
