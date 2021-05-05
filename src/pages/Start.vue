<!--
 * @Author: Aven
 * @Date: 2021-04-17 23:54:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-21 07:12:07
 * @Description: 
-->
<template>
  <q-page class="fullscreen">
    <div class="home"></div>
    <img class="absolute-center img" src="/icons/v2/bg1.png" />
    <div class="fixed-top full-width row  justify-center">
      <q-img
        z-top
        contain
        src="/icons/v2/logo-white.png"
        style="padding-top: 120px; width:180px; height:30px"
      />
    </div>

    <div
      class="full-width column   justify-evenly items-center content-center fullscreen"
      style="padding-top: 60px; "
    >
      <div
        class="text-white text-body1 z-top full-width row  justify-center items-center "
      >
        <span class="text-center  z-top "
          >Free to get your Sourly Cat NFT, <br />start your first game based on
          blockchain</span
        >
      </div>
      <div class="full-width row justify-center">
        <v-2-cat-info v-show="cat" class="col-10" :cat="cat"></v-2-cat-info>
      </div>
      <div class="full-width row justify-center">
        <q-btn
          dense
          color="primary"
          class="center-self col-6"
          label="Start Game"
          no-caps
          @click="start"
        >
        </q-btn>
      </div>
    </div>
    <q-dialog v-model="toLogin">
      <sign-unipass @login="tologin"></sign-unipass>
    </q-dialog>
    <q-inner-loading :showing="loading" class="z-top">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import SignUnipass from 'src/components/SignUnipass.vue';
import V2CatInfo from 'src/components/V2CatInfo.vue';
import { isLogin } from 'src/composition/getLoginStatus';
import { initPWCore, getAccount } from 'src/composition/loginMetamask';
import { login } from '../composition/getLoginStatus'; //
import { getOneCat } from '../composition/get-home-data';
export default defineComponent({
  components: { V2CatInfo, SignUnipass },
  name: 'Start',
  setup(props, ctx) {
    let name = ctx.root.$route.query.name;
    const cat = ref();
    const loading = ref(false);

    onMounted(async () => {
      loading.value = true;
      const data = await getOneCat(name as string);
      if (data) {
        cat.value = data;
      }

      loading.value = false;
    });
    return {
      cat,
      toLogin: ref(false),
      isLogin,
      loading,
      name,
      login,
      initPWCore,
      url: 'https://placeimg.com/500/300/nature',
      logo: '/public/icons/v2/logo-white.png',
      getAccount
    };
  },
  methods: {
    async start() {
      this.loading = true;
      const pw = await initPWCore();
      if (pw) {
        void this.$router.push({
          path: '/battle',
          query: {
            name: this.name
          }
        });
      }
      this.loading = false;
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
