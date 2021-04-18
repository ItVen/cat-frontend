<!--
 * @Author: Aven
 * @Date: 2021-04-18 11:51:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-19 01:11:52
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
<script>
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
