import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import store from '../store/index.js';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue'
import Page1 from '../pages/Page1.vue';
import Page2 from '../pages/Page2.vue';
import Page3 from '../pages/Page3.vue';
import Page4 from '../pages/Page4.vue';
import Page5 from '../pages/Page5.vue';

const routerHistory = createWebHistory()
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path:'/home',
      alias:['/'],
      name:'HomePage',
      component:Home
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/1',
      component:Page1
    },
    {
      path:'/2',
      component:Page2
    },
    {
      path:'/3',
      component:Page3
    },
    {
      path:'/4',
      component:Page4
    },
    {
      path:'/5',
      component:Page5
    }
  ]
})
router.beforeEach(async (to, from) => {
  let noneedLoginPage = ['login','reg']
  // // 检查用户是否已登录 // ❗️ 避免无限重定向
  if (!store.state.isLogined&&!noneedLoginPage.includes(to.name)) {
    // 将用户重定向到登录页面
    return { name: 'login' }
  }
  // if(store.state.isLogined&&to.name=='login'){
  //   return { name: 'home' }
  // }
})
export default router