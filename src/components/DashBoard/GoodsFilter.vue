<template>
<div>
  <div  style="margin-top: 20px;width: 50%;display: flex" >
    <el-tag style="height: 30px" type="success" >关键词</el-tag>
    <el-input placeholder="必须出现的关键词" v-model="this.$global.allowedWord[0]" :disabled="true"></el-input>
    <el-tag style="height: 30px;margin-left: 20px" type="danger">禁词</el-tag>
    <el-input placeholder="必须禁止的关键词" v-model="this.$global.bannedWord[0]" :disabled="true"></el-input>
  </div>
  <div  style="margin-top: 20px;width: 70%;display: flex" >
    <el-tag style="height: 30px" type="success">价格区间</el-tag>
    <el-input placeholder="low" v-model="this.lowPrice"></el-input>
    <el-text style="margin-left: 20px;margin-right: 20px">-</el-text>
    <el-input placeholder="high" v-model="this.highPrice" ></el-input>
    <el-button type="danger" style="margin-left: 20px" @click="save">保存</el-button>
    <el-button type="warning" style="margin-left: 20px" @click="filterUnknown">过滤未认证</el-button>
    <el-button type="success" style="margin-left: 20px" @click="init">初始化</el-button>
  </div>
  <div class="result" style="margin-top: 20px" v-loading="this.loadingStatus">
    <el-table
        ref="table"
        :data="tableData"
        :row-style="rowStyle"
        :default-sort="{ prop: 'pubTime,level', order: 'descending' }"
    >
      <el-table-column label="ID" prop="id" width="120"></el-table-column>
      <el-table-column label="发布时间" width="170" prop="pubTime" sortable></el-table-column>
      <el-table-column label="标题" prop="content"  width="300" show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="价格" prop="price" sortable></el-table-column>
      <el-table-column label="发布者昵称" prop="userNick" ></el-table-column>
      <el-table-column label="信用" prop="level" sortable></el-table-column>
      <el-table-column label="链接" >
        <template #default="scope">
          <el-button
              :style="{ backgroundImage: 'url(' + qrCode + ')',height:'60px',width:'60px' }"
              @mouseover="generateQRCode(scope.$index, scope.row)"
              @mouseleave="clearQRCode()"
              />
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #default="scope">
          <el-button
              size="small"
              @click="handleFavorites(scope.$index, scope.row)"
              type="success"
          >收藏</el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleBanned(scope.$index, scope.row)"
          >拉黑</el-button >
        </template>
      </el-table-column>
    </el-table>
  </div>

</div>
</template>
<script>
import QRCode from 'qrcode'
import {getData, setItemStatus} from '@/utils/api'

export default {
  name: "GoodsFilter",
  data(){
    return{
      tableData:[],
      lowPrice:0,
      highPrice:99999,
      qrCode:'',
      existData:[],
      loadingStatus:true,
      isFilterUnknown:false,
      firstOpen:true
    }
  },
  methods:{
    //添加收藏
    handleFavorites(index,row){
      this.setStatus(row.id,1);
      row.status = 1;
    },
    //拉黑该商品以及发布者
    handleBanned(index,row){
      this.setStatus(row.id,2);
      row.status = 2;
    },
    //生成二维码
    async generateQRCode2(index,row){
       const opts = {
        width: 60,
        height: 60,
        margin: 0,
        color: {
          dark: '#000000ff',
          light: '#ffffffff',
        },
      }
      console.log(row.url)
       await QRCode.toDataURL(row.url, opts).then((d)=>{
         this.qrCode = d.toString();
       })
    },
    //异步生成二维码
    async generateQRCode(index,row) {

      const  op ={
        width :60,
        height :60
      }
      // 将base64字符串赋值给data中的变量
      this.qrCode = await QRCode.toDataURL(row.url, op)
    },

    clearQRCode(){
      this.qrCode = ''
    },

    save(){
      this.tableData = [];
      this.existData = [];
      this.getData();
    },
    // 异步获取数据
    async getData(){
      await getData(this.lowPrice,this.highPrice,this.isFilterUnknown).then(res=>{
        res.forEach(x =>{
          if(!this.existData.includes(x.id.toString())){
            const date = new Date(x.pubTime*1); // 创建Date对象
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            x.pubTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            this.existData.push(x.id)
            this.tableData.push(x)
            this.tableData.sort((a, b) => {
              if (a.pubTime < b.pubTime) return 1;
              if (a.pubTime > b.pubTime) return -1;
              return 0;
            });
            this.loadingStatus = false
          }
        })
      })
    },
    //保存筛选条件
    filterUnknown(){
      this.isFilterUnknown = true
      this.tableData = [];
      this.existData = [];
      this.getData();
    },
    //初始化筛选条件
    init(){
      this.lowPrice = 0;
      this.highPrice = 99999;
      this.isFilterUnknown = false
      this.tableData = [];
      this.existData = [];
      this.getData();
    },
    //按照商品状态设置背景色
    rowStyle(row){
      if (row.row.status ===  1) {
        return { color:'green' }
      } else if (row.row.status === 2) {
        return {color:'red' }
      }else {
        return { background: 'white' }
      }
    },
    //设置状态
    setStatus(id,status){
      setItemStatus(id,status);
    }
  },
  mounted() {
    if(this.firstOpen){
      this.getData();
      this.firstOpen = false;
    }
    //设置定时器 每5秒刷新
    setInterval(() => {
      this.getData();
    }, 5000);
  },

}
</script>

<style scoped>

</style>