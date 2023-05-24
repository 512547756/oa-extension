<template>
  <div>
    <div v-if="!disable" class="btn">
      <div class="btn-storage btn-cursor" @click="onCheck(0)">
        <img :src="storage" style="width: 15px; height: 15px" /><span>提交</span>
      </div>
      <div class="btn-cursor" @click="onCheck(1)">
        <img :src="forward" style="width: 15px; height: 12px" /><span>办理</span>
      </div>
      <div class="btn-cursor" @click="onCheck(2)">
        <img :src="forward" style="width: 15px; height: 12px" /><span>暂存</span>
      </div>
      <!-- <div class="btn-cursor" @click="onCheck1">
        <img :src="forward" style="width: 15px; height: 12px" /><span>退回</span>
      </div>
      <div class="btn-cursor" @click="onCheck2">
        <img :src="forward" style="width: 15px; height: 12px" /><span>通过</span>
      </div> -->
    </div>
    <agree-modal v-if="agreeModalVisiable" :agreeModalVisiable="agreeModalVisiable"
      @agreeModalFalse="agreeModalFalse"></agree-modal>
    <a-card title="基础信息" class="basicInfo">
      <a-form :rules="rule" :model="form" ref="formRef" labelAlign="right">
        <a-row type="flex" justify="center" :gutter="100">
          <a-col>
            <a-form-item label="指标类型" name="StatTypeId" required>
              <a-select v-model:value="form.StatTypeId" :options="typeList" :disabled="disable"
                placeholder="请选择"></a-select>
              <!-- <select-components v-model:value="form.StatTypeId" :optionsList="typeList"
                :disabled="disable"></select-components> -->
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="工作任务" name="StatTask" required>
              <a-select v-model:value="form.StatTask" :options="workList" :disabled="disable"
                placeholder="请选择"></a-select>
              <!-- <a-select v-model:value="form.StatTask" show-search placeholder="请输入" style="width: 250px"
              :options="workList" @focus="handleFocus" @blur="handleBlur" @change="handleChange" :disabled="disable">
            </a-select> -->
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="center" :gutter="100">
          <a-col>
            <a-form-item label="责任处室" name="StatOrgName" required>
              <a-input :disabled="disable" v-model:value="form.StatOrgName" placeholder="请输入"
                style="width: 250px"></a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="牵头领导" name="StatOrgUserName" required>
              <a-input :disabled="disable" v-model:value="form.StatOrgUserName" placeholder="请输入"
                style="width: 250px"></a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="center" :gutter="disable ? 420 : 100">
          <a-col>
            <a-form-item label="配合处室" name="StatConcertUserName">
              <a-input :disabled="disable" v-model:value="form.StatConcertUserName" placeholder="请输入"
                style="width: 250px"></a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item v-if="!disable" label="提示" name="startTime">
              <span style="padding-right: 80px;">请在每个月的1-5日内进行填写</span>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card title="往期数据">
      <last-detail :detailList="detailList" :lastColumns="lastColumns"></last-detail>
    </a-card>

    <a-card title="完成情况">
      <TableTemp v-model:data="dataSource1" v-model:columns="columns1" v-bind="tempProps"></TableTemp>
      <!-- 点评备注 -->
      <a-form :model="textArea" :label-col="{ span: 4 }" :wrapper-col="{ span: 13 }" style="margin-top: 15px">
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

<script lang="ts" setup name="IndexDryingDetail">
import { watch, ref, computed, onMounted } from 'vue'
import LastDetail from './components/LastDetail.vue'
import AgreeModal from './components/AgreeModal.vue'
import TableTemp from './components/tableTemp'
import workslist from './components/workList.json'
import useInitTable from '../IndexDrying/hooks/useInitTable'
import useChangeTable, { divisionNum } from './hooks/useChangeTable'
import lastDataHook from '@/hooks/lastDetailHook'
import { useRoute, useRouter } from 'vue-router'
import storageImg from '@/assets/storage.png'
import forwardImg from '@/assets/forward.png'
import { getIndexDryingDetail, indexDryingSubmit } from '@/api/IndexDrying/index'
import useDataTransform from './hooks/useDataTransform'

const disable = computed(() => router.currentRoute.value.path === '/DryingDetail' ? true : false)

const form = ref<any>({
  StatTypeId: 'temp1',
  // StatTask: '',
  // StatOrgName: '',
  // StatOrgUserName: '',
  // StatConcertUserName: '',
  // EditName: ''
})

const router = useRouter()

const formRef = ref()

const detailList = ref()

const { columns: lastColumns, taskList } = lastDataHook()
const getListInfo = async (data: any) => {
  if (router.currentRoute.value.path !== '/IndexDrying') {
    // let res = await getIndexDryingDetail(data)
    let res = await getIndexDryingDetail({ id: 1 })
    console.log('getIndexDryingDetail-res', res)
    form.value = res
    form.value.StatTypeId = `temp${res.StatTypeId}`
    console.log('form.value', form.value.OtherList)
    detailList.value = taskList(form.value)
    // detailList.value = [{ ZH: '1' }]
    console.log('detailList.value', detailList.value)
  }
}
getListInfo(1)

