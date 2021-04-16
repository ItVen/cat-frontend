<!--
 * @Author: Aven
 * @Date: 2021-04-10 15:38:18
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-16 23:39:46
 * @Description: 
-->
<template>
  <q-page class="fit row wrap justify-between items-start content-start">
    <cat-details
      :mine="mine"
      :cat="cats"
      :create="create"
      style="margin-top: 30px;  padding-bottom: 30px;"
    ></cat-details>

    <div
      v-if="!create && cats"
      class="fit row wrap justify-center"
      style="padding-bottom: 30px;"
    >
      <q-card class="self-center col-8">
        <history-list @ntfs="ntfs"></history-list>
      </q-card>
      <br />
    </div>
    <div
      v-if="!create && cats"
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
import { Cat } from 'src/composition/interface';
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
    let cats = ref({});
    if (cat && !((cat as unknown) as Cat).hash) {
      create = ref(true);
      mine = ref(true);
    }
    if (name) {
      onMounted(async () => {
        contactsLoading.value = true;
        const data = await getOneCat(name as string);
        cats.value = data;
        mine.value = data.mine;
        if (data && data.hash) create.value = false;
        contactsLoading.value = false;
      });
    }
    return {
      cats,
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
