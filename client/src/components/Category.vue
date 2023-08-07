<template>
  <div class="flex flex-col items-center my-5" v-if="isLoading === false">
    <h1 class="mb-8 mt-3 text-4xl font-bold">{{ category.name }}</h1>
    <div class="flex">
      <ProductBox v-for="product in category.products" :key="product.id" :product="product" />
    </div>
  </div>
  <Loading v-else />
</template>

<script setup lang="ts">
import axios, { AxiosError, AxiosResponse } from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ProductInterface from '../interface/ProductInterface';
import CategoryInterface from '../interface/CategoryInterface';
import ProductBox from './ProductBox.vue';
import Loading from './Loading.vue';

const route = useRoute();

const category = ref<CategoryInterface>({
  id: 0,
  name: '',
  get_absolute_url: '',
  products: [] as ProductInterface[],
});

const isLoading = ref(true);

watch(category, (_new, _old) => {
  if (_old.name === '') {
    isLoading.value = true;
  }
  if (_new.name !== '') {
    isLoading.value = false;
  }
});

watch(route, (_new, _old) => {
  if (_new.name === 'Category') {
    getCategory();
  }
});

const getCategory = async () => {
  const categorySlug = route.params.category_slug;

  await axios
    .get(`/api/v1/products/${categorySlug}`)
    .then((response: AxiosResponse) => {
      category.value = response.data;
      document.title = category.value.name + ' | DJackets';
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};

onMounted(() => {
  getCategory();
});
</script>
