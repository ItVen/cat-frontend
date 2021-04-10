<!--
 * @Author: Aven
 * @Date: 2021-04-05 18:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-10 11:24:22
 * @Description: 
-->
<template>
  <q-page class="fit column  justify-start  content-center">
    <cat-list :list="cat" title="10 Sourly Cat"></cat-list>
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