const textArea = ref<any>({
  comments: '',
  remark: ''
})

/**验证规则 */
const rule = ref({
  StatTypeId: [{ require: true, message: '请选择指标类型', trigger: 'change' }],
  StatTask: [{ required: true, message: '请选择工作任务' }],
  StatOrgName: [{ require: true, message: '请选择责任处室', trigger: 'change' }],
  StatOrgUserName: [{ require: true, message: '请选择牵头领导', trigger: 'change' }],
  EditName: [{ require: true, message: '请选择填表人', trigger: 'change' }]
})

// 下拉框过滤
const workList = ref<any['options']>(workslist)

/**类型列表 */
const typeList: any = ref([
  { label: '模版一', value: 'temp1' },
  { label: '模版二', value: 'temp2' },
  { label: '模版三', value: 'temp3' },
  { label: '模版四', value: 'temp4' },
  { label: '模版五', value: 'temp5' },
])

const storage = storageImg

const forward = forwardImg
let tempProps = ref({})
let dataSource1 = ref([])
let columns1 = ref([])
let actionType = ref()
const agreeModalVisiable = ref(false)

const initTable = (tempProps: any) => {
  const { dataSource, columns } = useInitTable(tempProps.datas, tempProps.column)
  dataSource1.value = dataSource.value
  columns1.value = columns.value
}

/**验证表单事件 */
const onCheck = async (type: any) => {
  actionType.value = type
  try {
    const values = await formRef.value.validateFields()
    const basicInfo = Object.assign(form.value, textArea.value)
    const detailList = {
      columns: columns1.value,
      data: dataSource1.value
    }
    // const postData = useDataTransform(basicInfo, detailList, 1, type)

    if (type === 0) {
      // 填报人填写
      const postData = useDataTransform(basicInfo, detailList, 1, type)
      const res = await indexDryingSubmit(postData)
    }

    agreeModalVisiable.value = true

    console.log('Success:', values)
  } catch (errorInfo) {
    console.log('Failed:', errorInfo)
  }
}

const agreeModalFalse = async (data: any) => {
  // data: {}
  if ([1, 2].includes(actionType.value)) {
    // 处室填写暂存或者办理时
    const basicInfo = Object.assign(form.value, textArea.value)
    const detailList = {
      columns: columns1.value,
      data: dataSource1.value
    }
    const postData = useDataTransform(basicInfo, detailList, 2, actionType.value)
    postData.idList = data
    const res = await indexDryingSubmit(postData)
  }
  // 处理通过或者拒绝
  agreeModalVisiable.value = false
}

watch(
  () => form.value.StatTypeId,
  newVal => {
    tempProps.value = useChangeTable(newVal)
    initTable(tempProps.value)

    // if (router.currentRoute.value.path === '/IndexDrying') {
    //   tempProps.value = useChangeTable(newVal)
    //   initTable(tempProps.value)
    // }
  },
  {
    immediate: true
  }
)
watch(
  () => disable.value,
  () => {
    if (disable.value) {
      // getListInfo(history.state.params.Id)
    } else {
      form.value = {
        StatTypeId: 'temp1',
      }
    }
  },
  {
    immediate: true
  }
)

watch(
  () => dataSource1.value,
  (newV: any) => {
    if (form.value.StatTypeId === 'temp2') {
      Object.keys(newV[0]).filter(v => v !== 'params').forEach(j => {
        newV[2][j] = divisionNum(newV[0][j], newV[1][j])
      })
    }
  },
  { deep: true }
)

defineExpose({
  dataSource1,
  columns1,
  tempProps
})





// tempProps.hasFullYearTarget = false // 如果有数据控制全年目标不让填写
// 根据数据填充全年目标
// columns.value.forEach((v: any) => { // 如果是模板3的全年目标 需要向columns.params.endNo中将第二个参数传入
//     switch(v.field){
//         case "hs":
//             v.params.endNo = 2
//             break
//         case "jb":
//             v.params.endNo = 2
//             break
//         //...
//     }
// })
// const qnmbRow: any = dataSource1.value.find((v: any) => v.params === '全年目标值')
// qnmbRow.hs = 2
// qnmbRow.jb = 3
// qnmbRow.zh = 3
// qnmbRow.bl = 1
// qnmbRow.yz = 3
// qnmbRow.fh = 3
// qnmbRow.yy = 3
// qnmbRow.cx = 3
// qnmbRow.nh = 3
// qnmbRow.xs = 3
// qnmbRow.qwxq = 322
// qnmbRow.gxq = 3
// qnmbRow.dqh = 3
// qnmbRow.qshj = 3
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

.basicInfo .ant-select-selector {
  width: 250px !important;
}

.btn-storage {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.btn-cursor {
  cursor: pointer;
}

.ant-input.ant-input-disabled {
  background-color: white;
  color: black;
}

.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
  background-color: white;
  color: black;
}
</style>
