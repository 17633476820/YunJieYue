<!-- 新书推荐页面 -->
<template>
<div>
    <span>新书推荐</span>

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
      <button  @click="borrowerdialog(scope.row)">借阅</button>
   </template>
    </el-table-column>
  </el-table>
  <div class="foot">
              <el-pagination
         @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
             :current-page="currentPage"  
            
            :page-size="pageSize" 
            layout="total,  prev, pager, next, jumper" 
            :total="tableData.length">
</el-pagination>
  </div>
   <borrowdialog  :dialogVisible="showborrowdialog" @changeshow="changeshow" :currentdata="currentdata"></borrowdialog>
     </div>


</template>

<script>

import {selectbook} from '../api/axiosapi.js'
import borrowdialog from '../components/BorrowDialog.vue'
export default {
          name:'firstpage',
          components:{
            borrowdialog
          },
          data() {
            return {
                 tableData: [],
      
         currentPage: 1, //当前页
         total: 10, //所有的数据
        pageSize:5,//每页存放几条数据
       
               showborrowdialog:false,
               currentdata:{

               }
            }
          },
            methods:{
        //借阅功能的实现
        borrowerdialog(e){
            this.currentdata=e
          if(this.currentdata.book_status==1){
          this.$message({
            message:'此书已被借阅',
            type:"info"
          })
        }else{

           console.log(this.currentdata);
          this.showborrowdialog=true
        }
         
          
        },
        changeshow(){
          
            this.showborrowdialog=false
        },
      
     
        //分页功能的实现
            handleSizeChange(val) {
                    console.log(`每页 ${val} 条`);
                    this.currentPage = 1;
                    this.pageSize = val;
                },
                //当前页改变时触发 跳转其他页
                handleCurrentChange(val) {
                    console.log(`当前页: ${val}`);
                    this.currentPage = val;
                }
    },
      created() {
        const _this = this 
        selectbook().then(res=>{
            //   this.tableData = res
            console.log(res.data.result.length);
            _this.tableData = res.data.result
            
          
        })
    },
  
}
</script>

<style>
 span{
    font-size: 20px;
    margin: -10px 0 0 0;
 }
 .foot{
    margin: 10px;
 }
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