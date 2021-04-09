<!--
 * @Author: Aven
 * @Date: 2021-04-05 18:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-06 23:13:01
 * @Description: 
-->
<template>
  <q-page class="fit column  justify-start  content-center">
    <q-input
      outlined
      flat
      round
      dense
      v-model="search"
      placeholder="Search name and address"
      style=" width: 60vw; margin-top: 20px;"
      @keyup.enter="onSearch"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <all-cat all="10" />
    <cat-info :cat="cat"></cat-info>
  </q-page>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api';
import AllCat from 'src/components/AllCat.vue';
import CatInfo from 'src/components/CatInfo.vue';
import { isLogin } from '../composition/getLoginStatus';
export default defineComponent({
  name: 'Home',
  components: { AllCat, CatInfo },
  setup() {
    const login = isLogin();
    const cat = {
      name: 'zzzsasa',
      fishes: 56,
      hash: '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
    };
    return { login, search: ref(''), all: ref(0), cat };
  },
  methods: {
    onSearch() {
      console.log(this.search);
      // todo 搜索
    }
  }
});
</script>
