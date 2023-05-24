<template>
  <div>
    <a-card class="home-search">
      工作任务:
      <a-input v-model:value="keyword" placeholder="请输入" style="width: 200px" />
      <!-- 责任处室:
      <a-input placeholder="请输入" style="width: 200px" /> -->
      <a-button type="primary" @click="Querysand">查询</a-button>
      <a-button @click="Reset">重置</a-button>
      <!-- <a-button>高级查询</a-button> -->
    </a-card>
    <a-card class="home-table">
      <a-select v-model:value="statusValue" placeholder="请输入" :options="WorkList" style="width: 100px"
        @change="getSelect" />
      <a-button @click="getRefresh">刷新</a-button>
      <!-- <a-button>导出</a-button> -->
      <!-- <a-button :disabled="!hasSelected" :loading="loading">删除</a-button> -->
      <br /><br />


      <a-table :data-source="tableData" :rowKey="record => record.Id" :columns="columns" :loading="loading"
        :pagination="false" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :customRow="rowClick">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'WorkFlowStep'">
            <span>{{ getWorkFlowStep(record.WorkFlowStep) }}</span>
          </template>
        </template>
      </a-table>
      <div class="pagination" v-if="total > 0">
        <a-pagination v-model:current="pageNo" :defaultPageSize="pageSize" :total="total" @change="pageChange" />
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, toRefs } from 'vue'
import { getIndexDryingWorkList } from '@/api/IndexDrying/index'
import list from './table.json'
import { useRouter } from 'vue-router'
import type { Key } from 'ant-design-vue/lib/_util/type'
export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter()
    const pageNo = ref(1);
    const pageSize = ref(10);
    const total = ref(0)
    const state = reactive<{
      selectedRowKeys: Key[];
      loading: boolean;
      value: number;
    }>({
      selectedRowKeys: [],
      loading: false,
      value: 0,
    });
    const keyword = ref('');
    const statusValue = ref(state.value)
    const tableData = ref([])

    const queryData = async (data: any) => {
      state.loading = true;
      let res = await getIndexDryingWorkList(data)
      state.loading = false;
      tableData.value = res.ListData
      total.value = res.TotalCount
      console.log('res', tableData.value)
    }
    const data = reactive({
      pageIndex: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      status: statusValue.value
    })
    queryData(data)


    const WorkList = reactive([
      { label: '待办', value: 0 },
      { label: '已办', value: 1 },
      { label: '退回', value: 2 }
    ])

    const getWorkFlowStep = (val: number) => {
      switch (val) {
        case 1:
          return '用户提交'
        case 2:
          return '处室填表'
        case 3:
          return '处长查阅'
        case 4:
          return '办公室查阅'
        default:
          return '已通过'
      }
    }

    const columns = reactive([
      {
        title: '序号',
        dataIndex: 'index',
        align: 'center',
        key: 'index',
        customRender: ({ index }: any) => {
          return {
            children: index + 1 + (pageNo.value - 1) * pageSize.value
          }
        }
        // customCell: customIndex
      },
      {
        title: '工作任务',
        dataIndex: 'Title',
        align: 'center',
        key: 'Title'
      },
      {
        title: '责任处室',
        dataIndex: 'OrgName',
        align: 'center',
        key: 'OrgName'
      },
      {
        title: '提交人',
        dataIndex: 'UserName',
        align: 'center',
        key: 'UserName'
      },
      {
        title: '办理时间',
        dataIndex: 'CreateTime',
        align: 'center',
        key: 'CreateTime'
      },
      {
        title: '文件状态',
        dataIndex: 'WorkFlowStep',
        align: 'center',
        key: 'WorkFlowStep',
      }
    ])
    const listInfo = ref()
    /**行点击事件 */
    const rowClick = (record: any, index: any) => {
      return {
        onClick: () => {
          listInfo.value = record
          console.log('record', record)
          router.push({ name: 'DryingDetail', state: { params: { ...record } } })
        }
      }
    }
    const Reset = () => {
      getRefresh()
    }
    const getRefresh = () => {
      state.loading = true;
      pageNo.value = 1;
      pageSize.value = 10;
      statusValue.value = 0
      data.keyword = ''
      queryData(data)
    }
    // 切页
    const pageChange = (page: number) => {
      data.pageIndex = page
      console.log(data)
      queryData(data)
    };
    // 调用下拉框时
    const getSelect = (value: any) => {
      data.status = statusValue.value
      queryData(data)
    };

    const Querysand = () => {
      data.keyword = keyword.value
      queryData(data)
    }
    // 设置列表选中行
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);
    const start = () => {
      state.loading = true;
      setTimeout(() => {
        state.loading = false;
        state.selectedRowKeys = [];
      }, 1000);
    };
    const onSelectChange = (selectedRowKeys: Key[]) => {
      console.log('选中项', selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };


    return {
      rowClick,
      columns,
      ...toRefs(state),
      hasSelected,
      statusValue,
      WorkList,
      tableData,
      pageNo,
      pageSize,
      total,
      keyword,

      start,
      onSelectChange,
      getRefresh,
      getSelect,
      pageChange,
      Querysand,
      Reset,
      getWorkFlowStep
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

.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}
</style>
