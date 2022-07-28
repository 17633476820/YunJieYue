<template>
<div>


<el-dialog
  title="图书信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
  size="500px"
  >
  
   <el-descriptions class="margin-top" :column="1"  border>
  
    <el-descriptions-item>
      <template slot="label">
       图书名称
      </template>
     {{currentdata.book_name}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
      标准ISBN
      </template>
       {{currentdata.book_isbn}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
      出版社
      </template>
    {{currentdata.book_press}}
    </el-descriptions-item>
     <el-descriptions-item>
      <template slot="label">
       作者
      </template>
       {{currentdata.book_author}}
    </el-descriptions-item>
     <el-descriptions-item>
      <template slot="label">
       书籍页数
      </template>
       {{currentdata.book_pagination}}
    </el-descriptions-item>
     <el-descriptions-item>
      <template slot="label">
       归还时间
      </template>
      <input type="text" width="100px" height="20px"  v-model="record_remandtime">
    </el-descriptions-item>
  </el-descriptions>

  <span slot="footer" class="dialog-footer">
    <el-button type="success" @click="save">保 存</el-button>
    <el-button type="info" @click="handleClose">取 消</el-button>
  </span>
</el-dialog>

</div>

</template>

<script>
import {borrowerbook} from '../api/axiosapi.js'
import {borrowrecord} from '../api/axiosapi.js'
export default {
    name:'borrowdialog',
   data() {
      return {
        // dialogVisible: this.pdialogVisible,
        // Scurrentdata:this.currentdata,

        record_remandtime:'',
        record_borrowtime:''

      };
    },
    props:["dialogVisible","currentdata"],
    methods: {
      handleClose(done) {
        this.$emit("changeshow")

        
      },
      save(){
        
              this.currentdata.book_returntime=this.record_remandtime
        this.currentdata.book_status=1
        var date = new Date()
        this.currentdata.book_borrowtime=date.toLocaleDateString()
        this.currentdata.book_borrower=window.localStorage.user_name
         console.log(this.currentdata);
        borrowerbook(this.currentdata).then(e=>{
          console.log(e);
          this.$message({
                            message: '借阅成功',
                            type: 'success'
                          });
        })
        var recordborrow={
          record_id:this.currentdata.book_id,
          record_bookname:this.currentdata.book_name,
          record_bookisbn:this.currentdata.book_isbn,
          record_borrower:this.currentdata.book_borrower,
          record_borrowtime:this.currentdata.book_borrowtime,
          record_remandtime:this.currentdata.book_returntime
        }
        borrowrecord(recordborrow).then(res=>{
          console.log(res);
        })
       
          this.$emit("changeshow")
        
        
      }
      
    }
}
</script>

<style>
el-dialog{
  width: 700px;
}
.contain table
{
 
   width: 430px;
   height: 100px;
   border: solid 2px black;
}
td{
  
   padding: 0%;
}
input{
  outline: none;
  border-bottom: 1px solid;
}

</style>