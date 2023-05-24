<template>
  <a-card title="基础信息">
    {{ form.StatTypeId }}
    <a-form :rules="rule" :model="form" ref="formRef" labelAlign="right">
      <a-row type="flex" justify="center" :gutter="100">
        <a-col>
          <a-form-item label="指标类型" name="StatTypeId" required>
            <select-components v-model:value="form.StatTypeId" :optionsList="typeList"
              :disabled="disable"></select-components>
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="工作任务" name="StatTask" required>
            <select-components v-model:value="form.StatTask" :optionsList="workList"
              :disabled="disable"></select-components>
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
          <a-form-item v-if="!disable" label="提示" name="startTime" style="margin-right: 18px">
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
import { Dayjs } from 'dayjs'
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  components: {
    SelectComponents
  },
  props: {
    disable: {
      default: () => false
    },
    newForm: {
      default: () => ({})
    }
  },
  name: 'App',
  emit: ['getStatTypeId', "getAgreeModalVisiable"],
  setup(props, { emit }) {
    const form = ref<any>({
      StatTypeId: 'temp1',
      // StatTask: '',
      // StatOrgName: '',
      // StatOrgUserName: '',
      // StatConcertUserName: '',
      // EditName: ''
    })

    const { disable } = toRefs(props)

    /**类型列表 */
    const typeList: any = ref([
      { label: '模版一', value: 'temp1' },
      { label: '模版二', value: 'temp2' },
      { label: '模版三', value: 'temp3' },
      { label: '模版四', value: 'temp4' },
      { label: '模版五', value: 'temp5' },
    ])
    /**责任处室列表 */
    const StatOrgNametypeList = ref()

    /**填表人列表 */
    const EditNameData = ref()

    const EditNameList = computed(() => {
      if (EditNameData.value) {
        return EditNameData.value
          .filter((item: { type: any }) => item.type === form.value.StatOrgName)[0]
          ?.person.map((p: any) => ({ value: p }))
      } else {
        return []
      }
    })

    const formRef = ref()

    /**验证规则 */
    const rule = ref({
      StatTypeId: [{ require: true, message: '请选择指标类型', trigger: 'change' }],
      StatTask: [{ required: true, message: '请选择工作任务' }],
      StatOrgName: [{ require: true, message: '请选择责任处室', trigger: 'change' }],
      StatOrgUserName: [{ require: true, message: '请选择牵头领导', trigger: 'change' }],
      EditName: [{ require: true, message: '请选择填表人', trigger: 'change' }]
    })

    /**验证表单事件 */
    const onCheck = async () => {
      try {
        const values = await formRef.value.validateFields()
        emit('getAgreeModalVisiable')
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
    // const getStatOrgName = () => {
    //   getStatOrgNameListApi()
    //     .then((res: any) => {
    //       StatOrgNametypeList.value = res.data.result.record.map((pro: any) => ({ value: pro }))
    //     })
    //     .catch((err: any) => {
    //       message.error(err)
    //     })
    // }

    // /**获取填表人列表 */
    // const getEditNameList = () => {
    //   getEditNameListApi()
    //     .then((res: any) => {
    //       EditNameData.value = res.data.result.record
    //       console.log(EditNameData.value)
    //     })
    //     .catch((err:any) => {
    //       message.error(err)
    //     })
    // };

    watch(
      () => form.value.StatTypeId,
      () => {
        console.log('form.value.StatTypeId', form.value.StatTypeId)
        emit('getStatTypeId', form.value.StatTypeId)
      },
      {
        deep: true
      }
    )

    const router = useRouter()

    const isEmptyNewForm = () => {
      const { newForm } = toRefs(props)
      if (newForm.value) {
        form.value = newForm.value
        console.log('newForm.value', form.value)
      }
    }
    onMounted(() => {
      isEmptyNewForm()
    })

    return {
      formRef,
      form,
      rule,
      // eslint-disable-next-line vue/no-dupe-keys
      disable,
      typeList,
      StatOrgNametypeList,
      EditNameList,
      EditNameData,
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
.ant-form-item-label>label {
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
