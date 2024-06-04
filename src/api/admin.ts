import { $get, $post } from "../utils/request.ts";
import { md5 } from "md5js";
import { ElNotification } from "element-plus";

// error ? params: object ? any
export const $Login = async (params: object | any) => {
  params.password = md5(
    md5(params.password, 32).split("").reverse().join(""),
    32
  );
  let res = await $post("login", params);
  console.log(res);
  const { code, data } = res;
  // console.log(data[0].message);
  if (code === 200) {
    ElNotification({
      title: "通知",
      message: data.message,
      type: "success",
    });
    // 登陆成功后，将token存储到sessionStorage（浏览器缓存）中
    sessionStorage.setItem("token", data.token);
    return res;
  } else{
    ElNotification({
      title: "通知",
      message: data.message,
      type: "error",
    });
  }
  return res;
};

//获取一个用户的信息
export const $getUserInfo = async (params: object) => {
  let res = await $get("admin/getUserInfo", params);
  console.log(res);
  return res;
}

// 模拟数据
let mockData = {
  count: 1,
  data: [
    {
      id: 1,
      loginId: "admin",
      username: "管理员",
      password: "21232f297a57a5a743894a0e4a801fc3",
      phone: "10086",
      email: "123@gmail.com",
      photo: "",
      role: { roleId: 1, roleName: "超级管理员" },
      roleId: 1,
    },
    {
      id: 2,
      loginId: "user",
      username: "用户",
      password: "21232f297a57a5a743894a0e4a801fc3",
      phone: "10086",
      email: "helloworld@cf.ac.uk",
      photo: "",
      role: { roleId: 2, roleName: "普通用户" },
      roleId: 2,
    }
  ],
  pageIndex: 1,
  pageSize: 10,
};

/**
 * 获取用户列表
 * @param：params
 * @return {{count: number, data: *[], pageIndex: number, pageSize: number}}
 */

export const $getUserList = async (params: object) => {
  // let res = await $get("admin/getUserList", params);
  return mockData;
}