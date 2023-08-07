<template>
  <div class="flex flex-col items-center my-10">
    <h1 class="text-2xl font-semibold mb-10">Log In</h1>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col mb-3">
        <label for="username" class="mb-2">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="bg-white rounded border border-gray px-4 py-2 text-xs"
        />
      </div>
      <div class="flex flex-col mb-3">
        <label for="password" class="mb-2">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="bg-white rounded border border-gray px-4 py-2 text-xs"
        />
      </div>
      <div class="flex flex-col items-center" v-if="errors.length">
        <p v-for="error in errors" :key="error" class="bg-red-400 px-5 py-2 rounded text-xs mt-3">
          {{ error }}
        </p>
      </div>
      <div class="flex justify-center mx-10 mt-10">
        <button class="bg-black text-white px-4 py-2 rounded">Log In</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ref } from 'vue';
//@ts-ignore:next-line
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const username = ref('');
const password = ref('');
const errors = ref([] as string[]);

const submitForm = async () => {
  axios.defaults.headers.common['Authorization'] = '';
  localStorage.removeItem('token');

  const formData = {
    username: username.value,
    password: password.value,
  };

  await axios
    .post('/api/v1/token/login/', formData)
    .then((response: AxiosResponse) => {
      const token = response.data.auth_token;
      store.commit('setToken', token);
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
      localStorage.setItem('token', token);

      const toPath = (route.query.to as string) || '/cart';
      router.push(toPath);
    })
    .catch((error: AxiosError<string[]>) => {
      if (error.response) {
        for (const property in error.response.data) {
          errors.value.push(
            `${property.charAt(0).toUpperCase() + property.slice(1)}: ${
              error.response.data[property]
            }`
          );
        }
      } else {
        errors.value.push('Something went wrong. Please try again');
        console.log(JSON.stringify(error));
      }
    });
};
</script>
