<!--
 * @Author: Aven
 * @Date: 2021-04-06 14:01:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-18 14:04:24
 * @Description: 
-->
<template>
  <div class="clo-9 self-center">
    <span>{{ title }}</span>
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="fit column  justify-center items-center ">
          <q-img class="my-icon" :src="icon" :ratio="1" />
          <div class="text-h5 text-weight-bold q-mt-sm q-mb-xs">
            {{ cat.name }}
          </div>
          <div
            class="text-h6 text-weight-regular fit row  justify-center items-center content-center"
          >
            <br />
            <q-icon
              class="self-center"
              name="img:icons/fishes.png"
              size="30px"
            />
            <span class="self-center">{{ cat.fishes }} </span>
          </div>

          <div
            class="fit row  justify-around q-mt-sm q-mb-xs items-center text-subtitle1 text-weight-bold"
          >
            <div class="row  justify-center items-center content-center">
              <q-icon
                class="self-center"
                name="img:icons/health-outline.png"
                size="20px"
              />
              <span class="self-center">{{ ph }} </span>
            </div>
            <div class="row  justify-center items-center content-center">
              <q-icon
                class="self-center"
                name="img:icons/attack-outline.png"
                size="20px"
              />
              <span class="self-center">{{ atk }} </span>
            </div>
            <div class="row  justify-center items-center content-center">
              <q-icon name="img:icons/defense-outline.png" size="20px" />
              <span class="self-center">{{ def }} </span>
            </div>
            <div class="row  justify-center items-center content-center">
              <q-icon
                class="self-center"
                name="img:icons/lucky-outline.png"
                size="20px"
              />
              <span class="self-center">{{ lck }} </span>
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
      hash: String // todo  根据hash 计算属性
    },
    mine: Boolean,
    title: String
  },
  setup(props) {
    console.log(props.cat);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const attr = getAttribute(props.cat.hash);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const icon = getCatIcon(props.cat.name);
    return {
      icon,
      ...attr
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
// .my-card {
//   .my-icon {
//     width: 90%;
//   }
// }
// span {
//   margin-left: 3px;
// }
//
</style>
