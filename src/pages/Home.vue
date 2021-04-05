<!--
 * @Author: Aven
 * @Date: 2021-04-05 18:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-05 19:02:35
 * @Description: 
-->
<template>
  <div class="fullscreen flex flex-center">
    Home_
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Home',
  setup() {
    return { tab: 'mails' };
  }
});
</script>
