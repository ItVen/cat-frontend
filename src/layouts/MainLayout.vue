<!--
 * @Author: Aven
 * @Date: 2021-04-02 14:59:50
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-06 23:11:39
 * @Description: 
-->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="z-top bg-grey-1">
      <div class="top row reverse">
        <state-button
          @send="clickToLogin"
          contexst="Connect To Unipass"
          :state="false"
          class="z-top"
          to="test1"
          :value="0"
        ></state-button>
      </div>
    </q-header>
    <q-page-container class="bg-grey-1">
      <router-view class="bg-grey-2" />
    </q-page-container>

    <q-footer elevated class="z-top bg-grey-1">
      <div class="q-gutter-y-md">
        <q-tabs
          v-model="tab"
          narrow-indicator
          dense
          align="justify"
          @click="jumb"
        >
          <q-tab
            :class="tab != '/home' ? 'text-grey' : 'text-teal'"
            :ripple="{ color: 'primary' }"
            no-caps
            name="/home"
            label="Home"
            :to="home"
          />
          <q-tab
            :class="tab != '/ranking' ? 'text-grey' : 'text-teal'"
            :ripple="{ color: 'primary' }"
            no-caps
            name="/ranking"
            label="Ranking"
            :to="ranking"
          />
          <q-tab
            :class="tab != '/history' ? 'text-grey' : 'text-teal'"
            :ripple="{ color: 'primary' }"
            no-caps
            name="/history"
            label="History"
            :to="history"
          />
        </q-tabs>
      </div>
    </q-footer>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import StateButton from 'src/components/StateButtons.vue';
export default defineComponent({
  name: 'MainLayout',
  components: { StateButton },
  setup() {
    return { tab: '/home' };
  },
  methods: {
    clickToLogin() {
      console.log('clickToLogin');
    },
    jumb() {
      void this.$router.push(this.tab);
    }
  }
});
</script>
<style lang="scss" scoped>
.top {
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 16px;
}
</style>
