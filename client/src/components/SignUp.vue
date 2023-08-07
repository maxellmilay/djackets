<template>
  <div class="flex flex-col items-center my-10">
    <h1 class="text-2xl font-semibold mb-10">Sign Up</h1>
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
      <div class="flex flex-col">
        <label for="password2" class="mb-2">Repeat Password</label>
        <input
          type="password"
          id="password2"
          v-model="password2"
          class="bg-white rounded border border-gray px-4 py-2 text-xs"
        />
      </div>
      <div class="flex flex-col items-center" v-if="errors.length">
        <p v-for="error in errors" :key="error" class="bg-red-400 px-5 py-2 rounded text-xs mt-3">
          {{ error }}
        </p>
      </div>
      <div class="flex justify-center mx-10 mt-10">
        <button class="bg-black text-white px-4 py-2 rounded">Sign Up</button>
        <p class="flex items-center mx-3">or</p>
        <RouterLink to="/log-in" class="px-4 py-2 rounded border border-black hover:bg-gray-300"
          >Log In</RouterLink
        >
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const router = useRouter();
const toast = useToast();

const username = ref('');
const password = ref('');
const password2 = ref('');
const errors = ref([] as string[]);

const submitForm = () => {
  errors.value = [] as string[];

  if (username.value === '') {
    errors.value.push('The username is missing!');
  }
  if (password.value === '') {
    errors.value.push('The password is too short!');
  }
  if (password.value !== password2.value) {
    errors.value.push("The passwords don't match!");
  }

  if (!errors.value.length) {
    const formData = {
      username: username.value,
      password: password.value,
    };

    axios
      .post('/api/v1/users/', formData)
      .then(() => {
        toast.open({
          message: 'Account successfully created!',
          type: 'success',
        });
        router.push('/log-in');
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
          console.log(JSON.stringify(error.response.data));
        } else if (error.message) {
          errors.value.push('Something went wrong. Please try again');
          console.log(JSON.stringify(error));
        }
      });
  }
};
</script>
