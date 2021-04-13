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
        <span>amount:</span>
        <q-input
          outlined
          flat
          round
          dense
          v-model="amount"
          placeholder="transfer amount"
        />
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
  </q-card>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
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
      amount: '',
      getTransferBuilder
    };
  },
  methods: {
    onCancel() {
      this.$emit('close');
    },

    async onSend() {
      // todo 验证unipass上是否有邮箱注册
      const email = isEmail(this.to);
      if (!email) {
      }
      // todo  发起交易转账 对方的cell  我的cell
      console.log(this.to, this.amount);
      await getTransferBuilder(this.to, this.amount);
      //  this.$emit('send');
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
}
</style>
