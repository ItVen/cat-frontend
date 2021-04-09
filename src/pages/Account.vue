<!--
 * @Author: Aven
 * @Date: 2021-04-06 21:54:55
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-09 10:53:58
 * @Description: 
-->
<template>
  <q-page>
    <div class="fit row wrap justify-between items-center content-end">
      <cat-details
        :mine="mine"
        :cat="cat"
        style="margin-top: 30px;"
      ></cat-details>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import CatDetails from 'src/components/CatDetails.vue';

export default defineComponent({
  name: 'Account',
  components: { CatDetails },
  setup(props, ctx) {
    const name = ctx.root.$route.query.name;
    let cat = ctx.root.$route.query.cat;
    console.log(name);
    let mine = ref(false);
    if (!name) {
      // todo 获取自己的卡片详情 装地址和eth地址
      console.log('获取自己的卡片详情 装地址和eth地址');
      mine = ref(true);
      // todo 装在cat
      cat = ref({
        name: 'zzzsasa',
        fishes: 56,
        address: '0xb4ff637130aaabe80b10b7b44ff4c7e302e9cb97',
        email: 'testemail@gamil.com',
        win: 10,
        mur: 10,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      });
    } else {
      // todo 获取的卡片战斗胜利记录
      console.log('获取的卡片战斗胜利记录');
      cat.win = 10;
      cat.mur = 10;
    }
    const double = computed(() => {
      console.log('computed', ctx.$route.query);
    });
    return { cat, mine };
  },
  methods: {
    ok() {
      console.log(this.$route.query);
    }
  }
});
</script>
