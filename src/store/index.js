import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import m1 from './m1.js'

const store = createStore({
  state: {
    isLogined:true
  },
  getters: {
  },
  mutations: {
    logout(state){
      state.isLogined = false;
    },
    login(state){
      state.isLogined = true;
    }
  },
  actions: {
  },
  modules:{
    m1
  },
  plugins:[
    createPersistedState()
  ]
})
 
export default store