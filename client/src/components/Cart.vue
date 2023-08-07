<template>
  <div class="flex flex-col items-center my-10">
    <h1 class="text-4xl font-semibold mb-10">Cart</h1>
    <table v-if="cartTotalLength" class="divide-y divide-gray-200 border">
      <thead>
        <tr>
          <th class="min-w-[10rem] text-left py-5 px-5">Product</th>
          <th class="min-w-[10rem] text-left py-5 px-5">Price</th>
          <th class="min-w-[10rem] text-left py-5 px-5">Quantity</th>
          <th class="min-w-[10rem] text-left py-5 px-5">Total</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <CartItem
          v-for="item in cart.items"
          :key="item.product.id"
          :initialItem="item"
          v-on:removeFromCart="removeFromCart"
        />
      </tbody>
    </table>
    <p v-else>You don't have any products in your cart</p>
    <div class="flex flex-col items-center" v-if="cartTotalLength">
      <h2 class="my-5 font-semibold">Summary</h2>
      <p>
        <strong class="text-2xl">${{ cartTotalPrice.toFixed(2) }}</strong> for
        <strong>{{ cartTotalLength }}</strong> Items
      </p>
      <RouterLink to="/cart/checkout" class="mt-5 rounded px-4 py-2 border text-white bg-black"
        >Proceed to Checkout</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import CartItem from './CartItem.vue';
import ItemInterface from '../interface/ItemInterface';
//@ts-ignore:next-line
import { useStore } from 'vuex';

const store = useStore();

const cart = ref({ items: [] as ItemInterface[] });

const cartTotalLength = computed(() => {
  return cart.value.items.reduce((acc, curVal) => {
    return (acc += curVal.quantity);
  }, 0);
});

const cartTotalPrice = computed(() => {
  return cart.value.items.reduce((acc, curVal) => {
    return (acc += curVal.product.price * curVal.quantity);
  }, 0);
});

const removeFromCart = (item: ItemInterface) => {
  cart.value.items = cart.value.items.filter((i) => i.product.id !== item.product.id);
};

onMounted(() => {
  cart.value = store.state.cart;
});
</script>
