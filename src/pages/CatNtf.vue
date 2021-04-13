<!--
 * @Author: Aven
 * @Date: 2021-04-10 15:38:18
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-13 11:53:00
 * @Description: 
-->
<template>
  <q-page class="fit row wrap justify-between items-start content-start">
    <cat-details
      :mine="cat.mine"
      :cat="cat"
      :name="cat.name"
      :hash="cat.hash"
      :address="cat.address"
      :create="create"
      style="margin-top: 30px;  padding-bottom: 30px;"
    ></cat-details>

    <div
      v-if="!create && cat"
      class="fit row wrap justify-center"
      style="padding-bottom: 30px;"
    >
      <q-card class="self-center col-8">
        <history-list @ntfs="ntfs"></history-list>
      </q-card>
      <br />
    </div>
    <div
      v-if="!create && cat"
      class="fit row wrap justify-center"
      style="padding-bottom: 30px;"
    >
      <q-card class="self-center col-8">
        <transfer-list @ntfs="ntfs"></transfer-list>
      </q-card>
    </div>
    <q-inner-loading :showing="contactsLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import CatDetails from 'src/components/CatDetails.vue';
import HistoryList from 'src/components/HistoryList.vue';
import TransferList from 'src/components/TransferList.vue';
import { getOneCat } from '../composition/get-home-data';
export default defineComponent({
  name: 'Account',
  components: { CatDetails, HistoryList, TransferList },
  setup(props, ctx) {
    const contactsLoading = ref(false);
    // 获取服务器上的cat
    const name = ctx.root.$route.query.name;
    let cat = ref(ctx.root.$route.query.cat);
    let create = ref(false);
    let mine = ref(false);
    if (cat && !cat.hash) {
      create = ref(true);
      mine = ref(true);
      // if (create) {
      //   cat = {
      //     hash: '',
      //     name: '',
      //     fishes: ''
      //   };
      // }
    }
    if (name) {
      onMounted(async () => {
        contactsLoading.value = true;
        const data = await getOneCat(name);
        cat.value = data;
        if (data.hash) create.value = false;
        contactsLoading.value = false;
      });
    }
    // todo 查询卡片的胜负记录
    return {
      cat,
      create,
      mine,
      contactsLoading
    };
  },
  methods: {
    ok() {
      console.log(this.$route.query);
    },
    ntfs(data: { address: any; email: any }) {
      // todo 查看账户下的所有ntf
      console.log('查看账户下的所有ntf');
      void this.$router.push({
        path: '/nfts',
        query: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          address: data.address,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          email: data.email
        }
      });
    }
  }
});
</script>
