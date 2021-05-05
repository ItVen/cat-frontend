<!--
 * @Author: Aven
 * @Date: 2021-04-19 19:46:57
 * @LastEditors: Aven
 * @LastEditTime: 2021-05-01 16:45:34
 * @Description: 
     
-->
<template>
  <div class="row">
    <span class="text-caption" style="margin-top: 4px;">{{ count }}</span>
    <div
      v-if="state && state > 0"
      class="text-caption text-green-8"
      style="transform: scale(0.7);"
      color="text-yellow"
    >
      +{{ state }}
    </div>
    <div
      v-if="state && state < 0"
      class="text-caption text-red-8"
      style="transform: scale(0.7);"
    >
      {{ state }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
export default defineComponent({
  name: 'V2Attr',
  props: {
    count: String,
    state: Number
  },
  setup(props) {
    let win = ref(false);
    if ((props.state as number) > 0) {
      win = ref(true);
    }
    return { win };
  }
});
</script>
<style lang="scss" scoped>
.header {
  height: 45px;
  width: 190px;
  background-image: url('../../public/icons/v2/logo-white.png');
  background-size: contain;
}
</style>
