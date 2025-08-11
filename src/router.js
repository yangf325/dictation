import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home.vue';
import RecitePage from './components/RecitePage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/m', component: RecitePage }
];

const router = new VueRouter({ routes });

export default router;