<template>
  <div class="set-pwd">
    <el-form size="small" ref="formRef" style="max-width: 600px" :model="formData" status-icon :rules="rules"
      label-width="80px">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input type="password" v-model="formData.oldPwd" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="formData.newPwd" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input type="password" v-model="formData.confirmPwd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">
          修改密码
        </el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElNotification, FormInstance, FormRules } from "element-plus";
import { $updatePassword } from "../../api/admin.ts";
import useUser from "../../store/user.ts";

// 用户信息
const userStore = useUser();
// 表单实例
const formRef = ref<FormInstance>();

// 表单数据
const formData = ref<{
  id: number | null;
  oldPwd: string;
  newPwd: string;
  confirmPwd: string;
}>({
  id: null,
  oldPwd: "",
  newPwd: "",
  confirmPwd: "",
});

// 验证原密码
const validateOldPwd = (_rule: any, value: string, callback: Function) => {
  if (!value) {
    return callback(new Error("请输入原密码"));
  }
  callback();
};

// 验证新密码
const validateNewPwd = (_rule: any, value: string, callback: Function) => {
  if (!value) {
    return callback(new Error("请输入新密码"));
  }
  if (value === formData.value.oldPwd) {
    return callback(new Error("新密码不能与原密码相同"));
  }
  callback();
};

// 验证确认密码
const validateConfirmPwd = (_rule: any, value: string, callback: Function) => {
  if (!value) {
    return callback(new Error("请输入确认密码"));
  }
  if (value !== formData.value.newPwd) {
    return callback(new Error("两次输入密码不一致"));
  }
  callback();
};

// 表单验证规则
const rules = ref<FormRules<typeof formData>>({
  oldPwd: [{ required: true, validator: validateOldPwd, trigger: "blur" }],
  newPwd: [{ required: true, validator: validateNewPwd, trigger: "blur" }],
  confirmPwd: [{ required: true, validator: validateConfirmPwd, trigger: "blur" }],
});

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      formData.value.id = userStore.user.id;
      let res = await $updatePassword({...formData.value});
      if (res.code === 200) {
        ElNotification({
          title: "提示",
          message: res.data.message,
          type: "success",
        });
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

// 关闭抽屉
const handleClose = () => {
  resetForm(formRef.value);
};

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  formData.value = {
    id: null,
    oldPwd: "",
    newPwd: "",
    confirmPwd: "",
  };
};
</script>

<style lang="scss">
.set-pwd {
  padding: 20px;
  width: 400px;
}
</style>