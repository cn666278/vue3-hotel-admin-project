<template>
  <div class="user">
    <!-- 用户表格 -->
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="100" />
      <el-table-column prop="loginId" label="账号" width="150" />
      <el-table-column prop="username" label="姓名" width="100" />
      <el-table-column prop="photo" label="头像" width="100" />
      <el-table-column prop="phone" label="电话" width="200" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="role.roleName" label="角色" width="150" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { $getUserList } from "../../api/admin.ts";
import { ElMessageBox } from "element-plus";

// 用户列表
let userList: any = ref([]);

let total = ref(0);

// 加载用户列表
const getUserList = async () => {
  console.log("加载用户列表");
  let { data, count } = await $getUserList({});
  userList.value = data;
  total.value = count;
  console.log(userList.value);
  console.log(count);
};

// 编辑角色
const handleEdit = async (row: any) => {

};

// 删除角色
const handleDelete = (row: any) => {
  ElMessageBox.confirm("确定删除用户 " + row.roleName + " 吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    // .then(async () => {
    //   // let res = await $deleteRole(row.roleId);
    //   if (res.code === 200) {
    //     ElNotification({
    //       title: "提示",
    //       message: res.message,
    //       type: "success",
    //     });
    //     // 删除成功后重新加载角色列表
    //     getRoleList();
    //     console.log("删除成功");
    //   } else {
    //     ElNotification({
    //       title: "提示",
    //       message: res.message,
    //       type: "error",
    //     });
    //   }
    // })
    // .catch(() => {
    //   console.log("取消删除");
    // });
};

// 页面加载时加载用户列表
onMounted(() => {
  getUserList();
});
</script>

<style lang="scss"></style>
