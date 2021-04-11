<!--
 * @Author: Aven
 * @Date: 2021-04-06 14:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-11 23:12:04
 * @Description: 
-->
<template>
  <q-table
    title="TransferList"
    :data="list"
    no-data-label="I didn't find anything for you"
  >
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
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  name: 'TranferList',
  props: {
    rowCount: Number,
    show: Boolean
  },
  setup() {
    return {
      loading: false,
      list: [
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
    ntfs(row) {
      console.log('ntfs', row);
    }
  }
});
</script>
