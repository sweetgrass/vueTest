<template>
    <div>
        <button @click='logout'>退出</button>
        <div class='testREM'>
            测试文字
        </div>
    </div>
</template>
<script setup>
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'
let store = useStore();
let router = useRouter();
let logout = ()=>{
    store.commit('logout');
    router.push('/login');
}
</script>
<style scoped>
.testREM{
    width:100%;
    height:60px;
    line-height: 60px;
    font-size: 18px;
    background: #ddd;
}
</style>