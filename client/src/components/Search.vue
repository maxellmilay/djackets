<template>
  <div class="flex flex-col items-center my-5">
    <h1 class="mb-8 mt-3 text-4xl font-bold">Search term: {{ query }}</h1>
    <div class="flex">
      <ProductBox v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosError, AxiosResponse } from 'axios';
import ProductBox from './ProductBox.vue';
import ProductInterface from '../interface/ProductInterface';
import { onMounted, ref } from 'vue';

const products = ref([] as ProductInterface[]);
const query = ref('');

const performSearch = async () => {
  await axios
    .post('/api/v1/products/search/', { query: query.value })
    .then((response: AxiosResponse) => {
      products.value = response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};

onMounted(() => {
  document.title = 'Search | DJackets';

  let uri = window.location.search.substring(1);
  let params = new URLSearchParams(uri);

  if (params.get('query')) {
    query.value = params.get('query') as string;
    performSearch();
  }
});
</script>
