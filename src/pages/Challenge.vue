<!--
 * @Author: Aven
 * @Date: 2021-04-06 21:54:55
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-09 00:35:10
 * @Description: 
-->
<template>
  <q-page class="fullscreen">
    <top-bars
      :showL="true"
      :showR="false"
      :right="'sign up'"
      :rightUrl="'signup'"
      :leftUrl="'/'"
    ></top-bars>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import TopBars from 'src/components/TopBars.vue';

export default defineComponent({
  name: 'Challenge',
  components: { TopBars },
  setup() {
    return {};
  }
});
</script>
