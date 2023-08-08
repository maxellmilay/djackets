<template>
  <div class="flex w-full">
    <div class="flex justify-between p-5 w-full bg-[#242424] text-white">
      <div class="flex items-center">
        <RouterLink class="text-semibold" to="/">DJackets</RouterLink>
        <!-- <form method="get" action="/search" class="ml-5">
          <input
            type="text"
            placeholder="What are you looking for?"
            name="query"
            class="bg-white px-4 py-2 rounded-tl-md rounded-bl-md text-black"
          />
          <button class="bg-green-500 py-2 px-3 rounded-tr-md rounded-br-md">Search</button>
        </form> -->
      </div>
      <div class="flex">
        <div class="flex items-center">
          <RouterLink class="mr-3" to="/summer">Summer</RouterLink>
          <RouterLink class="mr-5" to="/winter">Winter</RouterLink>
        </div>
        <div class="flex">
          <div class="flex">
            <RouterLink
              v-if="store.state.isAuthenticated"
              class="text-black bg-white px-4 py-2 mr-3 rounded"
              to="/my-account"
              >My Account</RouterLink
            >
            <RouterLink
              v-if="!store.state.isAuthenticated"
              class="text-black bg-white px-4 py-2 mr-3 rounded"
              to="/sign-up"
              >Sign-up</RouterLink
            >
            <RouterLink
              v-if="!store.state.isAuthenticated"
              class="text-black bg-white px-4 py-2 mr-3 rounded"
              to="/log-in"
              >Log in</RouterLink
            >
            <RouterLink class="text-white bg-green-500 px-5 py-2 rounded" to="/cart">
              <span class="mr-1"><i class="fas fa-shopping-cart"></i></span>
              <span>Cart ({{ cartTotalLength }})</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section id="main">
    <RouterView />
  </section>
  <footer class="flex justify-center py-10" id="footer">
    <p class="text-cente">Copyright © 2023</p>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
//@ts-ignore:next-line
import { useStore } from 'vuex';
import ItemInterface from './interface/ItemInterface';
import axios from 'axios';

//beforeCreate
const store = useStore();
store.commit('initializeStore');
const token = store.state.token;
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Token ' + token;
} else {
  axios.defaults.headers.common['Authorization'] = '';
}

const cart = ref({ items: [] as ItemInterface[] });

const cartTotalLength = computed(() => {
  let totalLength = 0;
  for (let i = 0; i < cart.value.items.length; i++) {
    totalLength += cart.value.items[i].quantity;
  }
  return totalLength;
});

onMounted(() => {
  cart.value = store.state.cart;
});
</script>

