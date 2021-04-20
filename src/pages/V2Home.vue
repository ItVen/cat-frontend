<!--
 * @Author: Aven
 * @Date: 2021-04-17 23:54:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-19 17:36:38
 * @Description: 
-->
<template>
  <q-page class="fullscreen bg-black">
    <div class="bg"></div>
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
      class="center-self fullscreen column wrap justify-center items-start content-center "
    >
      <div class="full-width row  justify-center ">
        <v-2-cat-info
          title="My Sourly Cat"
          class="col-10"
          v-if="cat"
          :cat="cat"
        ></v-2-cat-info>
      </div>
      <div
        class="absolute-bottom full-width row   justify-around  "
        style="padding-bottom: 100px; padding-top: 120px; width:180px; height:30px"
      >
        <q-btn
          dense
          class="col-4"
          color="primary"
          label="Transfer"
          no-caps
          @click="transfer"
        >
        </q-btn>
        <q-btn
          dense
          class="col-4"
          color="primary"
          label="Share"
          no-caps
          @click="onShare"
          v-clipboard:copy="share"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
        </q-btn>
      </div>
    </div>
    <q-dialog v-model="show" position="bottom">
      <bottom-sheet
        :catName="cat && cat.name"
        :address="address"
        @close="show = !show"
      ></bottom-sheet>
    </q-dialog>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import BottomSheet from 'src/components/BottomSheet.vue';
import V2CatInfo from 'src/components/V2CatInfo.vue';
import { ShowLiveCat } from 'src/composition/loginMetamask';

export default defineComponent({
  components: { V2CatInfo, BottomSheet },
  name: 'V2Home',
  setup(props, ctx) {
    const cat = ref(false);
    let loading = ref(false);
    let address = ref('');
    let share = ref('https://cat-frontend-git-v2-sourlycat.vercel.app/#/');
    onMounted(async () => {
      loading.value = true;
      const data = await ShowLiveCat();
      console.log(data);
      if (!data) {
        void ctx.root.$router.push({
          path: '/'
        });
      }
      if (data) {
        cat.value = data;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        address.value = data.address;
      }
      share.value =
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        'https://cat-frontend-git-v2-sourlycat.vercel.app/#/?name=' + data.name;
      loading.value = false;
    });
    return {
      loading,
      cat,
      address,
      share,
      show: ref(false)
    };
  },
  methods: {
    transfer() {
      this.show = true;
      console.log('transfer');
    },
    onShare() {
      console.log(this.share);
    },
    onCopy(e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(e.text);
      console.log(this.share);
    },
    onError(e) {
      console.log('无法复制文本！');
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
