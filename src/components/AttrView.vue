<!--
 * @Author: Aven
 * @Date: 2021-04-09 20:11:54
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-11 22:58:05
 * @Description: 
-->
<template>
  <div style="margin-right: 30px;">
    <div>
      <div class="text-grey" style="font-size: 1pt;">{{ title }}</div>
    </div>
    <div class="my-card row items-center">
      <q-icon v-show="show" :name="name" :size="size" />
      <input v-if="create" v-model="catName" @change="$emit('name', catName)" />
      <span
        v-else
        :class="textClass"
        @click="$emit('more')"
        style="margin-left: 3px;"
      >
        {{ text }}</span
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
export default defineComponent({
  name: 'AttrView',
  props: {
    size: {
      type: String,
      default: '25px'
    },
    textClass: {
      type: String,
      default: 'self-center text-h4'
    },
    title: {
      type: String,
      default: 'title'
    },
    text: {
      type: String,
      default: '?'
    },
    name: {
      type: String,
      default: 'img:icons/attack-outline.png'
    },
    show: {
      type: Boolean,
      default: true
    },
    create: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      catName: ref('')
    };
  }
});
</script>
