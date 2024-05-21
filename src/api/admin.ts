import { $get } from "../utils/request.ts"

export const $Login = async (params: object) => {
    // let res = await $get("Admin/Login", params);
    let res = await $get("login", params);
    console.log(res);
}