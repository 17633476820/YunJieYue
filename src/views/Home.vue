<template>
  <div class="container">
      <el-container>
        <el-header>云借阅管理系统
             <span id="span1" @click="zhuxiao">注销</span>
             <span id="span2">{{username}}</span>
             <img src="../assets/user1.png" alt="" >
        </el-header>
        <el-container>
            <el-aside width="200px">
                <div @click="showfirstpage">首页</div>
                 <div @click="showlist">图书借阅</div>
                  <div  @click="showborrownow">当前借阅</div>
                  <div  @click="showbookrecord">借阅记录</div>
            </el-aside>
            <el-main>
                <router-view></router-view>
         
            </el-main>
        </el-container>
</el-container>
  </div>
</template>

<script>

export default {
    name:"Home",
     data() {
         return {
            username:window.localStorage.user_name
         }
     },
     methods: {
        showlist(){
            this.$router.push('/home/booklist')
        },
        showfirstpage(){
           this.$router.push('/home/firstpage')
        },
        showborrownow(){
            this.$router.push('/home/borrownow')
        },
         showbookrecord(){
            this.$router.push('/home/bookrecord')
        },
        zhuxiao(){
          var a = confirm("确定注销?")
          if(a){
             this.$router.replace('/login')
          }
        }
     },
    
     
}
</script>

<style>
  .el-header {
   font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    background-color: #e2d9e6;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 30px;
    margin: 0%;
    padding: 0%;
  }
  .el-header #span1{
    float: right;
    margin: 0 10px 0 0;
    font-size: 20px;
    cursor: pointer;
  }
   .el-header #span2{
    float: right;
    margin: 0 10px 0 0;
    font-size: 25px;
   
  }
  .el-header img{
    float: right;
    margin: 10px 5px 0 0;
    width: 30px;
    height: 30px;
  }
  .el-aside {
  
    background-color: #e7cef1 ;
    color: #333;
   
    height: 650px;
    
  }
   .el-aside div{
    background-color: #ddb1f3;
    border-top: #333 solid 0.5px;
     width: auto;
     height: 50px;
     line-height: 40px;
     text-align: left;
   }
   .el-aside div:hover{
    cursor: pointer;
    background-color: #e1ccee;
   }
  
  .el-main {
    background-color: #e7cef1;
    color: #333;
    text-align: left;
    height: 650px;
    line-height: 30px;
  }
  
 
  

  
 

</style>