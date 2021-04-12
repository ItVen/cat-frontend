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
        @name="getName"
        :create="create"
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
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import { getAttribute, getCellCreateData } from '../composition/getHash';
import { getCatIcon, showAddress } from '../composition/utils';
import AttrView from './AttrView.vue';
import { sendTransaction } from '../composition/loginMetamask';
import SDBuilder from '../composition/sd-builder';
import { setCell, getAddress, getLockHash } from 'src/composition/userCells';
export default defineComponent({
  components: { AttrView },
  name: 'CatDetails',
  props: {
    cat: {
      name: {
        type: String,
        default: '?'
      },
      fishes: {
        type: Number,
        default: 0
      },
      win: {
        type: Number,
        default: 0
      },
      mur: {
        type: Number,
        default: 0
      },
      hash: {
        type: String,
        default: '?'
      }, // todo  根据hash 计算属性
      email: {
        type: String,
        default: '?'
      }
    },
    mine: {
      type: Boolean,
      default: false
    },
    create: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    console.log('cat-details');
    let label = ref('Transfer');
    let address = ref('');
    if (props.mine) {
      address = showAddress(getAddress());
      if (props.create) label = ref('Submit');
    } else {
      // todo 获取对应的地址
      address = showAddress(getAddress());
      label = ref('Challenge');
    }
    //todo 拿服务器给的数据
    const attr = getAttribute(props.cat.hash);
    const icon = getCatIcon(props.cat.name);
    return {
      icon,
      label,
      address,
      setCell,
      loading: ref(false),
      ...attr,
      sendTransaction,
      SDBuilder,
      createName: ref(''),
      getCellCreateData,
      getLockHash
    };
  },
  methods: {
    async action() {
      // todo 转账或者battle
      if (this.create) {
        await this.createCat();
      } else if (this.mine) {
        // todo 发起转账
        console.log('发起转账', this.label);
      } else {
        // 开始 battle
        console.log('开始 battle');
        void this.$router.push({
          path: '/battle',
          query: { cat: this.cat }
        });
      }
    },
    async createCat() {
      this.loading = true;
      // todo 创建自己的cat
      const data = getCellCreateData(this.createName, getLockHash());
      const cellData = setCell('create', null, JSON.stringify(data));
      const builder = new SDBuilder(cellData.inputCell, cellData.outputCell);
      try {
        const txHash = await sendTransaction(builder);
        console.log('----------txHash', txHash);
        // todo 卡片创建成功 刷新ui界面 上传服务器 获取账户下的卡片
      } catch (e) {
        console.log(e);
        // todo 提示创建失败
      }
      this.loading = false;
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
    },
    getName(data) {
      this.createName = data;
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
