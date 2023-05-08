<template>
  <div class="app-header">
    <el-header class="header">
      <div class="logo">商品管理</div>
      <el-button type="primary" @click="openConfig">配置</el-button>
      <el-dialog
          v-model="dialogVisible"
          title="系统配置"
          width="30%"
      >
          <div  style="margin-top: 20px;width: 100%;display: flex" >
            <el-tag style="height: 30px" type="success">收件箱</el-tag>
            <el-input v-model="recvMail" placeholder="请输入消息接收邮箱"/>
          </div>
         <div  style="margin-top: 20px;width: 100%;display: flex" >
          <el-tag style="height: 30px" type="primary">关键词</el-tag>
          <el-input v-model="allowedWord" placeholder="请输入关键词"/>
        </div>
         <div  style="margin-top: 20px;width: 100%;display: flex" >
          <el-tag style="height: 30px" type="danger">违禁词</el-tag>
          <el-input v-model="bannedWord" placeholder="请输入违禁词"/>
        </div>
          <template #footer>
            <el-button type="success" @click="save">保存信息</el-button>
          </template>
      </el-dialog>
    </el-header>
  </div>
</template>

<script>
import { ElButton, ElDialog } from 'element-plus'
import {getSearchKey, modifySearchKey} from "@/utils/api";
export default {
  name: 'HeaderPage',
  data(){
    return{
      dialogVisible:false,
      recvMail:"dfx0@outlook.com",
      allowedWord:'',
      bannedWord:''
    }
  },
  components:{
    ElButton,ElDialog
  },
  methods:{
    save(){
     modifySearchKey(this.allowedWord,this.bannedWord).then(x=>{
        if(x === 200){
          this.dialogVisible = false;
          getSearchKey();
        }
     })
    },
    openConfig(){
      this.dialogVisible = true;
      this.allowedWord = this.$global.allowedWord[0]
      this.bannedWord =  this.$global.bannedWord[0]
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.menu {
  line-height: 50;
}
.header{
  background-color: green;
}
.config{
  cursor: pointer;
}

</style>
