<template>
  <!-- <home-search></home-search> -->
  <home-table></home-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HomeSearch from './components/HomeSearch.vue'
import HomeTable from './components/HomeTable.vue'
import { getIndexDryingWorkList } from '@/api/IndexDrying/index'
export default defineComponent({
  components: {
    HomeTable
  },
  name: 'Home',
  setup() {
    // 获取表格数据
    // const queryData = async (data: any) => {
    //   let res = await getIndexDryingWorkList(data)
    //   //    let res1 = await getIndexDryingDetail(21)
    //   //    let res1 = await getIndexDryingWorkList(data)
    //   console.log('res', res)
    // }

    // queryData({ pageIndex: 1, pageSize: 1, keyword: '', })
    return {}
  }
})
</script>
