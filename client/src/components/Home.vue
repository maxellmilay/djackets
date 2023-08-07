<template>
  <div class="flex flex-col items-center my-10" v-if="isLoading === false">
    <div class="flex flex-col items-center">
      <p class="mb-10 text-3xl font-bold">Latest Products</p>
      <div class="flex">
        <ProductBox v-for="product in latestProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
  <Loading v-else />
</template>

<script setup lang="ts">
import axios, { AxiosResponse, AxiosError } from 'axios';
import { onMounted, ref, Ref, watch } from 'vue';
import ProductInterface from '../interface/ProductInterface';
//@ts-ignore:next-line
import { useStore } from 'vuex';
import ProductBox from './ProductBox.vue';
import Loading from './Loading.vue';

const store = useStore();

const latestProducts: Ref<ProductInterface[]> = ref([]);

const isLoading = ref(true);

watch(latestProducts, (_new, _old) => {
  if (_old.length === 0) {
    isLoading.value = true;
  }
  if (_new.length > 0) {
    isLoading.value = false;
  }
});

const getLatestProducts = async () => {
  await axios
    .get('/api/v1/latest-products/')
    .then((response: AxiosResponse) => {
      latestProducts.value = response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};

onMounted(() => {
  getLatestProducts();
});
</script>

