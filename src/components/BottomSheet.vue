<!--
 * @Author: Aven
 * @Date: 2021-04-16 02:18:43
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-18 22:31:14
 * @Description: 
-->
<template>
  <q-card class="mbottom col-10">
    <q-form @reset="onCancel" @submit="onSend">
      <div class="fit row  justify-center items-center content-center">
        <span>Transfer NFT</span>
      </div>
      <div class="fit row  justify-center items-center content-center">
        <span>from:</span>
        <span style="width:200px">{{ address }}</span>
      </div>

      <br />
      <div class="fit row  justify-center items-center content-center">
        <span>to:</span>
        <q-input
          outlined
          flat
          round
          dense
          v-model="to"
          placeholder="Email address"
        />
      </div>
      <br />
      <div class="fit row  justify-around">
        <q-btn no-caps label="Cancel" type="reset" color="primary" />
        <q-btn no-caps label="Send" type="submit" color="primary" />
      </div>
    </q-form>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api';
import { isEmail } from '../composition/utils';
import { getTransferBuilder } from '../composition/userCells';
export default defineComponent({
  name: 'BottomSheet',
  props: {
    address: String
  },
  setup() {
    return {
      to: '',
      isEmail,
      loading: ref(false),
      getTransferBuilder
    };
  },
  methods: {
    onCancel() {
      this.$emit('close');
    },
    async onSend() {
      this.loading = true;
      const email = isEmail(this.to);
      if (!email) {
        // todo
      }
      // todo  发起交易转账 对方的cell  我的cell
      try {
        const tx = await getTransferBuilder(this.to);
        this.loading = false;
        console.log(tx);
        if (!tx) {
          // 转账失败
        } else {
          // 转账完成 去那里？
          this.$emit('close');
        }
      } catch (e) {
        this.loading = false;
      }
    }
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
  border: 2px solid $primary;
  border-radius: 30px;
}
</style>
