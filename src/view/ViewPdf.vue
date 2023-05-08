<template>
  <div style="width: 100%;height:800px;display: flex">
    <div class="left_file" style="width: 20%;">
      <el-tag type="danger" style="width: 100%;margin-left: -50px">pdf上传</el-tag>
      <div class="upload">
          <!-- 上传文件只能通过原生input的方式上传-->
          <input type="file" @change="handleFileUpload" accept="application/pdf"/>
        <hr>
          <el-button type="success" @click="uploadFile" size="small" style="width: 100%;margin-left: -10px;margin-bottom: 10px">上传文件</el-button>
        <el-alert title="上传成功！" type="success" v-if="isUpload" @close="isUpload = false"/>
      </div>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="margin-left:-20px;margin-top: 30px"/>
    </div>
    <iframe :src="pdfUrl+whenFile" width="80%" height="100%"></iframe>
  </div>
</template>

<script>
import {getPdfList, uploadPdf} from "@/utils/api";

export default {
  data() {
    return {
      pdfUrl: './static/getPdf.html?url=',
      data: [
        {
          label: 'pdf 文件列表',
          children: [ ],
        },
      ],
      defaultProps:{
        children: 'children',
        label: 'label',
      },
      file:null,
      whenFile:"./web/test.pdf",
      isUpload:false
    }
  },
  methods:{
    //上传文件
    async uploadFile() {
      if (!this.file) {
        return
      }
      const formData = new FormData()
      formData.append('file', this.file)
      const res = await uploadPdf(formData);
      if(res.status === 200){
        this.isUpload = true;
      }else{
        this.isUpload = false;
      }
    },
    handleNodeClick(data){
      if(data.label === "pdf 文件列表"){
        this.data[0].children = [];
        this.getPdfFileList();
      }else{
        const url = "https://localhost:7081/Item/download/";
        this.whenFile = url+data.label.replace(".pdf","");
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0]
    },
    async getPdfFileList(){
      getPdfList().then(x=>{
        console.log(x.data)
        for(const i in x.data){
          this.data[0].children.push({label:x.data[i]});
        }
      })
    }
  },
  mounted() {
    this.getPdfFileList()
  }
};
</script>

<style scoped>
.upload{
  margin-top: 20px;
  margin-right: 20px;
  margin-left: -20px;
  left: 0;
}
</style>
