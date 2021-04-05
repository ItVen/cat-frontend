<!--
 * @Author: Aven
 * @Date: 2021-04-05 18:01:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-05 19:02:16
 * @Description: 
-->
<template>
  <div class="fullscreen flex flex-center">
    _History
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'History',
  setup() {
    return { tab: 'mails' };
  }
});
</script>
