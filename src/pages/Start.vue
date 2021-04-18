<!--
 * @Author: Aven
 * @Date: 2021-04-17 23:54:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-18 17:13:47
 * @Description: 
-->
<template>
  <q-page class="fullscreen bg-black ">
    <div class="fit column wrap justify-start items-center content-center home">
      <q-img
        contain
        src="/icons/v2/logo-white.png"
        style="padding-top: 100px; width:180px;"
      />
      <div
        class="center-self content-center"
        style="padding-left: 30px;padding-right: 30px;"
      >
        <!-- todo 文字换行 -->
        <span class="center-self text-white text-subtitle1"
          >Free to get your Sourly Cat NTF,start your first game based on
          blockchain</span
        >
      </div>
      <div
        class="full-width row wrap justify-center items-center content-end"
        style="padding-top: 30px;"
      >
        <v-2-cat-info class="col-9 bg-black" :cat="cat"></v-2-cat-info>
      </div>
      <div
        class="fixed-bottom center-self  full-width row wrap justify-center  "
        style="padding-bottom: 50px;"
      >
        <q-btn
          color="primary"
          class="center-self"
          label="Start Game"
          no-caps
          @click="start"
          style="height:50%"
        >
        </q-btn>
      </div>
    </div>
    <q-dialog v-model="toLogin">
      <sign-unipass @login="tologin"></sign-unipass>
    </q-dialog>
    <q-inner-loading :showing="loading" z-top>
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import SignUnipass from 'src/components/SignUnipass.vue';
import V2CatInfo from 'src/components/V2CatInfo.vue';
import { isLogin } from 'src/composition/getLoginStatus';
import { initPWCore } from 'src/composition/loginMetamask';
import { login } from '../composition/getLoginStatus'; //
export default defineComponent({
  components: { V2CatInfo, SignUnipass },
  name: 'Start',
  setup() {
    // todo islogin
    const cat = {
      name: 'ssssss',
      fishes: 60,
      hash: '0x36a491bcf8ff9e94e49f2bd99969ed51ceb256a8cfbe1ed0583da0c6edb15cd8'
    };
    return {
      cat,
      toLogin: ref(false),
      loading: ref(false),
      isLogin,
      login,
      initPWCore,
      url: 'https://placeimg.com/500/300/nature',
      logo: '/public/icons/v2/logo-white.png'
    };
  },
  methods: {
    start() {
      const login = isLogin();
      if (login) {
        void this.$router.push({ path: '/battle' });
      } else {
        this.toLogin = true;
      }
    },
    async tologin() {
      this.loading = true;
      const pw = await initPWCore();
      if (pw.address) {
        await login(pw.ethAddress, pw.address);
        void this.$router.push({ path: '/battle' });
      }
      this.loading = false;
    }
  }
});
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  border-radius: 30px;
  background-image: url('../../public/icons/v2/bg1.png');
  background-size: contain;
}
</style>
