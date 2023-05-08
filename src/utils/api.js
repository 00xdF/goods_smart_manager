import axios from 'axios'
import {allowedWord, bannedWord, baseUrl} from '@/utils/global'

//获取商品列表
export const getData = async (lowPrice,highPrice,isFilterUnknown) => {
    let url = baseUrl+'/item/search?lowPrice='+lowPrice+"&highPrice="+highPrice+'&isFilterUnknown='+isFilterUnknown
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}

//获取数据库中商品基本信息
export const getInformation = async () => {
    const url = baseUrl+'/item/inform'
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}

//获取搜索关键词以及违禁词数据
export  const getSearchKey = async () =>{
    const response = await axios.get(baseUrl+'/item/config')
    allowedWord[0] = response.data.allowedWord
    bannedWord[0] = response.data.bannedWord
}

//修改搜索关键词与违禁词
export  const  modifySearchKey = async (allowed,banned)=> {
    let url = baseUrl+"/item/setConfig?";
    if(allowed !== undefined){
        url +="allowedWord="+encodeURIComponent(allowed)+"&";
    }
    if(banned !== undefined && banned.length!==0){
        url += "&bannedWord="+encodeURIComponent(banned)
    }
    try{
        await axios.get(url);
        return 200;
    }catch (e){
        console.log(e)
    }
}

//通过改变状态 来设置收藏/黑名单
export const setItemStatus = async (id,status) => {
    try{
        await axios.get(baseUrl+"/item/setStatus?id="+id+"&status="+status);
    }catch (e){
        console.log(e)
    }
}

//获取商品绘图数据
export const getChartData = async (day)=>{
    try{
        const res = await axios.get(baseUrl + "/Item/basicInform?day=" + day);
        return res.data;
    }catch (e){
        console.log(e)
    }
}

//上传pdf
export const uploadPdf = async (formData)=>{
    try{
        const res = await axios.post(baseUrl+'/item/upload', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return res;
    }catch (e) {
        console.log(e);
    }
}

//获取pdf文件列表
export  const  getPdfList = async ()=>{
    try{
        return await axios.get(baseUrl + "/item/file");
    }catch (e) {
        console.log(e)
    }
}