<template>
  <div>
    
     <el-table
    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    style="width: 100%"
   >
    <el-table-column
      prop="record_bookname"
      label="图书名称"
      width="200">
    </el-table-column>
    
    
    <el-table-column
      prop="record_bookisbn"
      label="标准ISBN">
    </el-table-column>
    
     <el-table-column
      prop="record_borrower"
      label="借阅人">
    </el-table-column>
     <el-table-column
      prop="record_borrowtime"
      label="借阅时间">
    </el-table-column>
     <el-table-column
      prop="record_remandtime"
      label="归还时间">
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
import {selectrecord} from '../api/axiosapi.js'
export default {
      name:'bookrecord',
      data() {
        return {
          tableData:[],
           currentPage: 1, //当前页
         total: 10, //所有的数据
        pageSize:5,//每页存放几条数据
        }
      },
      created() {
         selectrecord().then(res=>{
          console.log(res.data.result);
          const _this = this 
          _this.tableData = res.data.result
         })
      },
}
</script>

<style>

</style>