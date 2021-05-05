<!--
 * @Author: Aven
 * @Date: 2021-04-16 02:18:43
 * @LastEditors: Aven
 * @LastEditTime: 2021-05-01 16:44:43
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
        <span style="width:200px" class="ellipsis">{{ address }}</span>
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
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { isEmail } from '../composition/utils';
import { pushTransfer, getTransferBuilder } from '../composition/transfer';
export default defineComponent({
  name: 'BottomSheet',
  props: {
    address: String,
    catName: String
  },
  setup() {
    return {
      to: '',
      isEmail,
      pushTransfer,
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
        console.log(tx, '-------tx');
        this.loading = false;
        if (!tx) {
          // 转账失败
        } else {
          // 转账完成 去那里？提交服务器 tx from  to
          await pushTransfer(tx as string, this.to, this.catName as string);
          this.$emit('close');
          void this.$router.push({
            path: '/'
          });
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
