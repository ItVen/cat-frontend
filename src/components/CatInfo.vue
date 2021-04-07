<!--
 * @Author: Aven
 * @Date: 2021-04-06 14:01:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-07 13:44:21
 * @Description: 
-->
<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section
          class="fit column  justify-center items-center content-start"
        >
          <q-img class="my-icon" :src="icon" :ratio="1" />
          <div class="text-subtitle2 q-mt-sm q-mb-xs">{{ name }}</div>
          <div class="text-subtitle2 text-grey">{{ frishes }}</div>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-section class="col-5 flex flex-center">
        <div class="fit row  justify-around">
          <div>HP:{{ ph }}</div>
          <div>ATK:{{ atk }}</div>
        </div>
        <div class="fit row  justify-around">
          <div>DEF:{{ def }}</div>
          <div>LCK:{{ lck }}</div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-btn
          no-caps
          label="send"
          color="primary"
          @click="send"
          style="width: 200px"
        />
        <!-- <q-btn flat @click="_copy"> 复制 </q-btn>
        <q-btn flat @click="_export"> 导出 </q-btn>
        <q-btn flat @click="_share"> 分享 </q-btn> -->
      </q-card-actions>
    </q-card>
    <bottom-sheet :name="name" v-show="_show" @close="send" />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import { getAttribute } from '../composition/getHash';
import { getCatIcon } from '../composition/utils';
import BottomSheet from './BottomSheet.vue';
export default defineComponent({
  components: { BottomSheet },
  name: 'CatInfo',
  props: {
    name: {
      type: String,
      default: 'name'
    },
    frishes: {
      type: Number,
      default: 100
    },
    hash: String // todo  根据hash 计算属性
  },
  setup(props) {
    const attr = getAttribute(props.hash);
    const icon = getCatIcon(props.name);
    return {
      _show: false,
      icon,
      ...attr
    };
  },
  methods: {
    send() {
      // todo
      this._show = !this._show;
      console.log('export', this.icon);
    }
  }
});
</script>
<style lang="scss" scoped>
.my-card {
  max-width: 350px;
  height: 300px;
  .my-icon {
    width: 100px;
    height: 80px;
  }
}
</style>
