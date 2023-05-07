<template>
  <div class="contain">
     <div class="header">
         <HeaderPage/>
     </div>

    <div class="content" style="width: 100%;">
        <!-- 侧边栏内容 -->
        <nav-page class="left-nav"/>
        <div class="main-content">
          <MainPage/>
        </div>

    </div>

  </div>

</template>


<script>
import HeaderPage from "@/components/DashBoard/Header";
import NavPage from "@/components/DashBoard/Nav";
import MainPage from "@/components/DashBoard/Main";
import {getSearchKey} from "@/utils/api";
export default {
  name: "HomePage",
  components: {MainPage, NavPage, HeaderPage},
  mounted() {
    getSearchKey();
  }
}
</script>

<style scoped>
.contain{
  margin: 0;
}
.content{
  display: flex;
  width: 100%;
}
.left-nav{
  position: fixed;
  top: 60px;
  bottom: 0;
  margin-left: 10px;
  width: 150px;
  z-index: 999;
  overflow-y: auto;
}

.main-content{
  margin-left: 50px;
  width: 100%;
  display: flex; /* 使用flex布局 */
  justify-content: center; /* 设置水平居中 */
  align-items: center; /* 设置垂直居中 */

  overflow-y: auto;
  flex: 1;
  padding-top: 60px;
  padding-left: 150px; /* 右侧内容的左边距，应该等于侧边栏的宽度 */
}

.contain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}




</style>