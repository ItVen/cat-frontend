<!--
 * @Author: Aven
 * @Date: 2021-04-17 23:54:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-19 00:49:30
 * @Description: 
-->
<template>
  <q-page class="fullscreen bg-black column">
    <q-img
      class="absolute-center"
      contain
      width="100% "
      src="/icons/v2/bg2.png"
      style="border-radius: 30px;"
    />
    <div
      class="bg center-self full column wrap justify-start items-center content-center"
    >
      <q-img
        contain
        width="60% "
        src="/icons/v2/battle-logo-white.png"
        style="margin:30px"
      />

      <div
        class="fullscreen column wrap  justify-evenly items-center content-center
      "
      >
        <div>
          <v-2-cat-info-little
            title="Opponent Cat"
            :win="win"
            :show="show"
            :cat="mineCat"
          >
          </v-2-cat-info-little>
        </div>
        <div height="50%">
          <v-2-cat-info-little
            title="Your Cat"
            :win="win"
            :show="show"
            :cat="mineCat"
          >
          </v-2-cat-info-little>
        </div>
      </div>
      <q-img
        class="absolute-center"
        contain
        width="60% "
        src="/icons/v2/slogan.png"
      />

      <v-2-set-name v-show="login"></v-2-set-name>
      <div
        v-show="!login"
        class="absolute-bottom full-width row  justify-around  z-top"
        style="margin:20px"
      >
        <q-btn
          dense
          v-if="!start"
          class="col-6"
          color="primary"
          label="Start Battle"
          no-caps
          @click="battle"
        >
        </q-btn>
        <q-btn
          dense
          v-if="start"
          class="col-4"
          color="primary"
          label="Go Home"
          no-caps
          @click="goHome"
        >
        </q-btn>
        <q-btn
          dense
          v-if="start"
          class="col-4"
          color="primary"
          label="Battle Again"
          no-caps
          @click="battle"
        >
        </q-btn>
      </div>
    </div>
    <q-inner-loading :showing="loading" class="z-top">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import V2CatInfoLittle from 'src/components/V2CatInfoLittle.vue';
import V2SetName from 'src/components/V2SetName.vue';
import { getBattleCell } from '../composition/userCells';
import { goBattle } from '../composition/battle';
export default defineComponent({
  components: { V2SetName, V2CatInfoLittle },
  name: 'Start',
  setup() {
    let loading = ref(false);
    let login = ref(false);
    let mineCat = ref(false);
    let battleCat = ref(false);
    let win = ref(false);
    let show = ref(false);
    onMounted(async () => {
      loading.value = true;
      const data = await getBattleCell();
      battleCat.value = data.battle;
      if (!data.mine) {
        login.value = true;
      } else {
        mineCat.value = data.mine;
      }
      loading.value = false;
    });
    return {
      login,
      start: ref(false),
      loading: ref(false),
      getBattleCell,
      mineCat,
      win,
      show,
      battleCat,
      goBattle
    };
  },
  methods: {
    async battle() {
      console.log('battle');
      this.loading = true;
      await goBattle(this.mineCat, this.battleCat);
      this.loading = false;
      this.start = !this.start;
      this.show = true;
      this.win = true;
    },
    goHome() {
      console.log('goHome');

      void this.$router.push({ path: '/home' });
    }
  }
});
</script>
<style lang="scss" scoped>
.bg {
  height: 100%;
  width: 100%;
  border-radius: 30px;
  background-image: url('../../public/icons/v2/bg2.png');
  background-size: cover;
}
</style>
