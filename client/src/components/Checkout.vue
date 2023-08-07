<template>
  <div class="flex flex-col items-center my-10">
    <h1 class="text-4xl font-semibold mb-10">Checkout</h1>
    <table class="divide-y divide-gray-200 border mb-10">
      <thead>
        <tr>
          <th class="min-w-[10rem] text-left py-5 px-5">Product</th>
          <th class="min-w-[10rem] text-center py-5 px-5">Price</th>
          <th class="min-w-[10rem] text-center py-5 px-5">Quantity</th>
          <th class="min-w-[10rem] text-center py-5 px-5">Total</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="item in cart.items" :key="item.product.id">
          <td class="min-w-[10rem] text-left py-5 px-5">{{ item.product.name }}</td>
          <td class="min-w-[10rem] text-center py-5 px-5">$ {{ item.product.price }}</td>
          <td class="min-w-[10rem] text-center py-5 px-5">{{ item.quantity }}</td>
          <td class="min-w-[10rem] text-center py-5 px-5">$ {{ getItemTotal(item).toFixed(2) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="min-w-[20rem] text-center py-5 px-5 font-bold" colspan="2">Total</td>
          <td class="min-w-[10rem] text-center py-5 px-5">{{ cartTotalLength }}</td>
          <td class="min-w-[10rem] text-center py-5 px-5 font-semibold">
            $ {{ cartTotalPrice.toFixed(2) }}
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="w-[50%]">
      <h2 class="text-2xl font-semibold">Shipping Details</h2>
      <p class="mb-6 text-gray-500">* All fields are required</p>
      <div class="flex flex-wrap justify-between">
        <div class="flex flex-col mr-[10%] w-[40%]">
          <label class="mb-2" for="first_name">First name*</label>
          <input
            class="bg-white text-black border border-gray-400 rounded px-4 py-2 mb-4"
            type="text"
            id="first_name"
            v-model="first_name"
          />
        </div>
        <div class="flex flex-col mr-[10%] w-[40%]">
          <label class="mb-2" for="address">Address*</label>
          <input
            class="bg-white text-black border border-gray-400 rounded px-4 py-2 mb-4"
            type="text"
            id="address"
            v-model="address"
          />
        </div>
        <div class="flex flex-col mr-[10%] w-[40%]">
          <label class="mb-2" for="last_name">Last name*</label>
          <input
            class="bg-white text-black border border-gray-400 rounded px-4 py-2 mb-4"
            type="text"
            id="last_name"
            v-model="last_name"
          />
        </div>
        <div class="flex flex-col mr-[10%] w-[40%]">
          <label class="mb-2" for="zipcode">Zip code*</label>
          <input
            class="bg-white text-black border border-gray-400 rounded px-4 py-2 mb-4"
            type="text"
            id="zipcode"
            v-model="zipcode"
          />
        </div>
        <div class="flex flex-col mr-[10%] w-[40%]">
          <label class="mb-2" for="email">E-mail*</label>
          <input
            class="bg-white text-black border border-gray-400 rounded px-4 py-2 mb-4"
            type="text"
            id="email"
            v-model="email"
          />
        </div>
        <div class="flex flex-col mr-[10%] w-[40%]">
          <label class="mb-2" for="place">Place*</label>
          <input
            class="bg-white text-black border border-gray-400 rounded px-4 py-2 mb-4"
            type="text"
            id="place"
            v-model="place"
          />
        </div>
        <div class="flex flex-col mr-[10%] w-[40%]">
          <label class="mb-2" for="phone">Phone*</label>
          <input
            class="bg-white text-black border border-gray-400 rounded px-4 py-2 mb-4"
            type="text"
            id="phone"
            v-model="phone"
          />
        </div>
      </div>
      <div v-if="errors.length">
        <p v-for="error in errors" :key="error" class="bg-red-400 px-5 py-2 rounded text-xs mt-3">
          {{ error }}
        </p>
      </div>
      <div id="card-element" class="my-10"></div>
      <template v-if="cartTotalLength">
        <button class="bg-black text-white px-4 py-2 rounded mt-4" @click="submitForm">
          Pay with Stripe
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosError } from 'axios';
import { ref, computed, onMounted } from 'vue';
import ItemInterface from '../interface/ItemInterface';
//@ts-ignore:next-line
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const cart = ref({ items: [] as ItemInterface[] });
const stripe = ref({} as any);
const card = ref({} as any);
const first_name = ref('');
const last_name = ref('');
const email = ref('');
const phone = ref('');
const address = ref('');
const zipcode = ref('');
const place = ref('');
const errors = ref([] as string[]);

const getItemTotal = (item: ItemInterface) => {
  return item.quantity * item.product.price;
};

const cartTotalLength = computed(() => {
  return cart.value.items.reduce((acc, curVal) => {
    return (acc += curVal.quantity);
  }, 0);
});

if (!cartTotalLength) {
  router.push('/');
}

const cartTotalPrice = computed(() => {
  return cart.value.items.reduce((acc, curVal) => {
    return (acc += curVal.product.price * curVal.quantity);
  }, 0);
});

const stripeTokenHandler = async (token: any) => {
  const items = [];

  for (let i = 0; i < cart.value.items.length; i++) {
    const item = cart.value.items[i];
    const obj = {
      product: item.product.id,
      quantity: item.quantity,
      price: (item.product.price * item.quantity).toFixed(2),
    };
    items.push(obj);
  }

  const data = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    address: address.value,
    zipcode: zipcode.value,
    place: place.value,
    phone: phone.value,
    items: items,
    stripe_token: token.id,
  };

  await axios
    .post('/api/v1/checkout/', data)
    .then(() => {
      store.commit('clearCart');
      router.push('/cart/success');
    })
    .catch((error: AxiosError) => {
      errors.value.push('Something went wrong. Please try again');
      console.log(error);
    });
};

const submitForm = () => {
  errors.value = [] as string[];
  if (first_name.value === '') {
    errors.value.push('The first name field is missing!');
  }
  if (last_name.value === '') {
    errors.value.push('The last name field is missing!');
  }
  if (email.value === '') {
    errors.value.push('The email field is missing!');
  }
  if (phone.value === '') {
    errors.value.push('The phone field is missing!');
  }
  if (address.value === '') {
    errors.value.push('The address field is missing!');
  }
  if (zipcode.value === '') {
    errors.value.push('The zipcode field is missing!');
  }
  if (place.value === '') {
    errors.value.push('The place field is missing!');
  }
  if (!errors.value.length) {
    stripe.value.createToken(card.value).then((result: any) => {
      if (result.error) {
        errors.value.push('Something went wrong. Please try again');
        console.log(result.error.message);
      } else {
        stripeTokenHandler(result.token);
      }
    });
  }
};

onMounted(() => {
  cart.value = store.state.cart;

  if (cartTotalLength.value) {
    //@ts-ignore:next-line
    stripe.value = Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const elements = stripe.value.elements();
    card.value = elements.create('card', { hidePostalCode: true });
    card.value.mount('#card-element');
  }
});
</script>
