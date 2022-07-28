<template>
<div>
  <el-dialog
  title="图书信息"
  :visible.sync="insertdialogVisible"
  width="30%"
  :before-close="handleClose"
  size="500px"
  >
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="图书名称">
    <el-input v-model="form.book_name"></el-input>
  </el-form-item>
  
  <el-form-item label="标准ISBN">
    <el-input v-model="form.book_isbn"></el-input>
  </el-form-item>
  <el-form-item label="出版社">
    <el-input v-model="form.book_press"></el-input>
  </el-form-item>
   <el-form-item label="作者">
    <el-input v-model="form.book_author"></el-input>
  </el-form-item>
   <el-form-item label="书籍页数">
    <el-input v-model="form.book_pagination"></el-input>
  </el-form-item>
  <el-form-item label="书籍价格">
    <el-input type="text" v-model="form.book_price"></el-input>
  </el-form-item>
 
  <el-form-item label="上架状态">
    <el-select v-model="form.status" placeholder="">
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
import {insertbook} from  '../api/axiosapi.js'
import {selectbook} from '../api/axiosapi.js'
export default {
    name:'insertbook',
    data() {
        return {
                form: {
            book_id:'',
            book_name:'',
            book_isbn:'',
            book_press:'',
            book_author:'',
            book_pagination:'',
            book_price:'',
            book_uploadtime:'',
            book_status:'',
            book_borrower:'',
            book_borrowertime:'',
            book_returntime:'',
            status:''

        }
        }
    },
    props:[
        "insertdialogVisible"
    ],
     methods: {
      handleClose(){
        this.$emit('addchangeshow')
      },
      save(){
        console.log(this.form);
                  insertbook(this.form).then(res=>{
                    console.log(res);
                  })
                  this.$message({
                    message:'增加成功',
                    type:"success"
                  })
                   this.$emit('addchangeshow')
          
      }
     },
}
</script>

<style>
.dialog-footer{
  margin: -15px;
}
</style>