<!-- 往期数据 -->
<template>
  <a-table :columns="columns" :data-source="dataSource" bordered> </a-table>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import lastDataHook from '@/hooks/lastDetailHook'
export default defineComponent({
  props: {
    detailList: {
      default: () => ([])
    }
  },
  name: 'LastDetail',
  setup(props) {
    // const dataSource = ref()
    const dataSource = computed(() => props.detailList)
    const { columns } = lastDataHook()

    return {
      columns,
      dataSource
    }
  }
})
</script>
