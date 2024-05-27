<template>
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
          添加
        </el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";

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

// 暴露抽屉数据
defineExpose({
  drawer,
});
</script>

<style lang="scss"></style>
