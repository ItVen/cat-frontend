<!--
 * @Author: Aven
 * @Date: 2021-04-05 18:23:47
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-06 23:18:15
 * @Description: 
-->
<template>
  <div>
    <div class="lay2btn" @click="$emit('send')">
      <q-icon :color="color" :name="iconLeft" />
      <span>{{ text }}</span>
      <q-knob
        :class="showProgress"
        v-model="progress"
        size="20px"
        :thickness="0.22"
        color="info"
        track-color="grey-3"
      />
      <q-icon
        :class="showLoginState"
        :color="color"
        :name="iconRight"
        size="20px"
      />
    </div>
  </div>
</template>
<script>
import { getStateData } from 'src/composition/stateButton';
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  name: 'StateButton',
  props: {
    contexst: String,
    state: String,
    value: Number
  },
  setup(props) {
    const progress = props.value | 0;
    return {
      progress,
      ...getStateData(props.value, props.state, props.contexst)
    };
  },
  methods: {
    login: {
      //  window.location.href = 'https://unipass-demo.vercel.app/#/';
    }
  }
});
</script>
<style lang="scss">
.lay2btn {
  display: flex;
  width: 200px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border: 1px;
  color: $primary;
  padding-left: 5px;
  padding-right: 5px;
  border: 2px solid $primary;
  border-radius: 30px;
}
</style>
