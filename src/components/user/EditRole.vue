<template>
  <el-drawer
    size="30%"
    v-model="drawer"
    :title="formData.roleId ? '编辑角色' : '添加角色'"
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
        <el-input v-model="formData.roleName" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">
          {{ formData.roleId ? "编辑" : "添加" }}
        </el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import { FormInstance, FormRules, ElNotification } from "element-plus";
import { ref } from "vue";
import { $addRole, $updateRole } from "../../api/mockData/role.ts";

// 暴露事件, 用于同步列表数据, 在添加成功后调用, 通知父组件刷新列表
const emit = defineEmits(["update-role-list"]);

// 抽屉
const drawer = ref(false);

// 打开抽屉
const handleOpen = (row: any) => {
  drawer.value = true;
  formData.value = { ...row };
};

// 关闭抽屉
const handleClose = () => {
  drawer.value = false;
  resetForm(formRef.value);
};

// 表单实例
const formRef = ref<FormInstance>();

// 表单数据
// 使用ref而不是reactive, 因为ref可以通过.value直接获取值, 而reactive需要通过解构获取
const formData = ref({
  roleId: null,
  roleName: "",
});

// 验证角色名称
const validateRoleName = (_: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("角色名称不能为空"));
  } else {
    callback();
  }
};

// 表单验证
const rules = ref<FormRules<typeof formData>>({
  roleName: [{ required: true, validator: validateRoleName, trigger: "blur" }],
});

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      let res;
      if (formData.value.roleId) {
        // 编辑
        res = await $updateRole(formData.value);
      } else {
        // 添加
        res = await $addRole(formData.value);
      }
      if (res.code === 200) {
        ElNotification({
          title: "提示",
          message: res.data.message,
          type: "success",
        });
        emit("update-role-list"); // 同步列表数据
        handleClose(); // 关闭抽屉
        console.log("success submit!");
      } else {
        ElNotification({
          title: "提示",
          message: res.data.message,
          type: "error",
        });
        console.log("error submit!");
      }
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
  formData.value = {
    roleId: null,
    roleName: "",
  };
};

// 暴露数据
defineExpose({
  drawer,
  formData,
  handleOpen
});
</script>

<style lang="scss"></style>
