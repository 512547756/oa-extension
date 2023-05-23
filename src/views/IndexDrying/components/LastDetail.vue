<!-- 往期数据 -->
<template>
  <a-table :columns="columns" :data-source="dataSource" bordered> </a-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import lastDataHook from '@/hooks/lastDetailHook'
export default defineComponent({
  name: 'App',
  setup() {
    const dataSource = ref()
    const { columns } = lastDataHook()
    return {
      columns,
      dataSource
    }
  }
})
</script>
