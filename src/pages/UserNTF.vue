<!--
 * @Author: Aven
 * @Date: 2021-04-10 10:46:02
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-16 17:43:29
 * @Description: 
-->
<template>
  <q-page class="fit row wrap justify-around  items-start content-start">
    <q-card class="col-8 my-card" style="margin: 30px;">
      <address-view
        :account="data.address"
        :address="data.address"
        style="margin-top: 10px;"
      ></address-view>
    </q-card>
    <q-card class="col-8 my-card" style="margin: 30px;">
      <q-btn
        v-if="create_cat > 0"
        class="self-center"
        icon="add"
        size="70px"
        @click="add"
      />
      <cat-list
        v-if="cat.length > 0"
        class="col-8 self-center"
        :list="cat"
        title="10 Sourly Cat"
        :mine="mine"
      ></cat-list>
    </q-card>
    <q-inner-loading :showing="contactsLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import AddressView from 'src/components/AddressView.vue';
import CatList from 'src/components/CatList.vue';
import { getUsetList } from '../composition/get-home-data';
import { canCreateCell } from '../composition/loginMetamask';
export default defineComponent({
  name: 'UserNTF',
  components: { CatList, AddressView },
  setup(props, ctx) {
    let address = ctx.root.$route.query.address;
    let data = ref({});
    let cat = ref([]);
    let create_cat = ref(0);
    let mine = ref(false);
    let contactsLoading = ref(false);
    onMounted(async () => {
      // 获取地址下的所有ntf
      contactsLoading.value = true;
      const create = await canCreateCell();
      console.log(create);
      if (create) create_cat.value = 1;
      data = await getUsetList(address);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      cat.value = data.list || [];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // create_cat.value = data.create_cat || 0;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      mine.value = data.mine || false;
      contactsLoading.value = false;
    });
    return {
      address,
      cat,
      mine,
      create_cat,
      contactsLoading,
      data
    };
  },
  methods: {
    add() {
      void this.$router.push({
        path: '/account',
        query: {
          cat: {
            name: '?',
            hash: '',
            fishes: '?',
            address: '',
            mine: true
          },
          mine: true
        }
      });
    }
  }
});
</script>
