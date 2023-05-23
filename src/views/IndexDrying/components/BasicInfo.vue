<template>
  <a-card title="基础信息">
    {{ form.metricType }}
    <a-form :rules="rule" :model="form" ref="formRef" labelAlign="right">
      <a-row type="flex" justify="center" :gutter="100">
        <a-col>
          <a-form-item label="指标类型" name="metricType" required>
            <select-components
              v-model:value="form.metricType"
              :optionsList="typeList"
              :disabled="disable"
            ></select-components>
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="工作任务" name="workTasks" required>
            <select-components
              v-model:value="form.workTasks"
              :optionsList="workList"
              :disabled="disable"
            ></select-components>
            <!-- <a-select v-model:value="form.workTasks" show-search placeholder="请输入" style="width: 250px"
              :options="workList" @focus="handleFocus" @blur="handleBlur" @change="handleChange" :disabled="disable">
            </a-select> -->
          </a-form-item>
        </a-col>
      </a-row>

      <a-row type="flex" justify="center" :gutter="100">
        <a-col>
          <a-form-item label="责任处室" name="responsibilityDivision" required>
            <a-input
              :disabled="disable"
              v-model:value="form.responsibilityDivision"
              placeholder="请输入"
              style="width: 250px"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="牵头领导" name="leaderShip" required>
            <a-input
              :disabled="disable"
              v-model:value="form.leaderShip"
              placeholder="请输入"
              style="width: 250px"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row type="flex" justify="center" :gutter="disable ? 420 : 100">
        <a-col>
          <a-form-item label="配合处室" name="cooperateOffice">
            <a-input
              :disabled="disable"
              v-model:value="form.cooperateOffice"
              placeholder="请输入"
              style="width: 250px"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item
            v-if="!disable"
            label="提示"
            name="startTime"
            required
            style="margin-right: 18px"
          >
            <a-input value="请在每个月的1-5日内进行填写" disabled class="text-box"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed, toRefs } from 'vue'
import workslist from './workList.json'
import SelectComponents from '@/components/SelectComponents.vue'
// import { getTypeListApi, getResponsibilityDivisionListApi, getFilerPersonListApi } from '@/api/Inficators'
import { Dayjs } from 'dayjs'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  components: {
    SelectComponents
  },
  props: {
    disable: {
      default: () => false
    }
  },
  name: 'App',
  emit: ['getMetricType'],
  setup(props, { emit }) {
    const form = ref<any>({
      // metricType: 'temp1',
      // workTasks: '',
      // responsibilityDivision: '',
      // leaderShip: '',
      // cooperateOffice: '',
      // filerPerson: ''
    })

    const { disable } = toRefs(props)

    /**类型列表 */
    const typeList: any = ref([
      { label: '模版一', value: 'temp1' },
      { label: '模版二', value: 'temp2' },
      { label: '模版三', value: 'temp3' },
    ])
    /**责任处室列表 */
    const responsibilityDivisiontypeList = ref()

    /**填表人列表 */
    const filerPersonData = ref()

    const filerPersonList = computed(() => {
      if (filerPersonData.value) {
        return filerPersonData.value
          .filter((item: { type: any }) => item.type === form.value.responsibilityDivision)[0]
          ?.person.map((p: any) => ({ value: p }))
      } else {
        return []
      }
    })

    const formRef = ref()

    /**验证规则 */
    const rule = ref({
      metricType: [{ require: true, message: '请选择指标类型', trigger: 'change' }],
      workTasks: [{ required: true, message: '请选择工作任务' }],
      responsibilityDivision: [{ require: true, message: '请选择责任处室', trigger: 'change' }],
      leaderShip: [{ require: true, message: '请选择牵头领导', trigger: 'change' }],
      filerPerson: [{ require: true, message: '请选择填表人', trigger: 'change' }]
    })

    /**验证表单事件 */
    const onCheck = async () => {
      try {
        const values = await formRef.value.validateFields()
        console.log('Success:', values)
      } catch (errorInfo) {
        console.log('Failed:', errorInfo)
      }
    }

    // 下拉框过滤
    const workList = ref<any['options']>(workslist)

    const handleChange = (value: string) => {
      console.log(`selected ${value}`)
    }
    const handleBlur = () => {
      console.log('blur')
    }
    const handleFocus = () => {
      console.log('focus')
    }

    // /**获取类型列表 */
    // const getType = () => {
    //   getTypeListApi()
    //     .then((res: any) => {
    //       typeList.value = res.data.result.record.map((pro: any) => ({ value: pro }))
    //     })
    //     .catch((err: any) => {
    //       message.error(err)
    //     })
    // }

    // /**获取责任处室列表 */
    // const getResponsibilityDivision = () => {
    //   getResponsibilityDivisionListApi()
    //     .then((res: any) => {
    //       responsibilityDivisiontypeList.value = res.data.result.record.map((pro: any) => ({ value: pro }))
    //     })
    //     .catch((err: any) => {
    //       message.error(err)
    //     })
    // }

    // /**获取填表人列表 */
    // const getFilerPersonList = () => {
    //   getFilerPersonListApi()
    //     .then((res: any) => {
    //       filerPersonData.value = res.data.result.record
    //       console.log(filerPersonData.value)
    //     })
    //     .catch((err:any) => {
    //       message.error(err)
    //     })
    // };

    watch(
      () => form.value.metricType,
      () => {
        emit('getMetricType', form.value.metricType)
      },
      {
        deep: true
      }
    )

    const router = useRouter()

    const getListInfo = () => {
      form.value = history.state.params
    }
    getListInfo()
    watch(
      () => router.currentRoute.value.path,
      (toPath) => {
        if (router.currentRoute.value.path === '/DryingDetail') {
          getListInfo() //要执行的方法
        }
        if (router.currentRoute.value.path === '/IndexDrying') {
          // eslint-disable-next-line no-self-assign
          form.value = { metricType: 'temp1' }
        }
      },
      { immediate: true, deep: true }
    )
    // onMounted(() => {
    //   getListInfo()
    // })

    return {
      formRef,
      form,
      rule,
      // eslint-disable-next-line vue/no-dupe-keys
      disable,
      typeList,
      responsibilityDivisiontypeList,
      filerPersonList,
      filerPersonData,
      onCheck,
      workList,
      handleChange,
      handleBlur,
      handleFocus
    }
  }
})
</script>

<style lang="less" scoped>
.ant-form-item-label > label {
  width: 150px;
  justify-content: flex-end;
}

.text-box {
  width: 250px;
  border: none;
  background: none;
  color: black;
  font-size: 14px;
  font-weight: bold;
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
