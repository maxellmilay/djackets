import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes/routes';
import axios from 'axios';
import store from './store';
import ToastPlugin from 'vue-toast-notification';

axios.defaults.baseURL = 'https://milaymaxell.pythonanywhere.com';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const title = to.meta.title as string;
  if (title) {
    document.title = title;
  }

  if (to.matched.some((record) => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    next();
  }
});

app.use(store);

app.use(router);

app.use(ToastPlugin);

app.mount('#app');

