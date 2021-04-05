<!--
 * @Author: Aven
 * @Date: 2021-04-05 17:29:20
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-05 19:03:50
 * @Description: 
-->
<template>
  <q-page class="fullscreen">
    <q-card class="fullscreen">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="home"> <home /> </q-tab-panel>
        <q-tab-panel name="ranking"> <ranking /> </q-tab-panel>
        <q-tab-panel name="history"><history /> </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <q-footer elevated class="z-top bg-transparent">
      <div class="q-gutter-y-md">
        <q-tabs v-model="tab" narrow-indicator dense align="justify">
          <q-tab
            :class="tab != 'home' ? 'text-grey' : 'text-teal'"
            :ripple="{ color: 'primary' }"
            no-caps
            name="home"
            label="Home"
          />
          <q-tab
            :class="tab != 'ranking' ? 'text-grey' : 'text-teal'"
            :ripple="{ color: 'primary' }"
            no-caps
            name="ranking"
            label="Ranking"
          />
          <q-tab
            :class="tab != 'history' ? 'text-grey' : 'text-teal'"
            :ripple="{ color: 'primary' }"
            no-caps
            name="history"
            label="History"
          />
        </q-tabs>
      </div>
    </q-footer>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Home from './Home';
import History from './History';
import Ranking from './Ranking';
export default defineComponent({
  name: 'PageIndex',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  components: { Home, History, Ranking },
  setup() {
    return { tab: 'home' };
  },
  methods: {
    clickToLogin() {
      console.log('clickToLogin');
    }
  }
});
</script>
<style lang="scss" scoped></style>
