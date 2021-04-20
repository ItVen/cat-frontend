<!--
 * @Author: Aven
 * @Date: 2021-04-06 14:01:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-19 11:23:14
 * @Description: 
-->
<template>
  <div class=" wrap justify-center items-center content-center">
    <span
      class="text-white text-body1"
      style="margin-bottom:10px; margin-left:10px"
      >{{ title }}</span
    >
    <br />
    <q-card
      class="my-card self-center"
      flat
      bordered
      style="border-radius: 10px; margin-top:10px;"
    >
      <q-card-section horizontal>
        <q-card-section class="fit column  justify-center items-center ">
          <q-img class="my-icon" :src="getCatIcon(cat.name)" :ratio="1" />
          <div class="text-h5 text-weight-bold q-mt-sm q-mb-xs">
            {{ cat.name }}
          </div>
          <div
            class="text-h6 text-weight-regular fit row  justify-center items-center content-center"
          >
            <br />
            <q-icon
              class="self-center"
              name="img:icons/v2/fish-left.png"
              size="20px"
              style="margin-right: 10px;"
            />
            <span class="self-center">{{ cat.fishes }} </span>
          </div>

          <div
            class="fit row  justify-around q-mt-sm q-mb-xs items-center text-subtitle1 text-weight-bold"
          >
            <div class="row  justify-center items-center content-center">
              <q-icon
                class="self-center"
                name="img:icons/v2/health.png"
                size="20px"
                style="margin-right: 3px;"
              />
              <span class="self-center">{{ cat.attr.ph }} </span>
            </div>
            <div class="row  justify-center items-center content-center">
              <q-icon
                class="self-center"
                name="img:icons/v2/attack.png"
                size="20px"
                style="margin-right: 3px;"
              />
              <span class="self-center">{{ cat.attr.atk }} </span>
            </div>
            <div class="row  justify-center items-center content-center">
              <q-icon
                name="img:icons/v2/defense.png"
                size="20px"
                style="margin-right: 3px;"
              />
              <span class="self-center">{{ cat.attr.def }} </span>
            </div>
            <div class="row  justify-center items-center content-center">
              <q-icon
                class="self-center"
                name="img:icons/v2/lucky.png"
                size="20px"
                style="margin-right: 3px;"
              />
              <span class="self-center">{{ cat.attr.lck }} </span>
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { getAttribute } from '../composition/getHash';
import { getCatIcon } from '../composition/utils';
export default defineComponent({
  name: 'CatInfo',
  props: {
    cat: {
      name: {
        type: String,
        default: '?'
      },
      frishes: {
        type: Number,
        default: 0
      },
      attr: Object,
      hash: String // todo  根据hash 计算属性
    },
    mine: Boolean,
    title: String
  },
  setup() {
    return {
      getCatIcon
    };
  },
  methods: {
    send() {
      // todo unipass 交互
      window.location.href = 'https://unipass-demo.vercel.app/#/';
    }
  }
});
</script>
//
<style lang="scss" scoped>
.my-card {
  max-width: 1024px;
  background: #79b7c5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #9484e0,
    #79b7c5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #9484e0,
    #79b7c5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  .my-icon {
    width: 70%;
  }
}
</style>
