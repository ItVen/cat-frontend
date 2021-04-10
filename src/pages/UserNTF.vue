<template>
  <q-page class="fit row wrap justify-around  items-start content-start">
    <q-card class="col-8 my-card" style="margin: 30px;">
      <address-view
        :account="email"
        :address="address"
        style="margin-top: 10px;"
      ></address-view>
    </q-card>
    <q-card class="col-8 my-card" style="margin: 30px;">
      <cat-list
        class="col-8 self-center"
        :list="cat"
        title="10 Sourly Cat"
        :mine="mine"
      ></cat-list>
    </q-card>
  </q-page>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api';
import AddressView from 'src/components/AddressView.vue';
import CatList from 'src/components/CatList.vue';
import { isLogin } from '../composition/getLoginStatus';
import { showAddress } from '../composition/utils'; //
export default defineComponent({
  name: 'Home',
  components: { CatList, AddressView },
  setup(props, ctx) {
    let address = ctx.root.$route.query.address;
    const email = ctx.root.$route.query.email;
    const mine = ctx.root.$route.query.mine;
    console.log(ctx.root.$route.query);
    // todo 根据地址查询对应的ntf卡片
    const login = isLogin();
    const cat = [
      {
        name: 'zzzsasa',
        fishes: 56,
        address: '0xb4ff637130aaabe80b10b7b44ff4c7e302e9cb97',
        email: 'testemail@gamil.com',
        win: 10,
        mur: 10,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      },
      {
        name: 'zzzsasa',
        fishes: 56,
        address: '0xb4ff637130aaabe80b10b7b44ff4c7e302e9cb97',
        email: 'testemail@gamil.com',
        win: 10,
        mur: 10,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      },
      {
        name: 'zzzsasa',
        fishes: 56,
        address: '0xb4ff637130aaabe80b10b7b44ff4c7e302e9cb97',
        email: 'testemail@gamil.com',
        win: 10,
        mur: 10,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      },
      {
        name: 'zzzsasa',
        fishes: 56,
        address: '0xb4ff637130aaabe80b10b7b44ff4c7e302e9cb97',
        email: 'testemail@gamil.com',
        win: 10,
        mur: 10,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      },
      {
        name: 'zzzsasa',
        fishes: 56,
        address: '0xb4ff637130aaabe80b10b7b44ff4c7e302e9cb97',
        email: 'testemail@gamil.com',
        win: 10,
        mur: 10,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      },
      {
        name: 'zzzsasa',
        fishes: 56,
        address: '0xb4ff637130aaabe80b10b7b44ff4c7e302e9cb97',
        email: 'testemail@gamil.com',
        win: 10,
        mur: 10,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      },
      {
        name: 'zzzsasa',
        fishes: 56,
        address: '0xb4ff637130aaabe80b10b7b44ff4c7e302e9cb97',
        email: 'testemail@gamil.com',
        win: 10,
        mur: 10,
        hash:
          '0xf51d1c446f3a060b9dc3abba47489901f3a0069698cc3044b594f91d182e5601'
      }
    ];
    if (address) address = showAddress(address, 1);
    return {
      filter: ref(''),
      login,
      search: ref(''),
      cat,
      mine,
      address,
      email
    };
  },
  methods: {
    onSearch() {
      console.log(this.search);
      // todo 搜索
    }
  }
});
</script>
