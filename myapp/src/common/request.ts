/**
 * request
 */
import { message } from 'antd'
import axios from 'axios'

export interface IResponseData {
    code: number
    msg: string
    result: string[] | any
    status: number
    redirect?: string
}

const token = ''

const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 20000,
    timeoutErrorMessage: 'timeout...',
    withCredentials: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    maxRedirects: 5,
})

request.interceptors.request.use(
    config => {
        // @ts-ignore
        token && (config.headers.Authorization = token)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// msg code
const msgList: {
    [key: number]: string
} = {
    2888: '成功',
    9999: '错误',
    3333: '重定向',
    2234: '邮箱待验证',
    2235: '邮箱已存在',
    2236: '邮箱申请存在问题',
    2247: '邮箱申请成功,邮件已发送',
}

request.interceptors.response.use(
    response => {
        const resData: IResponseData = response.data
        const redirect: string = resData.redirect as string
        if (response.status === 200) {
            if (resData.code === 3333) {
                setTimeout(() => {
                    window.location.href = redirect
                }, 10000)
            }else if (resData.code === 2235) {
                setTimeout(() => {
                    window.location.href = redirect
                }, 3000)
            }
            return Promise.resolve(resData)
        }
        else return Promise.reject(response)
    },
    error => {
        if (error.response.data.code in msgList) {
            message.warning(error.response.data.msg || msgList[error.response.data.code])
        }
        
        return Promise.reject(error)
    }
)


export default request

