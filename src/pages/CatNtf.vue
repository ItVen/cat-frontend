<!--
 * @Author: Aven
 * @Date: 2021-04-10 15:38:18
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-11 01:25:26
 * @Description: 
-->
<template>
  <q-page class="fit row wrap justify-between items-start content-start">
    <cat-details
      :mine="mine"
      :cat="cat"
      style="margin-top: 30px;  padding-bottom: 30px;"
    ></cat-details>

    <div class="fit row wrap justify-center" style="padding-bottom: 30px;">
      <q-card class="self-center col-8">
        <history-list @ntfs="ntfs"></history-list>
      </q-card>
      <br />
    </div>
    <div class="fit row wrap justify-center" style="padding-bottom: 30px;">
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
    // todo 查询卡片的胜负记录
    cat.win = 10;
    cat.mur = 10;

    return {
      cat,
      mine,
      battleList: [
        {
          from: 'ssssss',
          to: 'sss',
          win: false,
          fishes: '-3',
          time: '2021/04/09 10:00',
          tx_hash:
            '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
        },
        {
          from: 'zzzzz',
          to: 's',
          win: true,
          fishes: '3',
          time: '2021/04/09 10:00',
          tx_hash:
            '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
        }
      ],
      transferList: [
        {
          from: 'ssssss',
          to: 'sss',
          time: '2021/04/09 10:00',
          tx_hash:
            '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
        },
        {
          from: 'zzzzz',
          to: 's',
          time: '2021/04/09 10:00',
          tx_hash:
            '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
        }
      ]
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
