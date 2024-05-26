<template>
  <div class="main">
    <div class="left">
      <h2>SM酒店管理综合平台</h2>
      <el-menu
        router
        active-text-color="#ffd04b"
        background-color="#142334"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Avatar /></el-icon>
            <span>账户管理</span>
          </template>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/user">用户管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Histogram /></el-icon>
            <span>客房管理</span>
          </template>
          <el-menu-item index="/room-type">房型管理</el-menu-item>
          <el-menu-item index="/room">房间管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Briefcase /></el-icon>
            <span>客户管理</span>
          </template>
          <el-menu-item index="/check-in">入住管理</el-menu-item>
          <el-menu-item index="/order">客户订单</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><Tools /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/menu">菜单管理</el-menu-item>
          <el-menu-item index="/dictionary">字典管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="right">
      <div class="top">
        <el-menu
          router
          mode="horizontal"
          background-color="#142334"
          text-color="#fff"
          active-text-color="#ffd04b"
          :ellipsis="false"
        >
          <el-menu-item index="/home">
            <el-icon><House /></el-icon>
            首页
          </el-menu-item>
          <el-menu-item index="/mail">
            <el-icon><Message /></el-icon>
            邮件
          </el-menu-item>
          <el-menu-item index="/message">
            <el-icon><ChatDotRound /></el-icon>
            消息
          </el-menu-item>
          <el-sub-menu index="admin">
            <template #title>
              <el-icon><User /></el-icon>
              管理员
            </template>
            <el-menu-item index="/personal">个人中心</el-menu-item>
            <el-menu-item index="/set-password">修改密码</el-menu-item>
            <el-menu-item index="">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="content">
        <!-- 添加路由出口，通过路由渲染组件 -->
        <router-view></router-view> 
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  House,
  Briefcase,
  Tools,
  Histogram,
  Message,
  ChatDotRound,
  Avatar,
  User,
} from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import useUser from "../store/user.ts";

let userStore = useUser();
let router = useRouter();

// 检查用户是否登录, 如果没有登录则跳转到登录页面
onMounted(() => {
  console.log(userStore.user.username);
  if(!userStore.user.username){
    router.push('/');
  }
});

</script>
<style lang="scss">
// todo:考虑把header, left, right, footer抽离成组件
.main {
  width: 100vw; // 100% of the viewport width
  height: 100vh;
  display: flex;
  .left {
    width: 200px;
    background-color: #142334;
    color: white;
    .el-menu {
      // 去除右侧边框
      border-right: none;
    }
    h2 {
      font-size: 16px;
      text-align: center;
      height: 60px;
      line-height: 60px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .top {
      height: 60px;
      background-color: #142334;
      color: white;
      display: flex;
      justify-content: flex-end;
      .el-menu {
        // 去除下侧边框
        border-bottom: none;
      }
    }
    .content {
      flex: 1;
      background-color: white;
      padding: 10px;
    }
  }
}
</style>
