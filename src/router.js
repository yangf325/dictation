import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home.vue';
import RecitePage from './components/RecitePage.vue';
import PasswordPrompt from './components/PasswordPrompt.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/m', component: RecitePage },
  { path: '/password', component: PasswordPrompt }
];

const router = new VueRouter({ routes });

// 判断是否为部署模式
const isProduction = process.env.NODE_ENV === 'production';

// 路由守卫
router.beforeEach((to, from, next) => {
  // 部署模式下才需要密码验证
  if (isProduction) {
    const isVerified = localStorage.getItem('passwordVerified') === 'true';
    
    // 如果未验证且不是去密码页面，则重定向到密码页面
    if (!isVerified && to.path !== '/password') {
      next('/password');
    } else {
      next();
    }
  } else {
    // 开发模式不需要验证
    next();
  }
});

export default router;