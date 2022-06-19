<template>
<el-tabs :tab-position="tabPosition" style="height:100%;width:200px;" class="demo-tabs">
    <el-tab-pane label="User">uuuuuu</el-tab-pane>
    <el-tab-pane label="Config">Config</el-tab-pane>
    <el-tab-pane label="Role">Role</el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
  </el-tabs>
</template>
<script setup>
import {ref} from 'vue'
const tabPosition = ref('left');
</script>
<style scoped>

</style>