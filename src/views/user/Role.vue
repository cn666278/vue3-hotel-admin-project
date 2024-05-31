<template>
  <div class="role">
    <div class="search">
      <el-button
        type="primary"
        size="small"
        @click="editDrawerRef.drawer = true"
      >
        添加</el-button
      >
    </div>
    <el-table :data="showRoles" stripe style="width: 100%">
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
    <el-pagination
      style="margin-top: 5px"
      background
      layout="prev, pager, next"
      :total="roles.length"
      @current-change="handleCurrentChange"
    />
    <EditRole ref="editDrawerRef" @update-role-list="loadRoles"></EditRole>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import EditRole from "../../components/user/EditRole.vue";
import { $list, $deleteRole, $getSingleRole } from "../../api/role.ts";
import { ElMessageBox, ElNotification } from "element-plus";

// 角色列表
let roles = ref<any[]>([]);
// 分页
let pageIndex = ref(1);
// 显示的角色列表
let showRoles = computed(() => {
  return roles.value.slice((pageIndex.value - 1) * 10, pageIndex.value * 10);
});

// 分页改变事件
const handleCurrentChange = (val: number) => {
  pageIndex.value = val;
};

// 加载角色列表
const loadRoles = async () => {
  roles.value = await $list();
};

// 编辑角色
const handleEdit = async (row: any) => {
  let res = await $getSingleRole(row.roleId);
  editDrawerRef.value.formData = res;
  editDrawerRef.value.drawer = true;
};

// 删除角色
const handleDelete = (row: any) => {
  console.log(row);
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
          message: res.data.message,
          type: "success",
        });
        // 删除成功后重新加载角色列表
        loadRoles();
        console.log("删除成功");
      } else {
        ElNotification({
          title: "提示",
          message: res.data.message,
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

onMounted(() => {
  loadRoles();
});
</script>

<style lang="scss">
.search {
  margin-bottom: 20px;
}
</style>
