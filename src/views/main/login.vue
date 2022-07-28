<template>
       <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>云借阅图书管理系统</span>
            </div>
          <el-tabs v-model="currentindex"   @tab-click="handleClick">
          
            <el-tab-pane label="登录" name="login">
              
            <el-form ref="loginForm" :model="loginForm"  status-icon :rules="rules" >
                  <el-form-item label="用户名" label-width="90px" prop="user_name">
                     <el-input placeholder="" type="text"  v-model="loginForm.user_name" ></el-input>
                  </el-form-item>
                   <el-form-item label="密码" label-width="90px" prop="user_password">
                     <el-input placeholder="" type="password"  v-model="loginForm.user_password"></el-input>
                  </el-form-item>
                  <el-form-item >
                       <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                  </el-form-item>
              </el-form>
        
              
            </el-tab-pane>


            <el-tab-pane label="注册" name="register">
             
                    <el-form ref="registerForm" :model="registerForm"  status-icon :rules="rules" >
                  <el-form-item label="用户名" label-width="90px" prop="user_name">
                     <el-input placeholder="" type="text"  v-model="registerForm.user_name" ></el-input>
                  </el-form-item>
                   <el-form-item label="密码" label-width="90px" prop="user_password">
                     <el-input placeholder="" type="password"  v-model="registerForm.user_password"></el-input>
                  </el-form-item>
                   <el-form-item label="确认密码" label-width="90px" prop="configpassword">
                     <el-input placeholder="" type="password"  v-model="registerForm.configpassword"></el-input>
                  </el-form-item>
                  <el-form-item >
                       <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
                  </el-form-item>
              </el-form>
              
               
            </el-tab-pane>
            
           </el-tabs>
</el-card>
       </div>
</template>

<script>
import {getlogin,getregister} from '../../api/axiosapi.js';
export default {
       name:'login',
       data() {
         var validataUsername = (rule,value,callback)=>{
           if(value==""){
             callback(new Error("请输入用户名"))
           }else{
             callback()
           }
         };
         var validatePassword = (rule, value, callback) => {
        if (value == "") {
          callback(new Error('请输入密码'));
        } else {
          
          callback();
        }
      };
      var validateconfigPassword = (rule, value, callback) => {
        if (value === "") {
          callback(new Error('请输入密码'));
        } else if(value !== this.registerForm.user_password){
                 callback(new Error("两次密码不一致！"))
        }else {
          callback();
        }
      };
         return {
          token:{
               item:'success'
          },
           
           currentindex:true,
           loginForm:{
             user_name:'',
             user_password:''
           },
           registerForm:{
             user_name:'',
             user_password:'',
             configpassword:''
           },
           activetab:"",
           rules: {
              user_name: [
            { validator: validataUsername, trigger: 'blur' }
          ],
               user_password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
              configpassword: [
            { validator: validateconfigPassword, trigger: 'blur' }
          ],
        }
         }
       },
      methods: {
       submitForm(formName) {
         window.localStorage.user_name=''
        window.localStorage.token='wait'
        if(window.localStorage.getItem('token') == 'success'){
       window.localStorage.removeItem('token')
        }
         
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if( this.activetab==='login'){
               
               getlogin(this.loginForm).then(res=>{
                  if(res.data.status==200){
                    
                    if(res.data.msg[1]==1){
                       this.$message({
                            message: '管理员登录成功',
                            type: 'success'
                          });
                          
                               if (!window.localStorage) {
                                  console.log('浏览器版本太低不支持localStorage')
                                } else {
                                  window.localStorage.token='success'
                                   window.localStorage.user_name=this.loginForm.user_name
                                }
                                
                                 this.$router.push({
                                  path:'/home',
                                 })
                                
    
                    }else{
                      this.$message({
                            message: '用户登录成功',
                            type: 'success'
                          });
                           if (!window.localStorage) {
                                  console.log('浏览器版本太低不支持localStorage')
                                } else {
                                  window.localStorage.token='success'
                                    window.localStorage.user_name=this.loginForm.user_name
                                }
                                this.$router.push('/home')
                    }
                  }else{
                     this.$message.error('用户名或密码错误');
                  }
               })
             
            }
            if( this.activetab === 'register'){
               getregister(this.registerForm).then(res=>{
                  console.log(res.data);
                  if(res.data.status==401){
                    this.$message({
                      message:'注册失败',
                      type:'warning'
                    })
                  }else{
                    this.$message({
                      message:'注册成功',
                      type:'success'
                    })
                  
                  }
               })
                      
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       handleClick(tab, event) {
        this.activetab = tab.name
      }
      },
     
     created() {
          window.localStorage.user_name=''
        window.localStorage.token='wait'
     },
    
}
</script>

<style >
*{
  margin: 0%;
  padding: 0%;
}
body{
    background: linear-gradient(300deg, #f3e7e9, #e3eeff);;
}
 .login{
     width: 1200px;
     margin: 0 auto;
    
 }
  .box-card{
    background-color: #e2d9e6;
              width: 500px;
              margin: 100px auto;
     }
     .clearfix span{
      font-weight: 900;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      font-size: large;
     }
 el-input{
  width: 200px;
 }
     
</style>