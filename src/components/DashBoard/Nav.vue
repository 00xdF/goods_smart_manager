<template>
  <div id="nav">
    <el-menu>
      <router-link to="/GoodsInformation" style="text-decoration: none;">
        <div style="display: flex;align-items: center">
          <el-icon style="font-size: 30px"><Grid/></el-icon>
          <el-menu-item index="GoodsInform" >主页</el-menu-item>
        </div>
      </router-link>

      <router-link to="/GoodsFilter" style="text-decoration: none;">
        <div style="display: flex;align-items: center">
          <el-icon style="font-size: 30px"><Histogram /></el-icon>
         <el-menu-item index="GoodsFilter">商品统计</el-menu-item>
        </div>
      </router-link>

      <router-link to="/GoodsFilter" style="text-decoration: none;">
        <div style="display: flex;align-items: center">
          <el-icon style="font-size: 30px"><StarFilled /></el-icon>
          <el-menu-item index="GoodsFilter">收藏列表</el-menu-item>
        </div>
      </router-link>

      <router-link to="/GoodsFilter" style="text-decoration: none;">
        <div style="display: flex;align-items: center">
          <el-icon style="font-size: 30px"><DeleteFilled /></el-icon>
          <el-menu-item index="GoodsFilter">拉黑列表</el-menu-item>
        </div>
      </router-link>

      <router-link to="/view" style="text-decoration: none;">
        <div style="display: flex;align-items: center">
          <el-icon style="font-size: 30px"><DeleteFilled /></el-icon>
          <el-menu-item index="GoodsFilter">pdf预览</el-menu-item>
        </div>
      </router-link>


    </el-menu>

  </div>
</template>

<script>
export default {
  name: "NavPage",
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>