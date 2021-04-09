<!--
 * @Author: Aven
 * @Date: 2021-04-06 14:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-09 10:40:29
 * @Description: 
-->
<template>
  <q-page class="flex column">
    <span class="text-h4">Welcome to Sourly Cat </span>
    <creat-cat v-if="create_cat > 0" @show="update"></creat-cat>
    <div v-else>
      <span class="text-subtitle1"> your cat</span>
      <div class="fit row wrap justify-between items-center content-end">
        <cat-info :cat="cat"></cat-info>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import { getUserInfo } from '../composition/getLoginStatus';
import CatInfo from './CatInfo.vue';
import CreatCat from './CreatCat.vue';
export default defineComponent({
  components: { CatInfo, CreatCat },
  name: 'LoginHome',
  setup() {
    let data = getUserInfo();
    console.log(data);
    return {
      create_cat: 0,
      cat: {},
      ...data
    };
  },
  methods: {
    update(data) {
      console.log('update', data);
      this.create_cat = 0;
      this.cat = data;
    }
  }
});
</script>
