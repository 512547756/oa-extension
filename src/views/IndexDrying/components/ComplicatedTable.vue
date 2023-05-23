<template>
  <div>
    <!-- <vxe-table
      show-overflow
      :column-config="{ resizable: true }"
      :data="demo1.tableData"
      :edit-config="{ trigger: 'click', mode: 'cell' }"
    >
      <vxe-column type="seq" width="60"></vxe-column>
    </vxe-table> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import finishDataHook from '@/hooks/finishDataHook'

export default defineComponent({
  setup() {
    const { columns, dataSource, getDataSource } = finishDataHook()

    return {
      columns,
      dataSource
    }
  }
})
</script>
