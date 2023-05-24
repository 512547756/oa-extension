<template>
  <a-card class="home-table">
    <a-select v-model:value="workTasks" placeholder="请输入" :options="WorkList" style="width: 100px" />
    <a-button>刷新</a-button>
    <!-- <a-button>导出</a-button> -->
    <a-button>删除</a-button>
    <br /><br />
    <a-table :columns="columns" bordered :data-source="tableData" :customRow="rowClick" :pagination="{
      pageSize: 10,
      total: tableData.length
    }">
      <template #name="{ text }">
        <a-tooltip :title="text">{{ text }}</a-tooltip>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getIndexDryingList } from '@/api/IndexDrying/index'
// import api from '@/common/request/index'
import list from './table.json'
export default defineComponent({
  components: {
    // PlusOutlined
  },
  setup() {
    const state = reactive({
      pagination: {}
    })

    const tableData = reactive(list)
    const WorkList = reactive([
      { label: '待办', value: 1 },
      { label: '已办', value: 2 }
    ])
    const workTasks = ref(1)
    const columns = reactive([
      {
        title: '序号',
        dataIndex: 'id',
        align: 'center',
        key: 'id'
      },
      {
        title: '工作任务',
        dataIndex: 'name',
        align: 'center',
        key: 'name'
      },
      {
        title: '责任处室',
        dataIndex: 'office',
        align: 'center',
        key: 'office'
      },
      {
        title: '提交人',
        dataIndex: 'submitter',
        align: 'center',
        key: 'submitter'
      },
      {
        title: '办理时间',
        dataIndex: 'time',
        align: 'center',
        key: 'time'
      },
      {
        title: '文件状态',
        dataIndex: 'status',
        align: 'center',
        key: 'status'
      }
    ])
    const listInfo = ref()
    /**行点击事件 */
    const rowClick = (record: any, index: any) => {
      return {
        onClick: () => {
          // console.log(record, index, 2222)
          listInfo.value = record
          console.log('record', record)
          router.push({ name: 'DryingDetail', state: { params: { ...record } } })
        }
      }
    }
    const dataSource = reactive([
      {
        key: '1',
        index: 1,
        task: '开展天涯海角行动计划',
        department: '规划局',
        submitter: '张三',
        handleTime: '2021-10-01',
        status: '已办结'
      },
      {
        key: '2',
        index: 2,
        task: '实施城市绿化工程',
        department: '园林局',
        submitter: '李四',
        handleTime: '2021-10-02',
        status: '处理中'
      },
      {
        key: '3',
        index: 3,
        task: '举办文化艺术活动',
        department: '文化局',
        submitter: '王五',
        handleTime: '2021-10-03',
        status: '待处理'
      }
    ])
    const router = useRouter()

    const add = () => {
      router.push({ name: 'IndexDrying' })
    }
    return {
      add,
      dataSource,
      rowClick,
      workTasks,
      columns,
      WorkList,
      tableData
    }
  }
})
</script>

<style lang="less">
.home-table button {
  margin-left: 15px;
}

.Ant__table {
  margin-top: 20px;
}
</style>
