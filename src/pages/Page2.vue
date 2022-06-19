<template>
    <div>
        <MyInput :texts='{placeHolder:"请输入姓名",oktext:"合法",errortext:"错误"}'></MyInput>
        <el-table :data='tdata' @row-click="rchandle" row-key="id">
            <el-table-column prop='name' label='姓名'/>
            <el-table-column prop='data' label='日期'/>
            <el-table-column prop='text' label='内容'/>
            <el-table-column prop='' label='操作' column-key="id">
                <template #default='scope'>
                    <input type="text" v-model="scope.row.name">
                    <button @click='remove(scope.row.id)'>删除</button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import MyInput from '../components/MyInput.vue'
export default{
    name:'page2',
    components:{MyInput},
    data(){
        return {
            tdata:[
                {
                    name:'jj1',
                    data:'2022-6-16',
                    text:'测试文字11111',
                    id:'09090'
                },
                {
                    name:'jj2',
                    data:'2022-6-16',
                    text:'测试文字11111',
                    id:'09050'
                },
                {
                    name:'jj3',
                    data:'2022-6-16',
                    text:'测试文字11111',
                    id:'02090'
                },
                {
                    name:'jj4',
                    data:'2022-6-16',
                    text:'测试文字11111',
                    id:'09091'
                },
                {
                    name:'jj5',
                    data:'2022-6-16',
                    text:'测试文字11111',
                    id:'01090'
                },
                {
                    name:'jj6',
                    data:'2022-6-16',
                    text:'测试文字11111',
                    id:'09070'
                },
            ]
        }
    },
    methods:{
        rchandle(r,c,e){
            console.log(r)
        },
        remove(id){
            console.log(id)
            this.tdata = this.tdata.filter(item=>{
                return item.id != id;
            })
        }
    }
}
</script>
<style scoped>

</style>