<template>
  <div class="g-table" :style="{ height: fillParentHeight ? '100%' : '' }">
    <VxeGrid
      v-bind="$attrs"
      ref="vxeTableRef"
      :loading="loading"
      :height="height"
      :columns="_columns"
      :data="data"
      :column-config="_columnConfig"
      :row-config="_rowConfig"
      :sort-config="_sortConfig"
      :filter-config="_filterConfig"
      :checkbox-config="checkboxConfig"
      :min-height="minHeight"
      :stripe="stripe"
      :border="border"
      :round="round"
    >
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
      <template #loading>
        <g-loading vertical-center />
      </template>
      <template #checkboxHeader="{ checked, indeterminate, disabled }">
        <el-checkbox
          :checked="checked"
          :indeterminate="indeterminate"
          :disabled="disabled"
          @change="handleToggleAllCheckbox(checked)"
        />
      </template>
      <template #checkboxBody="{ row, checked, indeterminate, disabled, visible }">
        <el-checkbox
          v-if="visible"
          :checked="checked"
          :indeterminate="indeterminate"
          :disabled="disabled"
          @change="handleToggleCheckbox(checked, row)"
        />
      </template>
      <template v-for="name in Object.keys($slots)" #[name]="scoped">
        <slot :name="name" v-bind="scoped" />
      </template>
    </VxeGrid>
  </div>
</template>

<script setup lang="ts">
import { VxeGrid } from "vxe-table";
import { computed, ref, watch } from "vue";
import type { GTableProps } from "./types";

// 接收额外参数
defineOptions({ inheritAttrs: false });

// 接收参数
const props = withDefaults(defineProps<GTableProps>(), {
  data: () => [],
  columns: () => [],
  columnConfig: () => ({}),
  rowConfig: () => ({}),
  sortConfig: () => ({}),
  filterConfig: () => ({}),
  minHeight: 0,
  stripe: true,
  border: true,
  round: false,
  fillParentHeight: true,
});

// 接收事件
const emit = defineEmits(["checkboxChange", "checkboxSelectAll"]);

// 表格Ref
const vxeTableRef = ref<any>(null);

// 监听数据变化，滚动条自动回到顶部
watch(
  () => props.data,
  () => {
    setTimeout(() => {
      if (vxeTableRef.value && vxeTableRef.value.clearScroll) {
        vxeTableRef.value.clearScroll();
      }
    }, 50);
  },
  { deep: true },
);

// 内部表格列
const _columns = computed(() => {
  const tempColumns = props.columns.map((item: any) => {
    const _item = { ...item };
    if (_item.type === "checkbox") {
      _item.slots = { header: "checkboxHeader", checkbox: "checkboxBody", ..._item.slots };
    }
    return _item;
  });
  return tempColumns;
});
// 内部表格列配置
const _columnConfig = computed(() => Object.assign({ useKey: true, resizable: true }, props.columnConfig));
// 内部表格行配置
const _rowConfig = computed(() => Object.assign({ isHover: true }, props.rowConfig));
// 内部表格排序配置
const _sortConfig = computed(() => Object.assign({ remote: true }, props.sortConfig));
// 内部筛选排序配置
const _filterConfig = computed(() => Object.assign({ remote: true }, props.filterConfig));

// 表格复选框全选回调
const handleToggleAllCheckbox = async (checked: boolean) => {
  const $table = vxeTableRef.value;
  if ($table) {
    await $table.toggleAllCheckboxRow();
    const records = $table.getCheckboxRecords();
    emit("checkboxSelectAll", { checked: !checked, records });
  }
};
// 表格复选框单选回调
const handleToggleCheckbox = async (checked: boolean, row: any) => {
  const $table = vxeTableRef.value;
  if ($table) {
    await $table.toggleCheckboxRow(row);
    const records = $table.getCheckboxRecords();
    emit("checkboxChange", { checked: !checked, records });
  }
};

// 对外暴漏vxeTable方法
const vxeTable = new Proxy(vxeTableRef, {
  get(target, prop) {
    return prop in target.value ? target.value[prop] : undefined;
  },
  set() {
    throw new Error("vxeTable的属性禁止修改");
  },
});
defineExpose({ vxeTable });
</script>

<style lang="less" scoped>
.g-table {
  width: 100%;
  overflow: hidden;
  :deep(.vxe-table) {
    .vxe-table--header {
      .vxe-table--column {
        .vxe-cell--col-resizable::before {
          width: 2px;
          height: 16px;
        }
        &:nth-last-of-type(1) {
          .vxe-cell--col-resizable {
            display: none;
          }
        }
      }
    }
    .vxe-loading--custom-wrapper {
      background-color: @color-bg;
    }
  }
}
</style>
