<template>
  <div class="role">
    <el-table :data="roles" stripe style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="100" />
      <el-table-column prop="roleName" label="身份" width="250" />
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
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

onMounted(() => {
  loadRoles();
});
</script>

<style lang="scss"></style>
