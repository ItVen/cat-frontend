<!--
 * @Author: Aven
 * @Date: 2021-04-06 22:04:05
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-10 19:51:13
 * @Description: 
-->
<template>
  <q-page class="fit column wrap justify-start items-start content-center">
    <q-input
      outlined
      flat
      round
      dense
      v-model="search"
      style="width:40vw;   margin-left: 35px; margin-top: 30px;"
      placeholder="Search name and address"
      @keyup.enter="onSearch"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-card class="col-8 my-card" style="margin: 30px;">
      <cat-list
        class="col-8 self-center"
        :list="cat"
        title="10 Sourly Cat"
        :mine="mine"
      ></cat-list>
    </q-card>
  </q-page>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api';
import CatList from 'src/components/CatList.vue';
import { isLogin } from '../composition/getLoginStatus';
export default defineComponent({
  name: 'Home',
  components: { CatList },
  setup() {
    const login = isLogin();
    const cat = [
      {
        name: 'zzzsasa',
        fishes: 56,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      },
      {
        name: 'zzzsasa',
        fishes: 56,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      },
      {
        name: 'zzzsasa',
        fishes: 56,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      },
      {
        name: 'zzzsasa',
        fishes: 56,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      },
      {
        name: 'zzzsasa',
        fishes: 56,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      },
      {
        name: 'zzzsasa',
        fishes: 56,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      },
      {
        name: 'zzzsasa',
        fishes: 56,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      }
    ];
    return {
      filter: ref(''),
      login,
      search: ref(''),
      cat
    };
  },
  methods: {
    onSearch() {
      console.log(this.search);
      // todo 搜索
    }
  }
});
</script>
