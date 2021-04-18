<!--
 * @Author: Aven
 * @Date: 2021-04-02 14:59:50
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-18 13:37:43
 * @Description: 
-->
<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="bg-black">
      <!-- <router-view style="max-width: 600px; margin: 0 auto" /> -->
      <router-view style="margin: 0 auto" />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup() {
    return {};
  }
});
</script>
