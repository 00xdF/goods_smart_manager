<template>
  <div class="content">
    <el-row style="height: 200px;margin-top: 20px">
      <el-col :span="5" style="margin-right: 20px">
        <el-card>
          <div class="card">
            <div class="clearfix" style="display: flex">
              <el-icon style="font-size: 20px"><CreditCard /></el-icon>
              <span>商品总数量</span>
            </div>
            <div>
              <p class="number-style" style="color: gray">{{goods.count}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5"  style="margin-right: 20px">
        <el-card>
          <div class="card">
            <div class="clearfix" style="display: flex">
              <el-icon style="font-size: 20px;color: orange"><ArrowUpBold /></el-icon>
              <span >今日新增</span>
            </div>
            <div>
              <p class="number-style">{{goods.newAdd}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" style="margin-right: 20px">
        <el-card>
          <div class="card">
            <div class="clearfix" style="display: flex">
              <el-icon style="font-size: 20px;color: red"><StarFilled /></el-icon>
              <span>我的收藏</span>
            </div>
            <div>
              <p class="number-style" style="color: red">{{goods.myFavorite}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" style="margin-right: 20px">
        <el-card>
          <div class="card">
            <div class="clearfix" style="display: flex">
              <el-icon style="font-size: 20px;color: black"><Lock /></el-icon>
              <span>黑名单</span>
            </div>
            <div>
              <p class="number-style" style="color: black">{{goods.blackCount}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="width: 100%;margin-top: 20px">
      <el-card class="mt-2" v-loading="loading" style="width: 88%" >
        <div>
          <span style="color:red;font-size: 20px">{{this.$global.allowedWord[0]}}</span>
          <span style="color:gray;margin-left: 10px" >近{{this.day}}天</span>
          <span style="color:gray;">平均价格走势</span>
          <el-button type="success" style="margin-left: 10px" @click="day = 7;this.setChartData();">近七天</el-button>
          <el-button type="success" style="margin-left: 10px" @click="day = 15;this.setChartData();">近半月</el-button>
          <el-button type="success" style="margin-left: 10px" @click="day = 30;this.setChartData();">近个月</el-button>
          <el-button type="success" style="margin-left: 10px" @click="day = 180;this.setChartData();">近半年</el-button>
        </div>
        <div ref="chart" style="height: 300px;width: 100%"></div>
      </el-card>

    </el-row>
  </div>
</template>



<script>
import * as echarts from 'echarts';
import {getChartData, getInformation} from "@/utils/api";
export default {
  name: "GoodsInformation",
  data(){
    return{
      goods:{
        count:0,
        newAdd:0,
        myFavorite:0,
        blackCount:0
      },
      goodsData:{
        x:[],
        y:[]
      },
      loadingStatus: true,
      day:30
    }
  },
  methods:{
    setterLoading(status){
      this.loadingStatus = status;
    },
    setChartData(){
      const chart = echarts.init(this.$refs.chart);
      getChartData(this.day).then(x=>{
        this.goodsData.x = x.x;
        this.goodsData.y = x.y;
        chart.setOption(this.goodsChartOption)
      })
    }
  },
  computed:{
    goodsChartOption() {
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap:false,
          data: this.goodsData.x,
          axisLabel: {
            interval: 0, // 每个标签都显示
          },
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'line',
          data: this.goodsData.y
        }]
      };
      this.setterLoading(false)
      return option
    },
    loading() {
      return this.loadingStatus
    }
  },
  mounted() {
    this.setChartData();
    getInformation().then(x=>{
      this.goods.count = x.count;
      this.goods.newAdd = x.todayNewAdd;
      this.goods.myFavorite = x.favorite;
      this.goods.blackCount = x.black;
    });

  }
}
</script>

<style scoped>
.clearfix{
  color: gray;
  font-family: "JetBrains Mono ExtraBold",serif;
  font-weight: bolder;
}
.card{
  height: 150px;
}
.number-style{
  font-family: "JetBrains Mono ExtraBold",serif;
  font-weight: bolder;
  font-size: 40px;
  color: orange;
}
</style>