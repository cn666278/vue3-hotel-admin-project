<template>
  <div class="role">
    <div class="addButton">
      <el-button
        type="primary"
        size="small"
        @click="editDrawerRef.handleOpen()"
      >
        添加</el-button
      >
    </div>
    <!-- 角色表格 -->
    <el-table :data="roleList" stripe style="width: 100%" :key="isUpdate.toString()">
      <el-table-column prop="roleId" label="ID" width="100" />
      <el-table-column prop="roleName" label="角色名称" width="250" />
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
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 5px"
      background
      layout="prev, pager, next"
      :total="total"
      v-model:current-page="pageIndex"
      :default-page-size="pageSize"
      @current-change="getRoleList"
    />
    <EditRole ref="editDrawerRef" @update-role-list="getRoleList"></EditRole>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import EditRole from "../../components/user/EditRole.vue";
import {
  $getRoleList,
  $deleteRole,
  $getSingleRole,
} from "../../api/mockData/role.ts";
import { ElMessageBox, ElNotification } from "element-plus";

// 角色列表
let roleList = ref([]);
// 分页
let pageIndex = ref(1);
let pageSize = ref(1);
let total = ref(0);
// 用于刷新表格数据
let isUpdate = ref(false);

// 加载角色列表
const getRoleList = async () => {
  console.log("加载角色列表");
  let { data, count } = await $getRoleList({
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
  });
  roleList.value = data;
  total.value = count;
  isUpdate.value = !isUpdate.value; // 触发表格更新
};

// 编辑角色
const handleEdit = async (row: any) => {
  let res = await $getSingleRole(row.roleId);
  editDrawerRef.value.handleOpen(res); // 解决方法
  // 此处为bug: 思考为什么调用handleOpen方法时, formData的值绑定更新到formData, 并且导致重置表单时formData的值保持为上一个值
  // editDrawerRef.value.formData = res;
  // editDrawerRef.value.drawer = true;
};

// 删除角色
const handleDelete = (row: any) => {
  ElMessageBox.confirm("确定删除用户 " + row.roleName + " 吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await $deleteRole(row.roleId);
      if (res.code === 200) {
        ElNotification({
          title: "提示",
          message: res.message,
          type: "success",
        });
        // 删除成功后重新加载角色列表
        getRoleList();
        console.log("删除成功");
      } else {
        ElNotification({
          title: "提示",
          message: res.message,
          type: "error",
        });
      }
    })
    .catch(() => {
      console.log("取消删除");
    });
};

// 定义编辑组件ref,通过editDrawerRef可以获取组件暴露的实例对象
const editDrawerRef = ref();

// 组件挂载时加载角色列表
onMounted(() => {
  getRoleList();
});
</script>

<style lang="scss">
.addButton {
  margin-bottom: 20px;
}
</style>
