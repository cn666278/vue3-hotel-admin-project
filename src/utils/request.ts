import axios from "axios";
import { baseURL_dev } from "../configure/baseURL.ts";

/**
 * 二次封装axios，将请求地址抽离到api文件夹中
 * 好处：1.便于维护，2.便于修改，3.便于管理 4.便于查找 5.便于复用 6.便于测试
 */

// 创建axios实例
const instance = axios.create({
  baseURL: baseURL_dev,
  timeout: 30000, // Request timeout 30s
});

// get请求方法
export const $get = async (url: string, params: object = {}) => {
  let { data } = await instance.get(url, { params });
  return data;
};

// post请求方法
export const $post = async (url: string, params: object = {}) => {
  let {data} = await instance.post(url, params);
  return data;
};