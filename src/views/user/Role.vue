<template>
  <div class="role">
    <div class="search">
      <el-button type="primary" size="small" @click="drawer = true"
        >添加</el-button
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
    <el-drawer
      size="30%"
      v-model="drawer"
      title="添加角色"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-form
        size="small"
        ref="formRef"
        style="max-width: 600px"
        :model="formData"
        status-icon
        :rules="rules"
        label-width="70px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="formData.roleName" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">
            提交
          </el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { FormInstance, FormRules } from "element-plus";
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

// 抽屉
const drawer = ref(false);

// 关闭抽屉
const handleClose = () => {
  drawer.value = false;
  formRef.value?.resetFields(); // 重置表单
};

// 表单实例
const formRef = ref<FormInstance>();

// 表单数据
const formData = reactive({
  roleName: "",
});

// 验证角色名称
const validateRoleName = (_: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入角色名称"));
  } else {
    callback();
  }
};

// 表单验证
const rules = reactive<FormRules<typeof formData>>({
  roleName: [{ required: true, validator: validateRoleName, trigger: "blur" }],
});

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
    } else {
      console.log("error submit!");
      // return false;
    }
  });
};

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

onMounted(() => {
  loadRoles();
});
</script>

<style lang="scss">
.search {
  margin-bottom: 20px;
}
</style>
