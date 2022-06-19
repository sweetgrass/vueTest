import { createStore } from 'vuex'

const m1 = {
    namespaced: true,
    state: {
        name: 'module1'
    },
    getters: {
    },
    mutations: {
        setname(state, newname) {
            state.name = newname;
        }
    },
    actions: {
    }
}

export default m1