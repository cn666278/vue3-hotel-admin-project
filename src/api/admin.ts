import { $post } from "../utils/request.ts";
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
