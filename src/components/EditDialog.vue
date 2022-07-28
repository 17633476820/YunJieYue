<template>
<div>
  <el-dialog
  title="图书信息"
  :visible.sync="editdialogVisible"
  width="30%"
  :before-close="handleClose"
  size="500px"
  >
  <el-form ref="form" :model="editcurrentdata" label-width="80px">
  <el-form-item label="图书名称">
    <el-input v-model="editcurrentdata.book_name"></el-input>
  </el-form-item>
  
  <el-form-item label="标准ISBN">
    <el-input v-model="editcurrentdata.book_isbn"></el-input>
  </el-form-item>
  <el-form-item label="出版社">
    <el-input v-model="editcurrentdata.book_press"></el-input>
  </el-form-item>
   <el-form-item label="作者">
    <el-input v-model="editcurrentdata.book_author"></el-input>
  </el-form-item>
   <el-form-item label="书籍页数">
    <el-input v-model="editcurrentdata.book_pagination"></el-input>
  </el-form-item>
  <el-form-item label="书籍价格">
    <el-input type="text" v-model="editcurrentdata.book_price"></el-input>
  </el-form-item>
 
  <el-form-item label="上架状态">
    <el-select v-model="editcurrentdata.status" placeholder="">
      <el-option label="上架" value="1"></el-option>
      <el-option label="下架" value="0"></el-option>
    </el-select>
  </el-form-item>
</el-form>
   

  <div slot="footer" class="dialog-footer">
    <el-button type="success" @click="save">保 存</el-button>
    <el-button type="info" @click="handleClose">取 消</el-button>
  </div>
</el-dialog>

</div>

</template>

<script>
import {deletebook} from '../api/axiosapi.js'
import {editbook} from '../api/axiosapi.js'
export default {
    name:'insertbook',
    data() {
        return {
         
       
       
        }
    },
    props:[
        "editdialogVisible",
        "editcurrentdata"
    ],
     methods: {
      handleClose(){
        this.$emit('editchangeshow')
      },
      save(){
                 console.log(this.editcurrentdata);
          if(this.editcurrentdata.status==1){
             editbook(this.editcurrentdata).then(res=>{
                console.log(res);
             })
             this.$message({
                message:'修改成功',
                type:'success'
             })
             this.$emit('editchangeshow')
               
          }else{
              deletebook(this.editcurrentdata).then(res=>{
                console.log(res);
              })
              this.$message({
                message:'下架成功',
                type:'warning'
             })
              this.$emit('editchangeshow')
          }
       window.location.reload();
      }
     },
    
 
}
</script>

<style>
.dialog-footer{
  margin: -15px;
}
</style>