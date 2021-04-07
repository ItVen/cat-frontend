<!--
 * @Author: Aven
 * @Date: 2021-04-07 13:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-07 13:39:04
 * @Description: 
-->
<template>
  <div class="mbottom fixed-bottom z-top">
    <q-form @reset="onCancel" @submit="onSend">
      <div class="fit row  justify-center items-center content-center">
        <span>Transfer NFT</span>
      </div>
      <div class="fit row  justify-center items-center content-center">
        <span>from:</span>
        <span style="width:200px">{{ name }}</span>
      </div>
      <br />
      <div class="fit row  justify-center items-center content-center">
        <span>to:</span>
        <q-input outlined v-model="to" placeholder="Email address" />
      </div>
      <br />

      <div class="fit row  justify-around">
        <q-btn no-caps label="Cancel" type="reset" color="primary" />
        <q-btn no-caps label="Send" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import { isEmail } from '../composition/utils';
export default defineComponent({
  name: 'BottomSheet',
  props: {
    name: String
  },
  setup() {
    return {
      to: '',
      isEmail
    };
  },
  methods: {
    onCancel() {
      this.$emit('close');
    },

    onSend() {
      const email = isEmail(this.to);
      if (!email) {
        // todo 验证unipass上是否有邮箱注册
      }
      // todo  发起交易转账
      console.log('email', email);
    }
  }
});
</script>
<style lang="scss" scoped>
.mbottom {
  width: 100%;
  height: 200px;
  background: white;
  margin: 0;
  border-radius: 10px 10px 0 0;
}
</style>
