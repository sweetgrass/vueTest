<template>
  <div>测试Pinia的使用</div>
  <el-table :data="list" row-key="id">
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="price" label="价格" />
  </el-table>
  <div>
    <button @click="addItem">add</button>
    <button @click="removeItem">remove</button>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { listStore } from "../pinia/list.js";
let lsstore = listStore();
let { list } = storeToRefs(lsstore);
let addItem = () => {
  lsstore.addItem({
    name: "test",
    type: "test",
    price: Math.floor(20 * Math.random()),
    id: "00" + Math.floor(20 * Math.random()),
  });
};
let removeItem = () => {
  lsstore.$patch((state) => {
    state.list.pop();
  });
};
console.log(list);
</script>
<style scoped>
</style>