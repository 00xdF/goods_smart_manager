import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/view/Home'
import GoodsInformation from "@/components/DashBoard/GoodsInformation";
import GoodsFilter from "@/components/DashBoard/GoodsFilter";
import ViewPdf from "@/view/ViewPdf";

const routes = [
    {path: '/',component: Home,name:"主页"},
    {path: '/GoodsFilter',component: GoodsFilter,name:"商品筛选"},
    {path: '/GoodsInformation',component: GoodsInformation,name:"商品信息统计"},
    {path: '/View',component: ViewPdf,name:"预览PDF"}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router