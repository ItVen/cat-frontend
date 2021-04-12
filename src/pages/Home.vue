<!--
 * @Author: Aven
 * @Date: 2021-04-06 22:04:05
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-12 15:28:16
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
        v-if="cat.length > 0"
        class="col-8 self-center"
        :list="cat"
        title="10 Sourly Cat"
      ></cat-list>
    </q-card>
    <q-inner-loading :showing="contactsLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import CatList from 'src/components/CatList.vue';
import { isLogin } from '../composition/getLoginStatus';
import { getList } from '../composition/get-home-data';
export default defineComponent({
  name: 'Home',
  components: { CatList },
  setup() {
    const login = isLogin();
    const contactsLoading = ref(false);
    let cat = ref([]);
    // 获取服务器上的cat
    onMounted(async () => {
      contactsLoading.value = true;
      cat.value = await getList();
      contactsLoading.value = false;
    });
    return {
      filter: ref(''),
      login,
      search: ref(''),
      cat,
      contactsLoading
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
