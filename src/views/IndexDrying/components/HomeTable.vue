<template>
  <a-card class="home-table">
    <a-button type="primary" @click="add"> 新建 </a-button>
    <a-button>刷新</a-button>
    <!-- <a-button>导出</a-button> -->
    <a-button>删除</a-button>
    <!-- {{ newDataSource }} -->
    {{ mergeCells2 }}{{ newDataSource }}
    <vxe-table ref="vxetable" :data="newDataSource" :merge-cells="mergeCells2" border @cell-click="cellClickEvent">
      <!-- <vxe-column type="seq" width="60"></vxe-column> -->
      <vxe-column v-for="(item, index) in columns" :key="index" :field="item.key" :title="item.title"></vxe-column>
    </vxe-table>
  </a-card>
  <a-card>
    <!-- </vxe-table> -->
    <!--使用 pager 插槽-->
    <vxe-pager :loading="loading" :current-page="tablePage.currentPage" :page-size="tablePage.pageSize"
      :total="tablePage.total" :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange">
    </vxe-pager>

    <!-- ant-table -->
    <!-- <a-table :columns="columns" :data-source="newDataSource" bordered :loading="loading" @change="handleTableChange"
      :pagination="{ pageSize: 10 }" :customRow="rowClick">
    </a-table> -->
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import homeTableHook from '@/hooks/homeTableHook'
import type { VxeGridProps, VxePagerEvents } from 'vxe-table'
import type { VxeTablePropTypes } from 'vxe-table'
import { getIndexDryingList } from '@/api/IndexDrying/index'

export default defineComponent({
  name: 'HomeTable',
  emits: ['changeVisiable'],
  setup() {
    const router = useRouter()
    const listInfo = ref()
    // const columns = ref()
    // const dataSource = ref()
    const listData = ref()
    const tablePage = ref({
      currentPage: 1,
      pageSize: 2,
      total: 10
    })


    // 获取表格数据
    const queryData = async (data: any) => {
      let res = await getIndexDryingList(data)
      console.log('res', res)
      //    let res1 = await getIndexDryingDetail(21)
      //    let res1 = await getIndexDryingWorkList(data)
      // listData.value = res.ListData
      listData.value = res.ListData
      getMergeCells(jisuan2(listData.value))
    }

    const vxetable = ref()

    onMounted(() => {
      queryData({ pageIndex: tablePage.value.currentPage, pageSize: tablePage.value.pageSize, keyword: '', })
    })


    const findList = () => {
      console.log('vxetable', vxetable)
      console.log('mergeCells2', mergeCells2.value)
      vxetable.value.setMergeCells([{ "row": 0, "col": 2, "rowspan": 0, "colspan": 1 }, { "row": 0, "col": 1, "rowspan": 0, "colspan": 1 }, { "row": 0, "col": 0, "rowspan": 0, "colspan": 1 }, { "row": 0, "col": 2, "rowspan": 2, "colspan": 1 }, { "row": 0, "col": 1, "rowspan": 2, "colspan": 1 }, { "row": 0, "col": 0, "rowspan": 2, "colspan": 1 }])
      // 模拟后台接口
      loading.value = true
      queryData({ pageIndex: tablePage.value.currentPage, pageSize: tablePage.value.pageSize, keyword: '', })
      // listData.value = listData.value = [{ "index": 1, "StatTask": "保持房地产市场平稳健康发展", "StatTypeId": 5, "StatOrgName": "物业房管处", "StatOrgUserName": "陈寿旦", "StatConcertUserName": "城市建设处", "Id": 1, "_X_ROW_KEY": "row_37" }, { "index": 1, "StatTask": "保持房地产市场平稳健康发展", "StatTypeId": 5, "StatOrgName": "物业房管处", "StatOrgUserName": "陈寿旦", "StatConcertUserName": "城市建设处", "Id": 1, "_X_ROW_KEY": "row_38" },]

      loading.value = false
      // setTimeout(() => {
      //   getMergeCells(dataSource.value)
      //   // newDataSource.value = dataSource.value
      //   tablePage.value.total = 401
      // }, 200)
    }
    const handlePageChange = (currentPage: any, pageSize: any) => {
      tablePage.value.currentPage = currentPage.currentPage
      tablePage.value.pageSize = currentPage.pageSize
      findList()
    }

    const { columns, newDataSource, mergeCells, loading, pageLength, getMergeCells, changePage, jisuan2 } =
      homeTableHook()

    const mergeCells2 = ref<VxeTablePropTypes.MergeCells>([{ "row": 0, "col": 2, "rowspan": 0, "colspan": 1 }, { "row": 0, "col": 1, "rowspan": 0, "colspan": 1 }, { "row": 0, "col": 0, "rowspan": 0, "colspan": 1 }, { "row": 0, "col": 2, "rowspan": 2, "colspan": 1 }, { "row": 0, "col": 1, "rowspan": 2, "colspan": 1 }, { "row": 0, "col": 0, "rowspan": 2, "colspan": 1 }])


    const add = () => {
      router.push({ name: 'IndexDrying' })
    }

    /**antTable行点击事件 */
    // const rowClick = (record: any, index: any) => {
    //   return {
    //     onClick: () => {
    //       listInfo.value = record
    //       console.log('record', record)
    //       router.push({ name: 'DryingDetail', state: { params: { ...record } } })
    //     }
    //   }
    // }

    const cellClickEvent = ({ row, column }: any) => {
      console.log('row,column', row, column)
      router.push({ name: 'DryingDetail', state: { params: { Id: row.Id } } })
    }

    // 当前页面 antTable
    // let currentPage = 1
    // const handleTableChange = (e: any) => {
    //   console.log(e)
    //   changePage(e.current)
    //   // currentPage = e.current
    // }

    // jisuan2(listData.value);
    onMounted(() => {
      // console.log('listData', listData.value)
      // handleTableData()
    })
    return {
      vxetable,
      tablePage,
      listInfo,
      loading,
      columns,
      newDataSource,
      mergeCells,
      mergeCells2,
      // dataSource,
      pageLength,
      add,
      // handleTableChange,
      // rowClick,
      handlePageChange,
      cellClickEvent
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
