<template>
  <div class="system-role">
    <div class="header">
      <el-form inline>
        <el-form-item label="角色名称">
          <el-input v-model="searchForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="searchForm.roleCode" placeholder="请输入角色编码" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="searchForm.roleDesc" placeholder="请输入角色描述" />
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
          新增角色
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
  roleName: "",
  roleCode: "",
  roleDesc: "",
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
      title: "角色名称",
      field: "roleName",
    },
    {
      title: "角色编码",
      field: "roleCode",
    },
    {
      title: "角色描述",
      field: "roleDesc",
    },
    {
      title: "操作",
      field: "action",
      width: 200,
      slots: {
        default: "operation",
      },
    },
  ],
});

const actionList: ActionBarButton[] = [
  { label: "编辑", value: "edit" },
  { label: "删除", value: "delete", confirm: "确定要删除该角色吗？" },
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
  searchForm.roleName = "";
  searchForm.roleName = "";
  searchForm.roleDesc = "";
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
    tableConfig.data = Array.from({ length: searchForm.pageSize }, () => ({
      roleName: `角色名称_${Math.random() * 100}`,
      roleCode: `ROLE_${Math.random() * 100}`,
      roleDesc: `角色描述_${Math.random() * 100}`,
    }));
    tableConfig.loading = false;
  }, 500);
};

getTableData();
</script>

<style lang="less" scoped>
.system-role {
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
