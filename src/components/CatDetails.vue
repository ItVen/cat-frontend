<template>
  <div class="fit row  justify-center ">
    <q-card
      class="row fix justify-center items-center col-3"
      style="border-radius: 15px; "
    >
      <div class="col-8">
        <q-img class="my-icon self-center" :src="icon" :ratio="1" />
      </div>
    </q-card>
    <div class="col-1"></div>
    <div flat bordered class="column  justify-around  content-around col-4">
      <attr-view
        :show="false"
        title="NAME"
        :text="cat.name"
        textClass="self-center text-h3"
      ></attr-view>
      <br />
      <attr-view
        :show="false"
        title="OWNED BY"
        :text="address"
        @more="showAllNtf"
        textClass="self-center text-body2"
      ></attr-view>
      <br />
      <div class="row  justify-start ">
        <attr-view
          name="img:icons/fishes.png"
          title="FISHES"
          :text="cat.fishes"
        ></attr-view>
        <attr-view
          name="img:icons/wins.png"
          title="WINS"
          :text="cat.win"
        ></attr-view>
        <attr-view
          name="img:icons/mutations.png"
          title="MURARIONS"
          :text="cat.mur"
        ></attr-view>
      </div>
      <br />
      <div class="row  justify-start ">
        <attr-view
          name="img:icons/health-outline.png"
          title="HEALTH"
          :text="ph"
        ></attr-view>
        <attr-view
          name="img:icons/attack-outline.png"
          title="ATTACK"
          :text="atk"
        ></attr-view>
        <attr-view
          name="img:icons/defense-outline.png"
          title="DEFENSE"
          :text="def"
        ></attr-view>
        <attr-view
          name="img:icons/lucky-outline.png"
          title="LUCKY"
          :text="lck"
        ></attr-view>
      </div>
      <div class=" row  justify-start  ">
        <q-btn
          style="margin-top: 42px;width: 120px;border-radius: 10px;font-size: 14pt; "
          no-caps
          round
          dense
          color="primary"
          :label="label"
          @click="action"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import { getAttribute } from '../composition/getHash';
import { getCatIcon, showEmail, showAddress } from '../composition/utils';
import AttrView from './AttrView.vue';
export default defineComponent({
  components: { AttrView },
  name: 'CatDetails',
  props: {
    cat: {
      name: String,
      fishes: Number,
      win: Number,
      mur: Number,
      hash: String, // todo  根据hash 计算属性
      address: String,
      email: String
    },
    mine: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    let label = ref('Challenge');
    if (props.mine) label = ref('Transfer');
    let address = ref('unll');
    if (props.cat.address) {
      address = showAddress(props.cat.address);
    }
    const attr = getAttribute(props.cat.hash);
    const icon = getCatIcon(props.cat.name);
    return {
      icon,
      label,
      address,
      ...attr
    };
  },
  methods: {
    action() {
      // todo 转账或者battle
      if (this.mine) {
        // todo 发起转账
        console.log('发起转账');
        void this.$router.push({
          path: '/tranfer',
          query: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            address: this.cat.address,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            email: this.cat.email
          }
        });
      } else {
        // 开始 battle
        console.log('开始 battle');
        void this.$router.push({
          path: '/battle',
          query: { cat: this.cat }
        });
      }
    },
    showAllNtf() {
      // todo 查看账户下的所有ntf
      console.log('查看账户下的所有ntf');
      void this.$router.push({
        path: '/nfts',
        query: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          address: this.cat.address,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          email: this.cat.email,
          mine: this.mine
        }
      });
    }
  }
});
</script>
<style lang="scss" scoped>
.my-card {
  padding-bottom: 10px;
  .my-icon {
    width: 70%;
    height: 100%;
  }
}
span {
  margin-left: 3px;
}
</style>
