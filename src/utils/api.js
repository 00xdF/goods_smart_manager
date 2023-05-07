import axios from 'axios'
import {baseUrl,allowedWord,bannedWord} from '@/utils/global'

//获取商品列表
export const getData = async (lowPrice,highPrice,isFilterUnknown) => {
    let url = baseUrl+'/item?allowed='+encodeURIComponent(allowedWord[0])+'&banned='+encodeURIComponent(bannedWord[0])+'&'
    url += 'lowPrice='+lowPrice+"&highPrice="+highPrice+'&isFilterUnknown='+isFilterUnknown
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