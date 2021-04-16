<!--
 * @Author: Aven
 * @Date: 2021-04-10 19:46:54
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-16 10:20:25
 * @Description: 
-->
<template>
  <q-page class="fix row wrap  justify-center items-start content-center">
    <div class="col-3 column content-center" v-if="battle">
      <!-- 对方的cat -->
      <span v-if="!reslut" class="text-h6" style="margin-left: 15px;"
        >Owner:<span class="text-blue">{{ battle.name }} </span></span
      >
      <span v-else class="text-h5" style="margin-left: 15px;">{{
        message
      }}</span>
      <cat-info class="self-center" :cat="battle"></cat-info>
    </div>
    <div class="self-center">
      <q-btn
        v-if="!reslut"
        dense
        icon="gamepad"
        class="text-black"
        label="battle"
        @click="toBattle"
      />
      <q-icon class="col-1" v-else name="today" />
    </div>

    <div class="col-3 column  content-center " v-if="mine">
      <!-- 自己的cat -->
      <span v-if="!reslut" class="text-h6" style="margin-left: 15px;"
        >Your Sourly Cat</span
      >
      <span v-else class="text-h5 invisible" style="margin-left: 15px;">{{
        message
      }}</span>
      <cat-info class="self-baseline" :cat="mine"></cat-info>
    </div>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import CatInfo from 'src/components/CatInfo.vue';
import { goBattle } from '../composition/battle';
import { getBattleCell } from '../composition/userCells';
export default defineComponent({
  components: { CatInfo },
  name: 'Battle',
  setup(props, ctx) {
    let cat = ctx.root.$route.query.cat;
    console.log(cat);
    let name = ctx.root.$route.query.name;
    let mine = ref();
    let battle = ref();
    let battleName = ref();
    let loading = ref(false);
    if (name) {
      onMounted(async () => {
        loading.value = true;
        // todo 获取两种卡片信息接口
        const data = await getBattleCell(name);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        mine.value = data.mine;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        battle.value = data.battle;
        console.log(mine, battle, battleName);
        loading.value = false;
      });
    }
    return {
      mine,
      battle,
      goBattle,
      reslut: ref(false),
      message: ref(''),
      loading: ref(false)
    };
  },
  methods: {
    async toBattle() {
      this.loading = true;
      await goBattle(this.mine, this.battle);
      this.loading = false;
      // todo 更新界面
    }
  }
});
</script>
