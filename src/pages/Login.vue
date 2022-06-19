<template>
    <button @click='login'>登录</button>
    <div>{{logText}}</div>
    <div>{{name}}</div>
    <input type="text" @blur="setname" v-model='newname'>
</template>
<script>
import store from '../store/index.js'
import {mapState,mapMutations} from 'vuex'
import router from '../router/index.js'
export default {
    data:()=>{
        return {
            logText:store.state.isLogined?'':'请登录',
            newname:''
        }
    },
    computed:{
        ...mapState({
            name:(state)=>state.m1.name
        })
    },
    mounted:()=>{
        
    },
    methods:{
        login:()=>{
            store.commit('login');
            router.push('/home');
        },
        // ...mapMutations('m1',['setname'])
        setname(){
            store.commit('m1/setname',this.newname)
        }
        
    }
}
</script>
<style scoped>
div{
    width:100%;
    height:60px;
    line-height: 60px;
}
</style>
