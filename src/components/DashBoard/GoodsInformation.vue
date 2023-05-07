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
        <div>数据趋势</div>
        <div ref="chart" style="height: 300px;width: 100%"></div>
      </el-card>

    </el-row>
  </div>
</template>



<script>
import * as echarts from 'echarts';
import {getInformation} from "@/utils/api";
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
      goodsData: [
        { id: 1, name: '趋势1', price: 100 },
        { id: 2, name: '趋势2', price: 200 },
        { id: 3, name: '趋势3', price: 300 },
        { id: 4, name: '趋势4', price: 400 }
      ],
      loadingStatus: true
    }
  },
  methods:{
    setterLoading(status){
      this.loadingStatus = status;
    }
  },
  computed:{
    goodsChartOption() {
      const option = {
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'line',
          data: [30, 40, 10, 50, 20, 70, 30, 80, 40, 90]
        }]
      };
      console.log(option)
      this.setterLoading(false)
      return option
    },
    loading() {
      return this.loadingStatus
    }
  },
  mounted() {
    const chart = echarts.init(this.$refs.chart);
    chart.setOption(this.goodsChartOption)
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