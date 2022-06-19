import { createApp,reactive } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
// import 'amfe-flexible/index.js' 

let myapp = createApp(App);
myapp.use(router);
myapp.use(store);
myapp.use(createPinia());
myapp.use(ElementPlus);
myapp.mount('#app');