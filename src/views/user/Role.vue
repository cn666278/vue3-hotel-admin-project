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
    <el-table :data="roles" stripe style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="100" />
      <el-table-column prop="roleName" label="角色名称" width="250" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row.roleId)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.roleId)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditRole ref="editDrawerRef" @update-role-list="loadRoles"></EditRole>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import EditRole from "../../components/user/EditRole.vue";
import { $list } from "../../api/role.ts";

// 角色列表
let roles = ref([]);

// 加载角色列表
const loadRoles = async () => {
  roles.value = await $list();
};

// 编辑角色
const handleEdit = (roleId: number) => {
  console.log(roleId);
};

// 删除角色
const handleDelete = (roleId: number) => {
  console.log(roleId);
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
