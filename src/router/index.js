import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/view/Home'
import GoodsInformation from "@/components/DashBoard/GoodsInformation";
import GoodsFilter from "@/components/DashBoard/GoodsFilter";

const routes = [
    {path: '',component: Home,name:"主页"},
    {path: '/GoodsFilter',component: GoodsFilter,name:"商品筛选"},
    {path: '/GoodsInformation',component: GoodsInformation,name:"商品信息统计"}

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router