<template>
  <div class="flex flex-col items-center" v-if="isLoading === false">
    <div class="flex flex-col items-center">
      <img :src="product.get_image" alt="image" class="h-72 w-auto my-7" />
      <h1>
        <strong>{{ product.name }}</strong>
      </h1>
      <p>{{ product.description }}</p>
    </div>
    <div class="flex flex-col items-center">
      <p class="mt-3"><strong>Price: </strong> $ {{ product.price }}</p>
      <div class="flex mt-4 items-center">
        <input
          class="bg-white text-black border-black border rounded px-3 py-2 mr-4"
          type="number"
          min="1"
          v-model="quantity"
        />
        <p
          class="bg-[#242424] text-white px-4 py-2 rounded hover:cursor-pointer"
          @click="addToCart"
        >
          Add To Cart
        </p>
      </div>
    </div>
  </div>
  <Loading v-else />
</template>

<script setup lang="ts">
import axios, { AxiosResponse, AxiosError } from 'axios';
import { onMounted, ref, watch } from 'vue';
import ProductInterface from '../interface/ProductInterface';
import { useRoute } from 'vue-router';
//@ts-ignore:next-line
import { useStore } from 'vuex';
import Loading from './Loading.vue';

const route = useRoute();
const store = useStore();

const isLoading = ref(true);

const quantity = ref(1);
const product = ref<ProductInterface>({
  id: 0,
  name: '',
  get_absolute_url: '',
  description: '',
  price: 0,
  get_image: '',
  get_thumbnail: '',
});

watch(product, (_new, _old) => {
  if (_old.name === '') {
    isLoading.value = true;
  }
  if (_new.name !== '') {
    isLoading.value = false;
  }
});

const getProduct = async () => {
  const category_slug = route.params.category_slug;
  const product_slug = route.params.product_slug;

  await axios
    .get(`/api/v1/products/${category_slug}/${product_slug}/`)
    .then((response: AxiosResponse) => {
      product.value = response.data;
      document.title = product.value.name + '  |  DJackets';
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};

onMounted(() => {
  getProduct();
});

const addToCart = () => {
  if (isNaN(quantity.value) || quantity.value < 1) {
    quantity.value = 1;
  }

  const item = {
    product: product.value,
    quantity: quantity.value,
  };

  store.commit('addToCart', item);
};
</script>
