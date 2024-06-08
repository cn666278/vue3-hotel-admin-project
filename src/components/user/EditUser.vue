<template>
  <el-drawer
    size="30%"
    v-model="drawer"
    :title="formData.id ? '编辑用户' : '添加用户'"
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
      <el-form-item v-if="!formData.id" label="账号" prop="loginId">
        <el-input v-model="formData.loginId" />
      </el-form-item>
      <el-form-item v-if="!formData.id" label="密码" prop="password">
        <el-input type="password" v-model="formData.password" />
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" clearable />
      </el-form-item>
      <el-form-item label="头像" prop="photo">
        <el-upload
          class="avatar-uploader"
          :action="baseURL_dev + '/admin/uploadImg'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formData.photo" :src="formData.photo" class="avatar" />
          <!-- <img v-if="formData.photo" :src="baseURL_dev + 'upload/admin/' + formData.photo" class="avatar" /> -->
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
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
          {{ formData.id ? "编辑" : "添加" }}
        </el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import {
  FormInstance,
  FormRules,
  ElNotification,
  UploadProps,
} from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { $getRoleList } from "../../api/mockData/role.ts";
import { $addUser, $updateUser } from "../../api/admin.ts";
import { baseURL_dev } from "../../configure/baseURL.ts";

// 暴露事件, 用于同步列表数据, 在添加成功后调用, 通知父组件刷新列表
const emit = defineEmits(["update-user-list"]);

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
  id: null,
  loginId: null,
  roleId: null,
  username: "",
  password: "",
  photo: "",
  phone: "",
  email: "",
});

// 角色列表
const roleList: any = ref([]);

// 加载角色列表
const getRoleList = async () => {
  let res = await $getRoleList();
  console.log("加载角色列表");
  roleList.value = res;
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

// 邮箱验证
const validateEmail = (_: any, value: any, callback: any) => {
  if (value === "" || value === undefined) {
    callback(new Error("邮箱不能为空"));
  } else if (
    !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
  ) {
    callback(new Error("邮箱格式不正确"));
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
  email: [{ validator: validateEmail, required: true, trigger: "blur" }],
});

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      let res: any = {};
      if (formData.value.id) {
        // 编辑
        res = await $updateUser(formData.value);
      } else {
        // 添加
        console.log("添加用户");
        res = await $addUser(formData.value);
      }
      if (res.code === 200) {
        ElNotification({
          title: "提示",
          message: res.data.message,
          type: "success",
        });
        emit("update-user-list"); // 同步列表数据, 通知父组件刷新列表
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
    id: null,
    loginId: null,
    username: "",
    password: "",
    photo: "",
    phone: "",
    email: "",
    roleId: null,
  };
};

// 上传头像成功
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  console.log("上传头像成功");
  console.log(response);
  console.log(uploadFile);
  let { code } = response;
  if (code === 200) {
    ElNotification({
      title: "提示",
      message: "头像上传成功",
      type: "success",
    });
    // 获取图片地址
    // formData.value.photo = data.filename;

    // 使用图床模拟图片地址
    formData.value.photo =
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
  }
  // formData.value.photo = URL.createObjectURL(uploadFile.raw!);
};

// 头像上传之前
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  //图片格式
  let imgTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (!imgTypes.includes(rawFile.type)) {
    ElNotification({
      title: "提示",
      message: "上传头像图片只能是 JPG/PNG/GIF 格式!",
      type: "error",
    });
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElNotification({
      title: "提示",
      message: "上传头像图片大小不能超过 2MB!",
      type: "error",
    });
    return false;
  }
  return true;
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

<style lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
</style>
