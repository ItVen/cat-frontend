<!--
 * @Author: Aven
 * @Date: 2021-04-06 14:02:44
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-13 12:35:04
 * @Description: 
-->
<template>
  <q-table
    title="TransferList"
    :data="list"
    v-show="list.length > 0"
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
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import { getTransferList } from '../composition/tx-history';
export default defineComponent({
  name: 'TranferList',
  props: {
    rowCount: Number,
    show: Boolean,
    name: String
  },
  setup(props) {
    const list = ref([]);
    onMounted(() => {
      list.value = getTransferList(props.name);
      console.log(list);
    });
    return {
      loading: false,
      list
    };
  },
  methods: {
    ntfs(row) {
      console.log('ntfs', row);
    }
  }
});
</script>
