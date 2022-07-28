<!-- 图书借阅页面 -->
      <template>
     <div class="box">
      <div class="header">
           <p >图书借阅</p>
             <div class="header1">
                    <span>图书名称:  <input type="text" v-model="inputname"></span>
             </div>
              <div class="header2">
                    <span>图书作者:  <input type="text" v-model="inputauthor"></span>
             </div>
              <div class="header3">
                    <span>出版社:  <input type="text" v-model="inputpress"></span>
                      <button  @click="select" class="btn1">查询</button>
             </div>
           
           

      </div>
        
  
   
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
      <button class="btn1" @click="borrowerdialog(scope.row)">借阅</button>

      <button class="btn1" @click="editdialog(scope.row)">编辑</button>
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
<button class="btn2" @click="addbook">增加</button>
<insertdialog :insertdialogVisible="insertdialogVisible" @addchangeshow="addchangeshow"></insertdialog>

<editdialog :editdialogVisible="editdialogVisible" @editchangeshow="editchangeshow" :editcurrentdata="editcurrentdata"></editdialog>

<borrowdialog  :dialogVisible="showborrowdialog" @changeshow="changeshow" :currentdata="currentdata"></borrowdialog>
  </div>  
     </div>
  
</template>



<script>
import {selectbook} from '../api/axiosapi.js'
import {getselectbook} from '../api/axiosapi.js'
import insertdialog from '../components/Insertdialog.vue'
import editdialog from '../components/EditDialog.vue'
import borrowdialog from '../components/BorrowDialog.vue'

  export default {
   name:'Booklist',
    data() {
      return {
     

        tableData: [],
      
         currentPage: 1, //当前页
         total: 10, //所有的数据
        pageSize:5,//每页存放几条数据

        //查询数据
        inputname:'',
        inputauthor:'',
        inputpress:'',

        insertdialogVisible:false,
        editdialogVisible:false,
        editcurrentdata:{

        },

        showborrowdialog:false,
               currentdata:{

               }

      }
    },
    components:{
    insertdialog,
    editdialog,
    borrowdialog

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

          
          this.showborrowdialog=true
        }
         
          
        },
        changeshow(){
          
            this.showborrowdialog=false
        },
        //编辑功能的实现
        editdialog(e){
            if(window.localStorage.user_name==='admin'){
                   this.editdialogVisible=true
                   this.editcurrentdata=e
            }else{
              this.$message({
                message:'非管理员不可使用',
                type:'warning'
              })
            }
            
            
        },
        editchangeshow(){
             this.editdialogVisible=false
        },
        //增加功能
        addbook(){
          if(window.localStorage.user_name==='admin'){
                this.insertdialogVisible=true
          }else{
                  this.$message({
                message:'非管理员不可使用',
                type:'warning'
              })
          }
           
        },
        addchangeshow(){
          this.insertdialogVisible=false
           selectbook().then(res=>{
            this.tableData = res.data.result
        })
          
        },
        //搜索功能的实现
        select(){
             var inputobject={
                book_name:this.inputname,
                book_author:this.inputauthor,
                book_press:this.inputpress
             }
              getselectbook(inputobject).then(res=>{
                if(res.data.status==401){
                  this.$message({
                    message:'查询失败',
                    type:'warning'
                  })
                }else{
                  
                        this.currentPage=1
                        this.tableData=res.data.result
                        console.log(res);
                         this.$message({
                              message:'查询成功',
                              type:'success'
                            })

                }
                     })
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

.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
.header1{
  position: relative;
  top: -10px;
  left: 450px;
  float: left;

}
.header2{
  position: relative;
  top: -10px;
  left:470px;
  float: left;
}
.header3{
  position: relative;
  top: -10px;
  left: 490px;
  float: left;

}
.btn1{
  font-size: 15px;
  background-color: green;
  cursor: pointer;
  border-radius: 5px;
  color: #f0f9eb;
   padding: 3px;
}
.btn1:hover{
  background-color: lightgreen;

}
.btn2{
   font-size: 20px;
  background-color: green;
  color: #f0f9eb;
  float: right;
   border-radius: 5px;
  margin: -20px 10px;
   cursor: pointer;
   padding: 3px;
}
.btn2:hover{
  background-color: lightgreen;
}
p{
  margin: 0 0 -20px;
  padding: 0%;
  font-size: 20px;
}

 
</style>
  