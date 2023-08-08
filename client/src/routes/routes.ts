import Home from '../components/Home.vue';
import Product from '../components/Product.vue';
import Category from '../components/Category.vue';
import Search from '../components/Search.vue';
import Cart from '../components/Cart.vue';
import SignUp from '../components/SignUp.vue';
import LogIn from '../components/LogIn.vue';
import MyAccount from '../components/MyAccount.vue';
import Checkout from '../components/Checkout.vue';
import Success from '../components/Success.vue';

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: 'Home  |  DJackets ' } },
  { path: '/search', name: 'Search', component: Search },
  { path: '/sign-up', name: 'SignUp', component: SignUp, meta: { title: 'Sign Up  |  DJackets' } },
  { path: '/log-in', name: 'LogIn', component: LogIn, meta: { title: 'Log In  | DJackets' } },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: { title: 'Account  |  DJackets', requireLogin: true },
  },
  { path: '/cart', name: 'Cart', component: Cart, meta: { title: 'Cart  |  DJackets' } },
  {
    path: '/cart/success',
    name: 'Success',
    component: Success,
    meta: { title: 'Success  |  DJackets' },
  },
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { title: 'Checkout  | DJackets', requireLogin: true },
  },
  {
    path: '/:category_slug/:product_slug',
    name: 'Product',
    component: Product,
    meta: { title: 'Product' },
  },
  {
    path: '/:category_slug',
    name: 'Category',
    component: Category,
    meta: { title: 'Category  |  DJackets' },
  },
];

export default routes;
