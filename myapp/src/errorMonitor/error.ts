/**
 * 前端监控入口
 */
import html2canvas from "html2canvas";
import { post } from "../common/post";

const errorStack = []
const wholeStack = []

export let errorInfo = []


export const Sentry = () => {
    window.onerror = (...args) => {
        console.table(args)
    }

    window.addEventListener('error', e => {
        console.error('listen error:', e);

        errorInfo = [...errorStack, ...wholeStack]
        post('urrf/api', {
            dat:DataTransfer,
        })
    })

    window.addEventListener('unhandledrejection', e => {
        console.error('listen unhandledrejection:', e);
        errorInfo = [...errorStack, ...wholeStack]
    })

    window.addEventListener('abort', e => {
        console.error('listen abort:', e)
    })

    window.addEventListener('click', e => {

        // 1. 获取整体的截图
        html2canvas(document.body).then(canvas => {
            const img = canvas.toDataURL('image/png')
            
            if (wholeStack.length > 3) {
                wholeStack.shift()
            }

            wholeStack.push(img)
        })


        // 2. 点击组件的截图
        html2canvas(e.target as HTMLElement).then(canvas => {
            const img = canvas.toDataURL('image/png')
            if (errorStack.length > 3) {
                errorStack.shift()
            }

            errorStack.push(img)
        })
        
    })

    console.error = (...args) => {
        console.log(...args);
    }
}