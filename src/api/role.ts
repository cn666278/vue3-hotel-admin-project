import { $get, $post } from "../utils/request.ts";

// 获取角色列表
export const $list = async () => {
  let res = await $get("/role/list");
  console.log(res);
  return res;
};

// 添加角色
export const $addRole = async (params: object) => {
  let res = await $post("/role/addRole", params);
  return res;
};
