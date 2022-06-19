import { createApp,reactive } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
// import 'amfe-flexible/index.js' 

let myapp = createApp(App);
myapp.use(router);
myapp.use(store);
myapp.use(ElementPlus);
myapp.mount('#app');