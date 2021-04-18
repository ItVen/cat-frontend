<!--
 * @Author: Aven
 * @Date: 2021-04-17 23:54:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-19 00:30:38
 * @Description: 
-->
<template>
  <q-page class="fullscreen bg-black">
    <q-img
      class="absolute-center"
      contain
      width="100% "
      src="/icons/v2/bg1.png"
    />
    <div
      class="bg center-self full column wrap justify-start items-center content-center"
    >
      <q-img
        contain
        src="/icons/v2/logo-white.png"
        style="padding-top: 100px; width:180px;"
      />
      <div class="absolute-center full-width row  justify-center ">
        <v-2-cat-info class="col-9" v-if="cat" :cat="cat"></v-2-cat-info>
      </div>
      <div
        class="absolute-bottom full-width row   justify-around  "
        style="padding-bottom: 100px;"
      >
        <q-btn color="primary" label="Transfer" no-caps @click="transfer">
        </q-btn>
        <q-btn color="primary" label="Share" no-caps @click="share"> </q-btn>
      </div>
    </div>
    <q-dialog v-model="show" position="bottom">
      <bottom-sheet :address="address" @close="show = !show"></bottom-sheet>
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
import { getMineCat } from 'src/composition/get-home-data';

export default defineComponent({
  components: { V2CatInfo, BottomSheet },
  name: 'V2Home',
  setup() {
    const cat = ref({});
    let loading = ref(false);
    let address = ref('');
    onMounted(async () => {
      loading.value = true;
      const data = await getMineCat();
      cat.value = data;
      address.value = data.address;
      loading.value = false;
    });
    return {
      loading,
      cat,
      address,
      show: ref(false)
    };
  },
  methods: {
    transfer() {
      this.show = true;
      console.log('transfer');
    },
    share() {
      console.log('share');
      // todo 分享功能
      // nativeShare = new NativeShare({});
    }
  }
});
</script>
<style lang="scss" scoped>
.bg {
  height: 100%;
  width: 100%;
  border-radius: 30px;
  background-image: url('../../public/icons/v2/bg1.png');
  background-size: cover;
}
</style>
