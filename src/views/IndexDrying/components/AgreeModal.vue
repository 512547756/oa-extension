<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <a-modal v-model:visible="visible" title="选择处理步骤和人员" width="800px" @ok="handleOk" @cancel="handleCancel">
      <a-radio checked>请办公室领导阅示</a-radio>
      <a-form :model="textArea" ref="formRef">
        <a-form-item name="StatOrgUserName" :rules="[{ required: true, message: '请选择办公室领导' }]">
          <a-select v-model:value="textArea.StatOrgUserName" :options="typeList"
            style="margin:10px 0;width: 100%;"></a-select>
        </a-form-item>
        <!-- <a-divider /> -->

      <!-- <a-form-item label="备注" name="remark" :rules="[{ required: false, message: '请输入备注' }]">
          <a-textarea v-model:value="textArea.remark" placeholder="请输入备注" :rows="2" />
        </a-form-item>
        <a-form-item label="信息内容" name="comments" :rules="[{ required: false, message: '请输入信息内容' }]">
          <a-textarea v-model:value="textArea.remark" placeholder="请输入信息内容" :rows="2" />
            </a-form-item> -->
      </a-form>

    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
export default defineComponent({
  props: {
    agreeModalVisiable: {
      default: false
    }
  },
  emit: ['agreeModalFalse'],
  setup(props, { emit }) {
    const { agreeModalVisiable } = toRefs(props)
    const visible = ref(agreeModalVisiable.value)
    const formRef = ref()
    const typeList: any = ref([
      { label: 'a', value: 'temp1' },
      { label: 'b', value: 'temp2' },
      { label: 'c', value: 'temp3' },
      { label: 'd', value: 'temp4' },
      { label: 'f', value: 'temp5' },
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

