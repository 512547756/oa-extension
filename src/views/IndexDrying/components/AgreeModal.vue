<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <a-modal v-model:visible="visible" title="选择处理步骤和人员" @ok="handleOk" @cancel="handleCancel">
      <a-radio checked>请办公室领导阅示</a-radio>
      <a-form :model="textArea" ref="formRef">
        <a-form-item name="StatOrgUserName" :rules="[{ required: true, message: '请选择办公室领导' }]">
          <select-components v-model:value="textArea.StatOrgUserName" :optionsList="typeList"
            style="margin:10px 40px;width: 400px;"></select-components>
        </a-form-item>
      </a-form>
      <!-- <div style="margin:10px 40px;">
      </div> -->
      <a-divider />
      备注： <a-textarea style="margin:10px 40px;width: 400px;" v-model:value="textArea.remark" placeholder="请输入"
        :rows="1" />
      信息内容： <a-textarea style="margin:10px 40px;width: 400px;" v-model:value="textArea.comments" placeholder="请输入"
        :rows="1" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import SelectComponents from '@/components/SelectComponents.vue';
export default defineComponent({
  props: {
    agreeModalVisiable: {
      default: false
    }
  },
  components: {
    SelectComponents
  },
  emit: ['agreeModalFalse'],
  setup(props, { emit }) {
    const { agreeModalVisiable } = toRefs(props)
    const visible = ref(agreeModalVisiable.value)
    const formRef = ref()
    const typeList: any = ref([
      { label: '模版一', value: 'temp1' },
      { label: '模版二', value: 'temp2' },
      { label: '模版三', value: 'temp3' },
      { label: '模版四', value: 'temp4' },
      { label: '模版五', value: 'temp5' },
    ])
    const textArea = ref<any>({
      StatOrgUserName: '',
      comments: '',
      remark: ''
    })

    const handleOk = async (e: MouseEvent) => {
      try {
        const values = await formRef.value.validateFields()
        console.log('Success:', values)
        visible.value = false;
        emit("agreeModalFalse")
      } catch (errorInfo) {
        console.log('Failed:', errorInfo)
      }
    };
    const handleCancel = (e: MouseEvent) => {
      visible.value = false;
      emit("agreeModalFalse")
    };
    return {
      formRef,
      typeList,
      textArea,
      visible,
      handleOk,
      handleCancel
    };
  },
});
</script>

