<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    v-if='store.state.isLogined'
  >
    <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
    <el-sub-menu index="2">
      <template v-slot:title><router-link to="/1">第1页</router-link></template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3"><router-link to="/2">第2页</router-link></el-menu-item>
    <el-menu-item index="4"><router-link to="/3">第3页</router-link></el-menu-item>
    <el-menu-item index="5"><router-link to="/4">第4页</router-link></el-menu-item>
    <el-menu-item index="6"><router-link to="/5">第5页</router-link></el-menu-item>
  </el-menu>
  <div class='contentC'>
    <router-view ></router-view>
  </div>
  
</template>
<script setup>
import { ref } from 'vue'
import {useStore} from 'vuex';
let store = useStore();
const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key, keyPath) => {
  
}
</script>
<style scoped>
.a,
a:hover,
a:active,
a:visited,
a:link,
a:focus {
  text-decoration: none;
}
.contentC{
   height: 100%;
}
.flex-grow{
    flex-grow: 1;
}
</style>