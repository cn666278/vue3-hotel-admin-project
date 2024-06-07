<template>
  <div class="user">
    <!-- 添加按钮 -->
    <div class="addButton">
      <el-button
        type="primary"
        size="small"
        @click="editDrawerRef.handleOpen()"
      >
        添加</el-button
      >
    </div>
    <!-- 用户表格 -->
    <el-table :data="userList" stripe style="width: 100%" :key="isUpdate.toString()">
      <el-table-column prop="id" label="编号" width="100" />
      <el-table-column prop="loginId" label="账号" width="150" />
      <el-table-column prop="username" label="姓名" width="100" />
      <el-table-column prop="photo" label="头像" width="100" >
        <template #default="scope">
          <el-avatar v-if="scope.row.photo" :size="40" :src="scope.row.photo" fit="cover"/>
          <el-avatar v-else :size="40" src="https://s2.loli.net/2024/06/07/pngIsY8GxMOArz7.png" fit="cover"/>
        </template>
        </el-table-column>

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
    <!-- 编辑用户抽屉 -->
    <EditUser ref="editDrawerRef" @update-user-list="getUserList"/>
  </div>
</template>

<script setup lang="ts">
import EditUser from "../../components/user/EditUser.vue";
import { onMounted, ref } from "vue";
import { $getUserList } from "../../api/admin.ts";
import { ElMessageBox } from "element-plus";

// 用户列表
let userList = ref<any>([]);

let total = ref(0);

// 用于刷新表格数据,
// 当用户列表数据发生变化时, 修改该值, 绑定表格key, 触发表格更新
let isUpdate = ref(false);

// 加载用户列表
const getUserList = async () => {
  console.log("加载用户列表");
  let { data, count } = await $getUserList({});
  userList.value = data;
  total.value = count;
  isUpdate.value = !isUpdate.value; // 触发表格更新
};

// 编辑角色
const handleEdit = async (row: any) => {
  console.log("编辑用户", row);
};

// 删除角色
const handleDelete = (row: any) => {
  ElMessageBox.confirm("确定删除用户 " + row.roleName + " 吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  });
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

// 定义编辑组件ref,通过editDrawerRef可以获取组件暴露的实例对象
const editDrawerRef = ref();

// 页面加载时加载用户列表
onMounted(() => {
  getUserList();
});
</script>

<style lang="scss">
.addButton {
  margin-bottom: 20px;
}
.--el-avatar-bg-color{
  color: red;
}
</style>
