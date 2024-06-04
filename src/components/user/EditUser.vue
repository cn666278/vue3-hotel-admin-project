<template>
  <el-drawer
    size="30%"
    v-model="drawer"
    :title="formData.loginId ? '编辑用户' : '添加用户'"
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
      <el-form-item label="账号" prop="loginId">
        <el-input v-model="formData.loginId" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" />
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" clearable />
      </el-form-item>
      <el-form-item label="头像" prop="photo">
        <el-input v-model="formData.photo" clearable />
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select
          v-model="formData.roleId"
          placeholder="请选择角色"
          style="width: 240px"
        >
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="formData.phone" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" clearable />
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
import { onMounted, ref } from "vue";
import {
  $addRole,
  $updateRole,
  $getRoleList,
} from "../../api/mockData/role.ts";

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
  loginId: null,
  username: "",
  password: "",
  photo: "",
  phone: "",
  email: "",
  roleId: null,
});

// 角色列表
const roleList: any = ref([]);

// 加载角色列表
const getRoleList = async () => {
  let res = await $getRoleList();
  console.log("加载角色列表", res);
  roleList.value = res;
  console.log("roleList", roleList.value);
};

// 验证账号
const validateLoginId = (_: any, value: any, callback: any) => {
  if (value === "" || value === undefined) {
    callback(new Error("角色名称不能为空"));
  } else {
    callback();
  }
};

// 验证密码
const validatePassword = (_: any, value: any, callback: any) => {
  if (value === "" || value === undefined) {
    callback(new Error("密码不能为空"));
  } else if (value.length < 6) {
    callback(new Error("密码长度不能小于6位"));
  } else if (value.length > 20) {
    callback(new Error("密码长度不能大于20位"));
  } else {
    callback();
  }
};

// 表单验证
const rules = ref<FormRules<typeof formData>>({
  loginId: [{ validator: validateLoginId, required: true, trigger: "blur" }],
  password: [{ validator: validatePassword, required: true, trigger: "blur" }],
  username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
  phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
});

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      let res;
      if (formData.value.roleId) {
        // 编辑
        // res = await $updateRole(formData.value);
      } else {
        // 添加
        // res = await $addRole(formData.value);
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
    loginId: null,
    username: "",
    password: "",
    photo: "",
    phone: "",
    email: "",
    roleId: null,
  };
};

// 页面加载时加载角色列表
onMounted(() => {
  getRoleList();
});

// 暴露数据
defineExpose({
  drawer,
  formData,
  handleOpen,
});
</script>

<style lang="scss"></style>
