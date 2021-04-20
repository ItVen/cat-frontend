import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
declare module 'vue/types/vue' {
  interface Vue {
    clipbard: VueClipboard;
  }
}

Vue.use(VueClipboard);
