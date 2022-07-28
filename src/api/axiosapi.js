// // 刚刚封装的axios
import request from '../utils/request.js';


export const getlogin = (res) => {
    return request({
        url: '/login',
        method: 'post',
        params: res,
    })
}
export const getregister = (res) => {
    return request({
        url: '/register',
        method: 'post',
        params: res,
    })
}
export const selectbook = (res) => {
    return request({
        url: '/book',
        method: 'post',
        params: res,
    })

}

export const getselectbook = (res) => {
    return request({
        url: '/getselectbook',
        method: 'post',
        params: res,
    })

}
export const borrowerbook = (res) => {
    return request({
        url: '/borrowerbook',
        method: 'post',
        params: res,
    })
}
export const selectrecord = (res) => {
    return request({
        url: '/selectrecord',
        method: 'post',
        params: res,
    })
}
export const insertbook = (res) => {
    return request({
        url: '/insertbook',
        method: 'post',
        params: res,
    })
}
export const editbook = (res) => {
    return request({
        url: '/editbook',
        method: 'post',
        params: res,
    })
}
export const deletebook = (res) => {
    return request({
        url: '/deletebook',
        method: 'post',
        params: res,
    })
}
export const cunrrentborrow = (res) => {
    return request({
        url: '/cunrrentborrow',
        method: 'post',
        params: res,
    })
}
export const returbook = (res) => {
    return request({
        url: '/returbook',
        method: 'post',
        params: res,
    })
}
export const borrowrecord = (res) => {
    return request({
        url: '/borrowrecord',
        method: 'post',
        params: res,
    })
}