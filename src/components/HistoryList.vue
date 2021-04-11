<!--
 * @Author: Aven
 * @Date: 2021-04-06 14:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-11 10:19:23
 * @Description: 
-->
<template>
  <q-table
    :card-container-class="cardContainerClass"
    :data="list"
    row-key="name"
    title="Battle Tistoty"
    :filter="filter"
    :loading="loading"
    :pagination.sync="pagination"
    :rows-per-page-options="rowsPerPageOptions"
    no-data-label="I didn't find anything for you"
  >
    <!-- <template v-slot:top>
      <history-header title="battle histoty"></history-header>
    </template> -->
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="from" :props="props">
          <span @click="$emit('ntfs', props.row)">
            {{ props.row.from }}
          </span>
        </q-td>
        <q-td key="to" :props="props">
          <span @click="$emit('ntfs', props.row)">
            {{ props.row.to }}
          </span>
        </q-td>
        <q-td key="win" :props="props">
          <span>
            {{ props.row.win }}
          </span>
        </q-td>
        <q-td key="fishes" :props="props">
          <span>
            {{ props.row.fishes }}
          </span>
        </q-td>
        <q-td key="time" :props="props">
          <span>
            {{ props.row.time }}
          </span>
        </q-td>
        <q-td key="tx_hash" :props="props">
          <span>
            {{ props.row.tx_hash }}
          </span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api';
import HistoryHeader from './HistoryHeader.vue';
export default defineComponent({
  components: { HistoryHeader },
  name: 'HistoryList',
  setup() {
    return {
      loading: false,
      list: [
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
      ]
    };
  }
});
</script>
