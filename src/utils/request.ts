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

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 每次发送请求前，向请求头添加token
  console.log(config)
  config.headers['token'] = sessionStorage.getItem("token");
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
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