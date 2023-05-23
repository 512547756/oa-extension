<template>
  <div>
    <div class="btn">
      <div class="btn-storage btn-cursor">
        <img :src="storage" style="width: 15px; height: 15px" /><span>暂存</span>
      </div>
      <div class="btn-cursor" @click="submit">
        <img :src="forward" style="width: 15px; height: 12px" /><span>办理</span>
      </div>
    </div>
    <basic-info ref="basicInfoRef" @getMetricType="getMetricType"></basic-info>

    <a-card title="往期数据">
      <!-- <SandTableFromPast v-if="MetricType == '1'" />
      <SandTableFromLast v-if="MetricType == '2'" /> -->
      <last-detail></last-detail>
    </a-card>

    <a-card title="完成情况">
      <!-- <complicated-table></complicated-table> -->
      <!-- <TableFromOne v-if="MetricType == '1'" />
      <TableFromTwo v-if="MetricType == '2'" /> -->
      <index :getMetricType="MetricType"></index>
      <!-- 点评备注 -->
      <a-form
        :model="textArea"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 13 }"
        style="margin-top: 15px"
      >
        <a-form-item label="点评">
          <a-textarea v-model:value="textArea.comments" placeholder="请输入" :rows="3" />
        </a-form-item>
        <a-form-item label="备注">
          <a-textarea v-model:value="textArea.remark" placeholder="请输入" :rows="3" />
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import finishDataHook from '@/hooks/finishDataHook'
import BasicInfo from './components/BasicInfo.vue'
import Index from './index.vue'
// import TableFromOne from './components/SandTableFromOne.vue'
// import TableFromTwo from './components/SandTableFromTwo.vue'
// import ComplicatedTable from './components/ComplicatedTable.vue'
import LastDetail from './components/LastDetail.vue'
import storageImg from '@/assets/storage.png'
import forwardImg from '@/assets/forward.png'
export default defineComponent({
  components: {
    BasicInfo,
    // TableFromOne,
    // TableFromTwo,
    LastDetail,
    Index
    // SandTableFromPast,
    // SandTableFromLast
  },
  setup() {
    const basicInfoRef = ref()
    const textArea = ref<any>({
      comments: '',
      remark: ''
    })
    const MetricType = ref()
    const storage = storageImg
    const forward = forwardImg

    const submit = () => {
      console.log(basicInfoRef.value.form.metricType)
      basicInfoRef.value.onCheck()
    }
    const { columns, dataSource, getDataSource } = finishDataHook()

    const getMetricType = (getMetricType: string) => {
      MetricType.value = getMetricType
      getDataSource(getMetricType)
      console.log('MetricType.value', MetricType.value)
    }

    return {
      textArea,
      columns,
      dataSource,
      basicInfoRef,
      submit,
      getMetricType,
      storage,
      forward,
      MetricType
    }
  }
})
</script>

<style lang="less">
.btn {
  height: 23px;
  width: 100%;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  background-color: #ecf4fc;
  line-height: 24px;
  font-weight: bold;

  img {
    margin-right: 3px;
  }
}

.btn-storage {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.btn-cursor {
  cursor: pointer;
}

.ant-table-thead > tr > th > {
  text-align: center;
  padding: 10px;
}

.ant-table-tbody > tr > td {
  text-align: center;
  padding: 10px;
}
</style>
