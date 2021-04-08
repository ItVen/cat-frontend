<template>
  <div class="bar row justify-between">
    <q-btn :class="{ invisible: !showL }" :to="leftUrl" icon="ion-arrow-back" />
    <q-btn
      no-caps
      :class="{ invisible: !showR }"
      outline
      rounded
      color="primary"
      :label="right"
      :to="rightUrl"
    />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'TopBar',
  props: {
    leftUrl: String,
    rightUrl: String,
    right: String,
    showR: Boolean,
    showL: Boolean
  },
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
.bar {
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 16px;
}
</style>
