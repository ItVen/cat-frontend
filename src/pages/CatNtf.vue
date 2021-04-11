<!--
 * @Author: Aven
 * @Date: 2021-04-10 15:38:18
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-11 12:05:56
 * @Description: 
-->
<template>
  <q-page class="fit row wrap justify-between items-start content-start">
    <cat-details
      :mine="mine"
      :cat="cat"
      :create="create"
      style="margin-top: 30px;  padding-bottom: 30px;"
    ></cat-details>

    <div
      v-if="!create"
      class="fit row wrap justify-center"
      style="padding-bottom: 30px;"
    >
      <q-card class="self-center col-8">
        <history-list @ntfs="ntfs"></history-list>
      </q-card>
      <br />
    </div>
    <div
      v-if="!create"
      class="fit row wrap justify-center"
      style="padding-bottom: 30px;"
    >
      <q-card class="self-center col-8">
        <transfer-list @ntfs="ntfs"></transfer-list>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import CatDetails from 'src/components/CatDetails.vue';
import HistoryList from 'src/components/HistoryList.vue';
import TransferList from 'src/components/TransferList.vue';

export default defineComponent({
  name: 'Account',
  components: { CatDetails, HistoryList, TransferList },
  setup(props, ctx) {
    const mine = ctx.root.$route.query.mine;
    let cat = ctx.root.$route.query.cat;
    let create = ref(true);
    // todo 查询卡片的胜负记录
    if (cat.hash) {
      cat.win = 10;
      cat.mur = 10;
      create = ref(false);
    }

    return {
      cat,
      mine,
      create
    };
  },
  methods: {
    ok() {
      console.log(this.$route.query);
    },
    ntfs(data) {
      console.log('ntfs', data);
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
