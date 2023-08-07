<template>
  <div class="flex flex-col items-center my-10">
    <h1 class="font-semibold text-4xl mb-10">My Account</h1>
    <div class="flex flex-col items-center">
      <h2 class="text-2xl font-semibold mb-10">My Orders</h2>
      <OrderSummary v-for="order in orders" :key="OrderSummary.id" :order="order" />
    </div>
    <button @click="logout()" class="px-4 py-2 rounded bg-red-400 text-white">Log Out</button>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosError, AxiosResponse } from 'axios';
//@ts-ignore:next-line
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import OrderSummary from './OrderSummary.vue';
import { onMounted, ref } from 'vue';
import OrderInterface from '../interface/OrderInterface';

const store = useStore();
const router = useRouter();

const orders = ref([] as OrderInterface[]);

const getMyOrders = async () => {
  await axios
    .get('/api/v1/orders/')
    .then((response: AxiosResponse) => {
      orders.value = response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};

const logout = () => {
  axios.defaults.headers.common['Authorization'] = '';
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('userid');

  store.commit('removeToken');
  router.push('/');
};

onMounted(() => {
  getMyOrders();
});
</script>
