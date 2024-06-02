import Mock from "mockjs";

/*
 * 使用apifox数据
 */

// 模拟数据
let List: any = [];
const count = 200;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      roleId: i + 1,
      roleName: Mock.Random.cname(),
    })
  );
}

// 初始化数据，模拟200条数据
// todo: 数据持久化

/**
 * 获取角色列表
 * @param
 * @return {{code: number, count: number, data: *[]}}
 */
export const $getRoleList = () => {
  // let res = await $get("/role/list");
  return List;
};

// 获取单个角色
export const $getSingleRole = async (id: number) => {
  // let res = await $get("/role/getSingleRole", params);
  const currentUser = List.find((user: any) => user.roleId === id);
  console.log(currentUser);
  return currentUser;
};

/**
 * 修改角色
 * @param roleId, roleName
 * @return {{code: number, data: {message: string}}}
 */
// todo: bug1: 修改角色时，如果roleName重复，应该导致修改失败
// todo: bug2: 修改角色时，如果此时关闭弹窗，用户名直接消失
export const $updateRole = async (params: {
  roleId: any;
  roleName: string;
}) => {
  // let res = await $post("/role/updateRole", params);
  const { roleId, roleName } = params;

  // Check if roleName already exists
  const isRoleNameExists = List.some(
    (role: any) => role.roleName == roleName && role.roleId !== roleId
  );
  console.log(roleName);
  if (isRoleNameExists) {
    return {
      code: -1,
      data: {
        message: "角色名已存在，修改失败",
      },
    };
  }
  List = List.map((role: any) => {
    if (role.roleId === roleId) {
      return {
        roleId: roleId, // 为了不丢失其他数据, 展开原有的数据
        roleName: roleName, // 更新roleName
      };
    }
    return role;
  });
  return {
    code: 200,
    data: {
      message: "编辑成功",
    },
  };
};

/**
 * 增加角色
 * @param roleId, roleName
 * @return {{code: number, data: {message: string}}}
 */
export const $addRole = async (params: { roleId: any; roleName: string }) => {
  // let res = await $post("/role/addRole", params);
  // return res;
  const { roleName } = params;
  // 从List中获取最大的roleId,防止重复
  const maxRoleId = List.reduce((maxId: number, role: any) => {
    return Math.max(maxId, role.roleId);
  }, 0);
  const newRoleId = maxRoleId + 1;
  // 添加到List尾部中, 如果需要插到头部，可以使用unshift
  // todo: bug: 但是要注意页面不会刷新，因为没有触发getRoleList()?
  List.push({
    roleId: newRoleId,
    roleName: roleName,
  });
  return {
    code: 200,
    data: {
      message: "添加成功",
    },
  };
};

/**
 * 删除角色
 * @param id
 * @return {*}
 */
export const $deleteRole = async (id: number) => {
  // let res = await $post("/role/deleteRole", params);
  if (!id) {
    return {
      code: -999,
      message: "需要提供用户id",
    };
  } else {
    List = List.filter((role: any) => role.roleId !== id);
    return {
      code: 200,
      message: "删除成功",
    };
  }
};

/**
 * 批量删除
 * @param config
 * @return {{code: number, data: {message: string}}}
 */
export const $batchremove = async (ids: string) => {
  // let res = await $post("/role/batchremove", params);
  ids = ids.split(",")[0];
  List = List.filter((role: any) => !ids.includes(role.roleId));
  return {
    code: 20000,
    data: {
      message: "Batch Remove Success",
    },
  };
};
