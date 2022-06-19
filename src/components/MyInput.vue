<template>
    <div class="inputContainer">
        <transition name='move'>
            <div class="textLabel" :class="[isFocused||inputValue!=''?'toTop':'']">{{texts.placeHolder}}</div>
        </transition>
        <div class="inputBox">
            <input class='minput' type="text" v-model='inputValue' @focus='handleFocus' @blur="handleBlur">
            <div class="inputCheck">
                <div v-if='isFocused&&inputValue!=""'>
                    <div class='loading'></div>
                </div>
                <div v-if='inputValue!=""&&!valueChecked&&!isFocused' style='color:red'>{{texts.errortext}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isFocused:false,
            inputValue:'',
            valueChecked:false
        }
    },
    // placeHoler---->用于模拟input中的palceholder的文字
    props:{
        inputtype:{
            type:String
        },
        texts:{
            type:Object,
            default:()=>{
                return {
                    placeHolder:'请输入',
                    oktext:'ok',
                    errortext:'error'
                }
            }
        }
    },
    methods:{
        handleFocus(){
            this.isFocused = true;
        },
        handleBlur(){
            this.isFocused=false;
        }
    }

}
</script>
<style scoped>
.inputContainer{
    position:relative;
    width:100%;
    height:80px;
}
.textLabel{
    text-align: left;
    line-height: 20px;
    box-sizing: border-box;
    position: absolute;
    top:40px;
    left:0px;
    text-indent: 1em;
    font-size: 18px;
    color:#999;
    transition:all 0.3s linear;
}
.toTop{
    top:0px;
    font-size: 14px;
    color:#666;
}
.inputBox{
    position: absolute;
    box-sizing: border-box;
    left:0;
    bottom: 0;
    height:60px;
    width:100%;
}
.minput{
    display: block;
    box-sizing: border-box;
    width:100%;
    height:60px;
    line-height: 60px;
    background:transparent;
    text-indent: 1em;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    font-size: 18px;
}
.inputCheck{
    position: absolute;
    height:60px;
    right:0;
    bottom:0;
}
.inputCheck>div{
    width:60px;
    height:60px;
    line-height: 60px;
    text-align: center;
    box-sizing: border-box;
}
.loading{
    width:14px;
    height:14px;
    border:2px solid #666;
    border-radius: 16px;
    border-right: none;
    margin:23px auto;
    animation-name:loading;
    animation-duration:1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
@keyframes loading {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>