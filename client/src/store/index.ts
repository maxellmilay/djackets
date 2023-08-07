//@ts-ignore:next-line
import { createStore } from 'vuex';
import ItemInterface from '../interface/ItemInterface';
import StateInterface from '../interface/StateInterface';

export default createStore({
  state: {
    cart: {
      items: [] as ItemInterface[],
    },
    isAuthenticated: false,
    token: '',
  },
  mutations: {
    initializeStore(state: StateInterface) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart') as string);
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }

      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token') as string;
        state.isAuthenticated = true;
      } else {
        state.token = '';
        state.isAuthenticated = false;
      }
    },
    addToCart(state: StateInterface, item: ItemInterface) {
      const exists: ItemInterface[] = state.cart.items.filter(
        (i: ItemInterface) => i.product.id === item.product.id
      );

      if (exists.length) {
        exists[0].quantity = exists[0].quantity + item.quantity;
      } else {
        state.cart.items.push(item);
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setToken(state: StateInterface, token: string) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state: StateInterface) {
      state.token = '';
      state.isAuthenticated = false;
    },
    clearCart(state: StateInterface) {
      state.cart = { items: [] };
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
  actions: {},
  modules: {},
});
