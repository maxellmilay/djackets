<template>
  <div class="flex flex-col items-center mb-5" v-if="order !== undefined">
    <h3 class="text-xl font-bold mb-2">Order #{{ order.id }}</h3>
    <table class="divide-y divide-gray-200 border">
      <thead class="font-semibold">
        <tr>
          <td class="min-w-[10rem] text-left py-5 px-5">Product</td>
          <td class="min-w-[10rem] text-left py-5 px-5">Price</td>
          <td class="min-w-[10rem] text-left py-5 px-5">Quantity</td>
          <td class="min-w-[10rem] text-left py-5 px-5">Total</td>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="item in order.items" :key="item.product.id">
          <td class="min-w-[10rem] text-left py-5 px-5">{{ item.product.name }}</td>
          <td class="min-w-[10rem] text-left py-5 px-5">$ {{ item.product.price }}</td>
          <td class="min-w-[10rem] text-left py-5 px-5">{{ item.quantity }}</td>
          <td class="min-w-[10rem] text-left py-5 px-5">$ {{ getItemTotal(item).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import OrderInterface from '../interface/OrderInterface';
import ItemInterface from '../interface/ItemInterface';

const props = defineProps({ order: Object as () => OrderInterface });

const getItemTotal = (item: ItemInterface) => {
  return item.quantity * item.product.price;
};

const orderTotalLength = (order: OrderInterface) => {
  return order.items.reduce((acc, curVal) => {
    return (acc += curVal.quantity);
  }, 0);
};
</script>
