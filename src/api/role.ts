import { $get, $post } from "../utils/request.ts";
import Mock from 'mockjs'

/*
* 使用apifox数据
*/ 

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

/* 
* 本地模拟后端数据
*/

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url: string) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

let List: any[] = []

// 模拟数据
// const count = 200

// for (let i = 0; i < count; i++) {
//   List.push(
//     Mock.mock({
//       id: Mock.Random.guid(),
//       roleName: Mock.Random.cname(),
//     })
//   )
// }

export default {
  /**
   * 获取角色列表
   * 要带参数 roleName, page, limit; roleName可以不填, page, limit有默认值。
   * @param roleName, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getRoleList: (config: { url: any; }) => {
    const { roleName, page = 1, limit = 20 } = param2Obj(config.url)
    const mockList = List.filter(role => {
      if (roleName && role.roleName.indexOf(roleName) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        list: pageList,
        count: mockList.length,
      }
    }
  },
  /**
   * 增加用户
   * @param roleName
   * @return {{code: number, data: {message: string}}}
   */
  addRole: (config: { body: string; }) => {
    const { roleName } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      roleName: roleName,
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteRole: (config: { url: any; }) => {
    const { id } = param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '需要提供用户id'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },
  /**
   * 批量删除 
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: (config: { url: any; }) => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 20000,
      data: {
        message: 'Batch Remove Success'
      }
    }
  },
  /**
   * 修改用户
   * @param id, roleName
   * @return {{code: number, data: {message: string}}}
   */
  updateRole: (config: { body: string; }) => {
    const { id, roleName } = JSON.parse(config.body)
    List.some(u => {
      if (u.id === id) {
        u.roleName = roleName
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }
}