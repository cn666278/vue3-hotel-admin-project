<template>
  <div class="room-type">
    <div class="addButton">
      <!-- 查询按钮 -->
      <!-- <span style="color: grey; font-size: 13px">角色：</span> -->
      <!-- <el-select size="small" v-model="roleId" placeholder="请选择角色" style="width: 240px; margin-right: 10px">
        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
      </el-select>
      <el-button type="success" size="small" @click="getUserList">
        查询</el-button> -->
      <!-- 添加按钮 -->
      <el-button type="primary" size="small" @click="editDrawerRef.handleOpen()">
        添加</el-button>
    </div>
    <!-- 房间类型表格 -->
    <el-table :data="showRoomTypes" stripe style="width: 100%" :key="isUpdate.toString()">
      <el-table-column prop="id" label="房间编号" width="100" />
      <el-table-column prop="roomTypeName" label="房间类型" width="120" />
      <el-table-column prop="roomTypePrice" label="房间价格" width="120" />
      <el-table-column prop="roomTypeArea" label="房间面积" width="120" />
      <el-table-column prop="roomTypeBed" label="床大小" width="120" />
      <el-table-column prop="roomTypeWindow" label="是否含窗" width="120" />
      <el-table-column prop="roomTypeDesc" label="房间描述" width="150" />
      <el-table-column prop="photo" label="房间预览" width="100">
        <template #default="scope">
          <el-avatar v-if="scope.row.photo" :size="40" :src="scope.row.photo" fit="cover" />
          <el-avatar v-else :size="40" src="https://s2.loli.net/2024/06/07/pngIsY8GxMOArz7.png" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row.id)">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination style="margin-top: 5px" background layout="prev, pager, next" :total="roomTypeList.length"
      v-model:current-page="pageIndex" :default-page-size="pageSize" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { $getRoomTypeList } from '../../api/roomType'
import { computed, onMounted, ref } from 'vue'

// 用于刷新表格数据,
// 当用户列表数据发生变化时, 修改该值, 绑定表格key, 触发表格更新
let isUpdate = ref(false);

const roomTypeList = ref<any>([])

// 分页
let pageIndex = ref(1);
let pageSize = ref(5);

// 分页改变事件
const handleCurrentChange = (val: number) => {
  pageIndex.value = val;
};

// 获取所有房型
const showRoomTypes = computed(() => {
  isUpdate.value = !isUpdate.value; // update role list
  const start = (pageIndex.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return roomTypeList.value.slice(start, end);
});

// 加载房间类型列表
const getRoomTypeList = async () => {
  console.log("加载用户列表");
  let { data } = await $getRoomTypeList();
  roomTypeList.value = data;
};

// 定义编辑组件ref,通过editDrawerRef可以获取组件暴露的实例对象
const editDrawerRef = ref();

// 编辑方法
const handleEdit = (loginId: string) => {
  editDrawerRef.value.handleOpen(loginId);
};

// 删除方法
const handleDelete = (row: any) => {
  ElMessageBox.confirm("确定删除该房间吗?", "提示", {
    type: "warning",
  }).then(() => {
    console.log("删除用户", row);
  });
};


onMounted(() => {
  getRoomTypeList()
})
</script>

<style lang="scss">
.addButton {
  margin-bottom: 20px;
}

.--el-avatar-bg-color {
  color: red;
}
</style>