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
  } else {
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
};

// 模拟数据
let mockData = {
  count: 1,
  data: [
    {
      id: 1,
      loginId: "super-admin",
      username: "超级管理员",
      password: "21232f297a57a5a743894a0e4a801fc3",
      phone: "10086",
      email: "123@gmail.com",
      photo: "https://s2.loli.net/2024/06/07/hjc65p2HRtKYFbG.png",
      role: { roleId: 1, roleName: "超级管理员" },
      roleId: 1,
    },
    {
      id: 2,
      loginId: "admin",
      username: "管理员",
      password: "21232f297a57a5a743894a0e4a801fc3",
      phone: "10086",
      email: "stu@163.edu.com",
      photo: "https://s2.loli.net/2024/06/07/fID2KtWhqJoMrAH.png",
      role: { roleId: 2, roleName: "管理员" },
      roleId: 2,
    },
    {
      id: 3,
      loginId: "user",
      username: "普通用户",
      password: "21232f297a57a5a743894a0e4a801fc3",
      phone: "10086",
      email: "helloworld@cf.ac.uk",
      photo: "https://s2.loli.net/2024/06/07/avPj6oe9tDyOkmn.png",
      role: { roleId: 3, roleName: "普通用户" },
      roleId: 3,
    },
  ],
  pageIndex: 1,
  pageSize: 10,
};

/**
 * 通过loginId获取一个用户的信息
 * @param
 * @return user
 */

export const $getUserByLoginId = async (loginId: string) => {
  const user = mockData.data.find((user) => user.loginId === loginId);
  return user;
};

/**
 * 获取用户列表
 * @param：{ roleId: 角色编号（默认为0）, pageIndex：当前页（默认为1）, pageSize：每页显示数据条数（默认为10） }
 * @return {{count: number, data: *[], pageIndex: number, pageSize: number}}
 */
export const $getUserList = async (params: {
  pageIndex: number;
  pageSize: number;
  roleId: number;
}) => {
  const { pageIndex, pageSize, roleId } = params;
  const start = (pageIndex - 1) * pageSize;
  const end = start + pageSize;
  let userList = mockData.data;
  // 对userList查询当前roleId (默认roleId为0表示全查)
  if (roleId != 0) {
    userList = userList.filter((user) => user.roleId === roleId);
  }
  // 分页
  userList = userList.slice(start, end);

  return {
    count: mockData.data.length,
    data: userList,
    pageIndex,
    pageSize,
  };
};

// 添加用户
export const $addUser = async (params: any) => {
  // let res = await $post("admin/addUser", params);
  console.log(params);
  // 添加id,防止重复
  params.id = mockData.data[mockData.data.length - 1].id + 1;
  // 对密码进行md5加密
  params.password = md5(
    md5(params.password, 32).split("").reverse().join(""),
    32
  );
  //判断roleName
  if (params.roleId == 1) {
    params.role = { roleId: 1, roleName: "超级管理员" };
  } else if (params.roleId == 2) {
    params.role = { roleId: 2, roleName: "管理员" };
  } else {
    params.role = { roleId: 3, roleName: "普通用户" };
  }

  mockData.data.push({
    ...params,
  });
  console.log(mockData);
  return {
    code: 200,
    data: {
      message: "添加成功",
    },
  };
};

/**
 * 修改用户
 * @param id, username, phone, email, photo, roleId
 * @return {{code: number, data: {message: string}}}
 */
export const $updateUser = async (params: {
  id: number | any;
  roleId: number | any;
  username: string;
  phone: string;
  email: string;
  photo: string;
}) => {
  // let res = await $post("admin/updateUser", params);
  const { id, username, phone, email, photo, roleId } = params;
  //判断roleName
  let roleName = "";
  if (roleId == 1) {
    roleName = "超级管理员";
  } else if (roleId == 2) {
    roleName = "管理员";
  } else {
    roleName = "普通用户";
  }
  mockData.data = mockData.data.map((user) => {
    if (user.id === id) {
      return {
        ...user,
        username,
        phone,
        email,
        photo,
        roleId,
        role: { roleId, roleName },
      };
    }
    return user;
  });
  return {
    code: 200,
    data: {
      message: "修改成功",
    },
  };
};

/**
 * 删除用户
 * @param id
 * @return {{code: number, data: {message: string}}}
 */
export const $deleteUser = async (id: number) => {
  // let res = await $post("admin/deleteUser", { id });
  mockData.data = mockData.data.filter((user) => user.id !== id);
  return {
    code: 200,
    data: {
      message: "删除成功",
    },
  };
};
