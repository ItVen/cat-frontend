<template>
  <q-toolbar style=" width: 60vw; margin-top: 10px;">
    <dev class="text-h6">{{ all }} Sourly Cat</dev>
    <q-space />
    <q-select
      outlined
      v-model="state"
      :options="stateList"
      flat
      round
      dense
      style="width: 10vw; margin-right: 10px;"
    />
    <q-select
      flat
      round
      dense
      outlined
      v-model="sort"
      :options="sortList"
      style="width: 10vw;"
      @change="setSort"
    />
  </q-toolbar>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'AllCat',
  props: {
    all: {
      required: true,
      type: Number,
      defualt: 0
    }
  },
  setup() {
    return {
      state: 'All',
      sort: 'Latest',
      stateList: ['All', 'Alive', 'Dead'],
      sortList: ['Latest', 'Fishes', 'Wins', 'Mutations']
    };
  },
  methods: {
    setSort() {
      console.log('sort');
    }
  }
});
</script>
