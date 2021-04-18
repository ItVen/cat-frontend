/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
          :text="fishes"
        ></attr-view>
        <!-- <attr-view
          name="img:icons/wins.png"
          title="WINS"
          :text="cat.win"
        ></attr-view> -->
        <!-- <attr-view
          name="img:icons/mutations.png"
          title="MURARIONS"
          :text="cat.mur"
        ></attr-view> -->
      </div>
      <br />
      <div class="row  justify-start ">
        <attr-view
          name="img:icons/health-outline.png"
          title="HEALTH"
          :text="attr.ph"
        ></attr-view>
        <attr-view
          name="img:icons/attack-outline.png"
          title="ATTACK"
          :text="attr.atk"
        ></attr-view>
        <attr-view
          name="img:icons/defense-outline.png"
          title="DEFENSE"
          :text="attr.def"
        ></attr-view>
        <attr-view
          name="img:icons/lucky-outline.png"
          title="LUCKY"
          :text="attr.lck"
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
    <q-dialog v-model="showDialog">
      <bottom-sheet
        :address="cat.address"
        @close="showDialog = !showDialog"
      ></bottom-sheet>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import { getAttribute, getCellCreateData } from '../composition/getHash';
import { getCatIcon, showAddress } from '../composition/utils';
import AttrView from './AttrView.vue';
import { sendTransaction } from '../composition/loginMetamask';
import SDBuilder from '../composition/sd-builder';
import { getAddress, getLockHash } from 'src/composition/userCells';
import { getNameIsUsed } from '../composition/getLoginStatus';
import BottomSheet from './BottomSheet.vue';
import { issuesCat } from '../composition/get-home-data';
export default defineComponent({
  components: { AttrView, BottomSheet },
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
      hash: {
        type: String,
        default: '?'
      }, // todo  根据hash 计算属性,
      mine: {
        type: Boolean,
        default: false
      },
      address: {
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
    // todo 获取卡片信息
    let label = ref('Transfer');
    let address = ref('');
    let fishes = ref('?');
    let newCat = ref(false);
    let attr = getAttribute('');
    let icon = getCatIcon('?');
    if (props.cat) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      attr = getAttribute(props.cat.hash);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      icon = getCatIcon(props.cat.name);
    }
    if (props.mine) {
      address = showAddress(getAddress());
      if (props.create) {
        label = ref('Submit');
        newCat = ref(true);
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      address = showAddress(props.cat.address);
      label = ref('Challenge');
    }
    return {
      icon,
      label,
      address,
      newCat,
      loading: ref(false),
      attr,
      fishes,
      sendTransaction,
      SDBuilder,
      issuesCat,
      createName: ref(''),
      showDialog: ref(false),
      getCellCreateData,
      getLockHash,
      getNameIsUsed,
      basic: false,
      fixed: false
    };
  },
  methods: {
    async action() {
      // todo 转账或者battle
      if (this.newCat) {
        await this.createCat();
      } else if (this.mine) {
        // todo 发起转账
        this.showDialog = true;
        console.log('发起转账', this.showDialog);
      } else {
        // 开始 battle
        void this.$router.push({
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          path: '/battle?name=' + this.cat.name
        });
      }
    },
    async createCat() {
      this.loading = true;
      const used = await getNameIsUsed(this.createName);
      if (used) {
        console.log('昵称已存在');
        this.loading = false;
        return;
      }
      // todo 转到服务器创建

      const data = getCellCreateData(this.createName, getLockHash());
      // 失败
      await issuesCat(data);
      this.loading = false;
    },
    toTransfer() {
      // todo 发起转账
      this.loading = true;
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
