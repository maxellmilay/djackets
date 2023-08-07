<template>
  <tr v-if="item !== undefined">
    <td class="py-5 px-5">
      <RouterLink
        :to="item.product.get_absolute_url"
        class="bg-green-200 font-semibold px-3 py-2 rounded"
        >{{ item.product.name }}</RouterLink
      >
    </td>
    <td class="py-5 px-5">$ {{ item.product.price }}</td>
    <td class="flex py-5 px-5 justify-between">
      {{ item.quantity }}
      <div class="flex">
        <p @click="decrementQuantity(item)" class="font-bold text-green-500 mr-3 hover:cursor-pointer">-</p>
        <p @click="incrementQuantity(item)" class="font-bold text-red-400 hover:cursor-pointer">+</p>
      </div>
    </td>
    <td class="py-5 px-5">$ {{ getItemTotal(item).toFixed(2) }}</td>
    <td class="w-[10rem] py-5 px-5 flex justify-center">
      <button
        @click="removeFromCart(item)"
        class="text-red-400 px-3 py-2 rounded border border-red-400 hover:bg-red-100"
      >
        Delete
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import ItemInterface from '../interface/ItemInterface';
import { ref } from 'vue';
import store from '../store';

const props = defineProps({ initialItem: Object as () => ItemInterface });

const emit = defineEmits(['removeFromCart']);

const item = ref(props.initialItem);

const getItemTotal = (item: ItemInterface) => {
  return item.quantity * item.product.price;
};

const incrementQuantity = (item: ItemInterface) => {
  item.quantity += 1;
};

const decrementQuantity = (item: ItemInterface) => {
  item.quantity -= 1;

  if (item.quantity === 0) {
    emit('removeFromCart', item);
  }
};

const removeFromCart = (item: ItemInterface) => {
  emit('removeFromCart', item);
};

const updateCart = () => {
  localStorage.setItem('cart', JSON.stringify(store.state.cart));
};
</script>
