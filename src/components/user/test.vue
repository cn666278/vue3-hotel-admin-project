<!-- 用户管理 -->
<script setup lang="ts">
import { ref,onMounted } from 'vue'
import {getUserList,delUser}  from  '../../api/user'
import {getRoleList} from '../../api/role'
import { ElMessage,ElMessageBox } from 'element-plus'
import PublicTables from '../../components/PublicTables.vue'
import PublicPagination from '../../components/PublicPagination.vue'
import AddorEditDrawer from '../../components/user/AddorEditDrawer.vue'
// 用户信息列表
const userList = ref([])

//获取用户信息列表
const getUserData=async(page?:number,pageSize?:number,roleId?:number)=>{
  const res=await getUserList(page,pageSize,roleId)
  userList.value=res.data
  total.value=res.total
  
}
// 获取角色信息列表
const roleList=ref<any>([])
const roleOption=ref<any>('')
const getRole=async ()=>{
  await getRoleList().then((res)=>{
    roleList.value=res.data
    
  })
}
onMounted(()=>{
  getUserData()
  getRole()
})
//  分页总数
const total=ref(0)
// 接收分页子组件传过来的数据--current-page 改变时触发
const fetchData=(obj:any)=>{
  getUserData(obj.page,obj.pageSize)
}
//定义编辑组件ref对象--通过AddorEditRef可以获取组件暴露的实例对象
let AddorEditRef=ref()
// 新增
const addUser=()=>{
  // 通过ref调用子组件暴露出来的方法
  AddorEditRef.value.open({})
}
//编辑
const handleEdit=(row:any)=>{
  // 打开编辑抽屉时，使用深拷贝克隆表格数据到编辑表单中
  const editForm =JSON.parse(JSON.stringify(row))
  // 通过ref调用子组件暴露出来的方法
  AddorEditRef.value.open(editForm)
}
//删除
const handleDelete=async (id:any)=>{
  
  ElMessageBox.confirm(
    '确定要删除吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await delUser(id).then(()=>{
        ElMessage.success('删除成功')
        pageRef.value.handleEdit()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
    }
  )
}
// 触发分页的ref
const pageRef=ref()
// 接收子组件传过来的数据--触发添加编辑成功后的回调
const onSuccess=(type:string)=>{
  if(type==='add'){
    pageRef.value.handleChange()

  }else{
    pageRef.value.handleEdit()
  }
}
// 根据roleId查询
const queryUser=()=>{
  getUserData(1,5,roleOption.value)
}
// 重置功能
const resetting=()=>{
  roleOption.value=''
  getUserData()
}
</script>

<template>
  <el-scrollbar height="100%" style="padding: 20px;">
      <!-- 添加按钮 -->
  <div style="display: flex; justify-content: space-between;">
    <el-button type="primary" plain style="margin-bottom: 20px;" @click="addUser">添加</el-button>
    <div>
      <el-select v-model="roleOption" clearable placeholder="请选择角色" style="margin-bottom: 20px; margin-right: 20px;" >
        <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
      </el-select>
      <el-button type="success" plain style="margin-bottom: 20px;" @click="queryUser">查询</el-button>
      <el-button type="warning" plain style="margin-bottom: 20px;" @click="resetting">重置</el-button>
    </div>
  </div>
  <!-- 抽屉 -->
  <AddorEditDrawer ref="AddorEditRef" @success="onSuccess"></AddorEditDrawer>
  <!-- 表格 -->
  <PublicTables :tableData="userList">
    <template #tableColumns>
      <el-table-column label="编号" width="120px" align="center" type="index" />
      <el-table-column label="账号" align="center" prop="username" />
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="头像" align="center">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.userPic "
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center" prop="phone" />
      <el-table-column label="角色" align="center" prop="role.roleName" />
    </template>
    <!-- 操作区域 -->
    <template #operate>
      <el-table-column label="编辑" align="center">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
    </template>
  </PublicTables>
  <!-- 分页 -->
  <PublicPagination  ref="pageRef" :total="total" @paginAtion="fetchData"></PublicPagination>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>