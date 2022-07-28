<template>
  <div>
    <span>当前借阅</span>
     <el-table
    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    style="width: 100%"
   >
    <el-table-column
      prop="book_name"
      label="图书名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="book_author"
      label="图书作者"
      width="90">
    </el-table-column>
    <el-table-column
      prop="book_press"
      label="出版社">
    </el-table-column>
    <el-table-column
      prop="book_isbn"
      label="标准ISBN">
    </el-table-column>
    <el-table-column
      prop="book_status"
      label="书籍状态">
    </el-table-column>
     <el-table-column
      prop="book_borrower"
      label="借阅人">
    </el-table-column>
     <el-table-column
      prop="book_borrowtime"
      label="借阅时间">
    </el-table-column>
     <el-table-column
      prop="book_returntime"
      label="预计归还时间">
    </el-table-column>
     <el-table-column
      prop="address"
      label="操作">
 <template slot-scope="scope"> 
      <button  @click="ret(scope.row)">归还</button>
   </template>
    </el-table-column>
  </el-table>
  <div class="foot">
              <el-pagination
        
         
             :current-page="currentPage"  
            
            :page-size="pageSize" 
            layout="total,  prev, pager, next, jumper" 
            :total="tableData.length">
</el-pagination>
  </div>
  </div>
</template>

<script>
import {cunrrentborrow} from '../api/axiosapi.js'
import {returbook} from '../api/axiosapi.js'
export default {
        name:'borrownow',
        data() {
          return {
             tableData: [],
                 currentPage: 1, //当前页
         total: 10, //所有的数据
        pageSize:5,//每页存放几条数据
             username:{
              book_borrower:window.localStorage.user_name
             }
          }
        },
       methods: {
        ret(e){
        
          var ss = e
          
          
             returbook(ss).then(res=>{
            this.$message({
              message:'归还成功',
              type:'success'
            })
              
          })
          var username = this.username
           cunrrentborrow(username).then(res=>{
            if(res.data.status==401){
              window.location.reload()
            }else{
                 this.tableData = res.data.result
           
            }
          
        })
          
        }
       },
       created() {
        const _this = this
        cunrrentborrow(this.username).then(res=>{
           _this.tableData = res.data.result
        })
       },
}

</script>

<style>
 button{
  font-size: 15px;
  background-color: green;
  cursor: pointer;
  border-radius: 5px;
  color: #f0f9eb;
  padding: 3px;
}
button:hover{
  background-color: lightgreen;

}

</style>