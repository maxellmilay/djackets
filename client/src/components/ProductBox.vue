<template>
  <div
    class="flex flex-col items-center mx-3 p-7 rounded product-shadow"
    :key="product.id"
    v-if="product !== undefined"
  >
    <div class="h-52 w-40 relative inline-block overflow-hidden mb-3">
      <img
        :src="product.get_thumbnail"
        alt="thumbnail"
        class="absolute top-[50%] left-[50%] min-h-full min-w-full translate-x-[-50%] translate-y-[-50%]"
      />
    </div>
    <h3 class="font-semibold mb-1">{{ product.name }}</h3>
    <p>$ {{ product.price }}</p>

    <RouterLink
      class="bg-[#242424] text-white px-4 py-2 rounded mt-4"
      :to="product.get_absolute_url"
      >View Details</RouterLink
    >
  </div>
</template>

<script setup lang="ts">
import ProductInterface from '../interface/ProductInterface';

const props = defineProps({ product: Object as () => ProductInterface });
</script>

<style>
.product-shadow:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.product-shadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
