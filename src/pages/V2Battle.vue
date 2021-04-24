<!--
 * @Author: Aven
 * @Date: 2021-04-17 23:54:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-20 00:14:36
 * @Description:
-->
<template>
  <q-page class="fullscreen bg-black column">
    <img class="absolute-center img" src="/icons/v2/bg2.png" />
    <div class="fixed-top full-width row  justify-center ">
      <q-img
        contain
        width="250px "
        src="/icons/v2/battle-logo-white.png"
        style="margin:30px"
      />
    </div>
    <div
      class="bg center-self full column wrap justify-start items-center content-center"
    >
      <div
        class="fixed-top  column wrap  justify-evenly items-center content-center"
        style="height:56%"
      >
        <div>
          <v-2-cat-info-little
            title="Opponent Cat"
            :win="win"
            :show="show"
            :cat="battleCat"
            v-show="battleCat && battleCat.attr"
          >
          </v-2-cat-info-little>
        </div>

        <v-2-set-name v-if="login" height="50%"></v-2-set-name>
        <div
          class="fixed-bottom  column wrap  justify-evenly items-center content-center"
          style="height:57%"
          v-else
        >
          <v-2-cat-info-little
            v-show="mineCat && mineCat.attr"
            title="Your Cat"
            :win="win"
            :cat="mineCat"
          >
          </v-2-cat-info-little>
        </div>
      </div>
      <q-img
        class="absolute-center"
        contain
        width="200px"
        src="/icons/v2/slogan.png"
      />

      <div
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
          @click="battleAgain"
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
import { getAttribute } from 'src/composition/getHash';
export default defineComponent({
  components: { V2SetName, V2CatInfoLittle },
  name: 'Start',
  setup(props, ctx) {
    let name = ctx.root.$route.query.name;
    console.log(name);
    let loading = ref(false);
    let login = ref(false);
    let mineCat = ref(false);
    let battleCat = ref(false);
    let win = ref(false);
    let show = ref(false);
    onMounted(async () => {
      loading.value = true;
      const data = await getBattleCell(name);
      console.log(data, 'data');
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
      getAttribute,
      goBattle
    };
  },
  methods: {
    async battle() {
      console.log('battle');
      this.loading = true;
      this.show = false;
      this.win = false;
      this.start = false;
      console.log(this.mineCat);
      console.log(this.battleCat);
      const data = await goBattle(this.mineCat, this.battleCat);
      this.mineCat = data.mineCat;
      this.battleCat = data.battleCat;
      console.log(data);
      this.loading = false;
      this.start = true;
      this.show = true;
      this.win = true;
    },
    battleAgain() {
      this.show = false;
      this.mineCat.battle = getAttribute('');
      this.battleCat.battle = getAttribute('');
      this.win = false;
      this.start = false;
    },
    goHome() {
      void this.$router.push({ path: '/home' });
    }
  }
});
</script>
<style lang="scss" scoped>
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
