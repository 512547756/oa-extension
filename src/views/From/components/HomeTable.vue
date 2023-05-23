<template>
  <a-card class="home-table">
    <!-- <a-button type="primary" @click="add">
      <plus-outlined style="margin-right: 1px" />
      新建
    </a-button> -->
    <a-select
      v-model:value="workTasks"
      placeholder="请输入"
      :options="WorkList"
      style="width: 100px"
    />
    <a-button>刷新</a-button>
    <!-- <a-button>导出</a-button> -->
    <a-button>删除</a-button>
    <br /><br />

    <!-- <vxe-table :data="dataSource">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column v-for="(item, index) in columns" :key="index" :field="item.key" :title="item.title"></vxe-column>
    </vxe-table> -->
    <a-table
      :columns="columns"
      bordered
      :data-source="tableData"
      @change="handleChange"
      :pagination="{
        pageSize: 8,
        total: tableData.length
      }"
    >
      <template #name="{ text }">
        <a-tooltip :title="text">{{ text }}</a-tooltip>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
// import { PlusOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
// import api from '@/common/request/index'
import list from './table.json'
export default defineComponent({
  components: {
    // PlusOutlined
  },
  name: 'App',
  data() {
    return {
      tableData: list,
      columns: [
        { title: '序号', dataIndex: 'id', key: 'id' },
        { title: '工作任务', dataIndex: 'name', key: 'name' },
        { title: '责任处室', dataIndex: 'office', key: 'office' },
        { title: '提交人', dataIndex: 'submitter', key: 'submitter' },
        { title: '办理时间', dataIndex: 'time', key: 'time' },
        { title: '文件状态', dataIndex: 'status', key: 'status', customRender: this.renderStatus }
      ],
      workTasks: 1,
      WorkList: [
        { label: '待办', value: 1 },
        { label: '已办', value: 2 }
      ]
    }
  },
  created() {},
  methods: {
    handleChange(pagination: any) {
      console.log('Update pagination:', pagination)
    },
    get() {
      let data = {}
      // api.get("sevenlist/stressbill/GetTypeList?t=1684651715577&t=1684651715000", data).then((res) => {
      //   console.log(res)
      // });
    }
  },
  setup() {
    const state = reactive({
      pagination: {}
    })

    const columns = reactive([
      {
        title: '序号',
        dataIndex: 'index',
        align: 'center',
        key: 'index'
      },
      {
        title: '工作任务',
        dataIndex: 'task',
        align: 'center',
        key: 'task'
      },
      {
        title: '责任处室',
        dataIndex: 'department',
        align: 'center',
        key: 'department'
      },
      {
        title: '提交人',
        dataIndex: 'submitter',
        align: 'center',
        key: 'submitter'
      },
      {
        title: '办理时间',
        dataIndex: 'handleTime',
        align: 'center',
        key: 'handleTime'
      },
      {
        title: '文件状态',
        dataIndex: 'status',
        align: 'center',
        key: 'status'
      }
    ])

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
      dataSource
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
