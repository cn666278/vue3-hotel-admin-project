<template>
  <div class="login">
    <div class="box">
      <h2>SM酒店信息管理平台</h2>
      <el-form
        size="small"
        ref="formRef"
        style="max-width: 600px"
        :model="formData"
        status-icon
        :rules="rules"
        label-width="40px"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">
            登陆
          </el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { $Login, $getUserInfo } from "../api/admin.ts";
import { useRouter } from "vue-router";
import useUser from "../store/user.ts";

// 路由实例
const router = useRouter();

// 获取用户全局状态
const userStore = useUser();

// 定义表单实例
const formRef = ref<FormInstance>();

// 验证账号
const validateUsername = (_: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    callback();
  }
};

// 验证密码
const validatePassword = (_: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

// 表单数据
const formData = reactive({
  username: "",
  password: "",
});

// 验证对象
const rules = reactive<FormRules<typeof formData>>({
  username: [{ validator: validateUsername, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
});

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let res = await $Login(formData)
      if( res.code == 200 ) {
        let user = await $getUserInfo({username: formData.username})
        console.log(user)
        userStore.setUser(user)
        console.log('login success')
        // 跳转到首页
        router.push('/main')
      } else {
        console.log('login failed')
      }
    } else {
      console.log('error submit!')
      // return false
    }
  })
}

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 检查用户是否登录, 如果已经登录则跳转到首页
onMounted(() => {
  if (userStore.user.username) {
    router.push("/main");
  }
})
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #142334, #6894c7);
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 600px;
    border-radius: 10px;
    border: 1px solid #fff;
    padding: 20px;
    h2 {
      color: #fff;
      font-size: 20px;
      text-align: center;
      margin-bottom: 20px;
    }
    :deep(.el-form-item__label) {
      color: #fff;
    }
  }
}
</style>
