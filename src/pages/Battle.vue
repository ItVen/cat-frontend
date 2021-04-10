<!--
 * @Author: Aven
 * @Date: 2021-04-10 19:46:54
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-10 20:56:17
 * @Description: 
-->
<template>
  <q-page class="fix row wrap  justify-center items-start content-center">
    <div class="col-3 column content-center">
      <!-- 对方的cat -->
      <span v-if="!reslut" class="text-h6" style="margin-left: 15px;"
        >Owner:<sapn class="text-blue">{{ cat.name }} </sapn></span
      >
      <span v-else class="text-h5" style="margin-left: 15px;">{{
        message
      }}</span>
      <cat-info class="self-center" :cat="cat"></cat-info>
    </div>
    <div class="self-center">
      <q-btn
        v-if="!reslut"
        dense
        icon="gamepad"
        class="text-black"
        label="battle"
        @click="battle"
      />
      <q-icon class="col-1" v-else name="today" />
    </div>

    <div class="col-3 column  content-center ">
      <!-- 自己的cat -->
      <span v-if="!reslut" class="text-h6" style="margin-left: 15px;"
        >Your Sourly Cat</span
      >
      <span v-else class="text-h5 invisible" style="margin-left: 15px;">{{
        message
      }}</span>
      <cat-info class="  self-baseline   " :cat="cat"></cat-info>
    </div>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api';
import CatInfo from 'src/components/CatInfo.vue';
export default defineComponent({
  components: { CatInfo },
  name: 'Battle',
  setup(props, ctx) {
    let cat = ctx.root.$route.query.cat;
    cat = ref(cat);
    return {
      cat,
      reslut: ref(false),
      message: ref('You win'),
      loading: ref(false)
    };
  },
  methods: {
    battle() {
      console.log('开始battle');
      // todo 开始battle
      this.loading = true;
      const messages = ['You Win', 'You lose'];
      setTimeout(() => {
        this.reslut = !this.reslut;
        this.message = messages[new Date().getSeconds() % 2];
        this.loading = false;
      }, 1000);
    }
  }
});
</script>
