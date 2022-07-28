import axios from 'axios'
// 新建一个新的axios实例
const newAxios = axios.create({ //创建返回一个新的axios函数对象
    baseURL: 'http://localhost:3000' // 配置你的项目基地址
        // baseURL: 'http://192.168.31.205:8080'
})

// 导出自定义函数, 参数对象解构赋值
export default ({ url, method, params, data, headers }) => {
    return newAxios({
        url: url,
        method: method,
        params: params,
        data: data,
        headers: headers
    })
}