import request from "./request";

// 查询存在、修改
export const head = (uri: string) => request.head(uri)

export const get = (uri: string) => request.get(uri)

export const post = (uri: string, params: any): Promise<any> => request.post(uri, params)

// 更改请求
export const put = (uri: string, params: any) => request.put(uri, params)

// 删操作，不一定执行
export const deleteRequest = (uri: string) => request.delete(uri)

