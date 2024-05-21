import { $get } from "../utils/request.ts"
import { md5 } from "md5js"

// error ? params: object ? any
export const $Login = async (params: object | any) => {
    params.password = md5((md5(params.password,32).split('').reverse().join('')),32);
    let res = await $get("Admin/Login", params);
    // let res = await $get("login", params);
    console.log(res);
}