<template>
  <div class="system-user">
    <div class="header">
      <el-form inline>
        <el-form-item label="用户名">
          <el-input v-model="searchForm.userName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="searchForm.userSex" placeholder="请输入性别" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.userPhone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="searchForm.userStatus" placeholder="请输入状态" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            查询
          </el-button>
          <el-button type="warning" @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="content-header">
        <el-button type="primary">
          新增用户
        </el-button>
      </div>
      <div class="content-table">
        <GTable v-bind="tableConfig">
          <template #operation="{ row }">
            <ActionBar :list="actionList" :data="row" @click="handleAction" />
          </template>
        </GTable>
      </div>
      <div class="content-pagination">
        <el-pagination
          v-model:current-page="searchForm.currentPage"
          v-model:page-size="searchForm.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
          @change="getTableData(false)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { GTableProps } from "@/components/GTable/types";
import type { ActionBarButton } from "@/components/ActionBar/types";

// 搜索表单数据
const searchForm = reactive({
  userName: "",
  userSex: "",
  userPhone: "",
  userStatus: "",
  currentPage: 1,
  pageSize: 10,
});
// 表格配置
const tableConfig = reactive<GTableProps>({
  loading: true,
  height: "100%",
  data: [],
  columns: [
    {
      title: "用户名称",
      field: "userName",
    },
    {
      title: "性别",
      field: "userSex",
    },
    {
      title: "手机号",
      field: "userPhone",
    },
    {
      title: "状态",
      field: "userStatus",
    },
    {
      title: "创建时间",
      field: "createTime",
    },
    {
      title: "操作",
      field: "operation",
      slots: { default: "operation" },
    },
  ],
});

const actionList: ActionBarButton[] = [
  { label: "编辑", value: "edit" },
  { label: "删除", value: "delete", confirm: "确定要删除该用户吗？" },
  { label: "禁用", value: "disable", confirm: "确定要禁用该用户吗？" },
  { label: "启用", value: "enable", confirm: "确定要启用该用户吗？" },
  { label: "重置密码", value: "resetPassword", confirm: "确定要重置该用户密码吗？" },
];

const handleAction = (value: string, data: any) => {
  console.log("点击了操作：", value, data);
};

// 搜索回调
const handleSearch = () => {
  getTableData();
};
// 重置回调
const handleReset = () => {
  searchForm.userName = "";
  searchForm.userSex = "";
  searchForm.userPhone = "";
  searchForm.userStatus = "";
  searchForm.currentPage = 1;
  handleSearch();
};

// 获取表格数据
const getTableData = (resetPage: boolean = true) => {
  if (resetPage) {
    searchForm.currentPage = 1;
  }
  // tableConfig.data = [];
  tableConfig.loading = true;
  // 模拟产生随机数据
  setTimeout(() => {
    tableConfig.data = Array.from({ length: 100 }, () => ({
      userName: `名称_${Math.random() * 100}`,
      userSex: `性别_${Math.random() * 100}`,
      userPhone: `手机号_${Math.random() * 100}`,
      userStatus: `状态_${Math.random() * 100}`,
      createTime: new Date().toLocaleString(),
      operation: "操作",
    }));
    tableConfig.loading = false;
  }, 500);
};

getTableData();
</script>

<style lang="less" scoped>
.system-user {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .header {
    flex: none;
    border-radius: 8px;
    padding: 16px 16px 0px;
    background-color: @color-bg;
    border: 1px solid @color-border;
  }
  .content {
    flex: 1;
    min-height: 0;
    border-radius: 8px;
    padding: 16px;
    background-color: @color-bg;
    border: 1px solid @color-border;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .content-header {
      flex: none;
      display: flex;
      justify-content: flex-end;
    }
    .content-table {
      flex: 1;
      min-height: 0;
    }
    .content-pagination {
      flex: none;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
