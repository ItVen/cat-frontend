<!--
 * @Author: Aven
 * @Date: 2021-04-06 14:01:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-19 00:25:44
 * @Description: 
-->
<template>
  <div class="column">
    <span class="center-start text-white text-subtitle2">{{ title }}</span>
    <q-card class="my-card self-center">
      <q-card-section horizontal>
        <q-card-section class="fit column  justify-center items-center ">
          <q-img class="my-icon col-2" :src="icon" :ratio="1" />
          <div class="text-body1 text-weight-bold q-mt-sm q-mb-xs">
            {{ cat.name }}
          </div>
          <div
            class="text-body2 text-weight-regular fit row  justify-center items-center content-center"
          >
            <br />
            <q-icon
              class="self-center"
              name="img:icons/fishes.png"
              size="15px"
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
                size="15px"
              />
              <span class="self-center">{{ ph }} </span>
            </div>
            <div class="row  justify-center items-center content-center">
              <q-icon
                class="self-center"
                name="img:icons/attack-outline.png"
                size="15px"
              />
              <span class="self-center">{{ atk }} </span>
            </div>
            <div class="row  justify-center items-center content-center">
              <q-icon name="img:icons/defense-outline.png" size="15px" />
              <span class="self-center">{{ def }} </span>
            </div>
            <div class="row  justify-center items-center content-center">
              <q-icon
                class="self-center"
                name="img:icons/lucky-outline.png"
                size="15px"
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
    },
    more() {
      void this.$router.push({
        path: '/account',
        query: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          name: this.cat.name
        }
      });
    }
  }
});
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  height: 100%;
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
span {
  margin-left: 3px;
}
</style>
