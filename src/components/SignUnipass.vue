<!--
 * @Author: Aven
 * @Date: 2021-04-18 11:51:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-05-01 16:45:00
 * @Description: 
-->
<template>
  <q-card class="mbottom column">
    <span>MetaMask</span>
    <q-btn
      no-caps
      label="Login"
      type="submit"
      color="primary"
      @click="$emit('login')"
    />
  </q-card>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SignUnipass',
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
.mbottom {
  min-width: 40%;
  padding: 30px;
  background: white;
  margin: 0;
  border-radius: 10px;
}
</style>
