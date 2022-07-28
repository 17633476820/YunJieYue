<template>
   <div>
    这是查询内容
    <button @click="test">查询</button>
   </div>
</template>

<script>
import {getselectbook} from '../api/axiosapi.js'
export default {
            name:'selectbook',
            data() {
                return {
                 

                }
            },
            methods: {
                test(){
                     var a = {
                             book_author:'村上春树',
                           
                        }
                 getselectbook(a).then(res=>{
                        console.log(res);
                     })
                }
                
            },
   created() {
    
        // this.selectbooklist=this.$route.query
        // console.log( this.selectbooklist);
       
       
   },
    }
</script>

<style>

</style>