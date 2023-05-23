<template>
  <a-card class="home-table">
    <a-button type="primary" @click="add"> 新建 </a-button>
    <a-button>刷新</a-button>
    <!-- <a-button>导出</a-button> -->
    <a-button>删除</a-button>

    <!-- <vxe-table :data="dataSource">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column v-for="(item, index) in columns" :key="index" :field="item.key" :title="item.title"></vxe-column>
    </vxe-table> -->
  </a-card>
  <a-card>
    <!-- </vxe-table> -->
    <!--使用 pager 插槽-->
    <!-- <vxe-pager :loading="loading" :current-page="tablePage.currentPage" :page-size="tablePage.pageSize"
      :total="tablePage.total" :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange">
    </vxe-pager> -->

    <!-- ant-table -->
    <a-table
      :columns="columns"
      :data-source="newDataSource"
      bordered
      :loading="loading"
      @change="handleTableChange"
      :pagination="{ pageSize: 10 }"
      :customRow="rowClick"
    >
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import homeTableHook from '@/hooks/homeTableHook'
import type { VxeGridProps, VxePagerEvents } from 'vxe-table'
import {
  getIndexDryingList,
  getIndexDryingDetail,
  getIndexDryingWorkList
} from '@/api/IndexDrying/index'

export default defineComponent({
  name: 'HomeTable',
  emits: ['changeVisiable'],

  setup(prop, { emit }) {
    const router = useRouter()
    const listInfo = ref()
    // const columns = ref()
    // const dataSource = ref()

    // 获取表格数据
    const queryData = async (data: any) => {
      let res = await getIndexDryingList(data)
      //    let res1 = await getIndexDryingDetail(21)
      //    let res1 = await getIndexDryingWorkList(data)
      console.log(res)
    }

    queryData({
      pageIndex: 1,
      pageSize: 10,
      keyword: ''
    })

    const { columns, newDataSource, mergeCells, loading, pageLength, getMergeCells, changePage } =
      homeTableHook()

    const add = () => {
      router.push({ name: 'IndexDrying' })
    }

    /**行点击事件 */
    const rowClick = (record: any, index: any) => {
      return {
        onClick: () => {
          // console.log(record, index, 2222)
          listInfo.value = record
          console.log('record', record)
          // const p = { name: '1' }
          // emit('changeVisiable', false, record)
          router.push({ name: 'DryingDetail', state: { params: { ...record } } })
        }
      }
    }

    // 当前页面
    // let currentPage = 1
    const handleTableChange = (e: any) => {
      console.log(e)
      changePage(e.current)
      // currentPage = e.current
    }

    getMergeCells

    onMounted(() => {
      getMergeCells()
      // handleTableData()
    })
    return {
      listInfo,
      loading,
      columns,
      newDataSource,
      mergeCells,
      pageLength,
      add,
      handleTableChange,
      rowClick

      // getMergeCells
    }
  }
})
</script>

<style lang="less">
.home-table button {
  margin-left: 15px;
}

.ant-pagination-prev {
  margin-right: 40px;
}
</style>
