<template>
  <div>
    <a-card title="指标晾晒--详情" style="display: flex; flex-direction: column; flex: 30">
      <!-- <template #extra>
        <a-button type="primary" @click="back">返回</a-button>
      </template> -->
    </a-card>
    <basic-info :disable="true" :newForm="form"></basic-info>

    <!-- 往期数据 -->
    <a-card title="完成情况">
      {{ sumList.finishInfo }}
      <last-detail :detailList="sumList.finishInfo" />
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, onMounted, watch } from 'vue'
import homeTableHook from '@/hooks/homeTableHook'
import BasicInfo from './components/BasicInfo.vue'
import LastDetail from './components/LastDetail.vue'
import { getIndexDryingDetail } from '@/api/IndexDrying/index'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue';
export default defineComponent({
  components: {
    BasicInfo,
    // SandTableFromDetail,
    LastDetail
  },
  // props: {
  //   listInfo: {
  //     default: () => ({})
  //   },

  // },
  name: 'DringDetail',
  setup() {
    // const { listInfo } = toRefs(props)

    const router = useRouter()

    const form = ref()
    const detailList = ref()
    /**返回 */
    const back = () => {
      router.push({ name: 'Home' })
    }
    const { getMergeCells, jisuan2, sumList } = homeTableHook()
    const getListInfo = async (data: any) => {
      let res = await getIndexDryingDetail(data)
      console.log('res', res)

    }
    // onMounted(() => {
    //   jisuan2();
    //   console.log('sumList', sumList)
    // })
    watch(
      () => router.currentRoute.value.path,
      (toPath) => {
        if (router.currentRoute.value.path === '/DryingDetail') {
          console.log('history.state.params.Id', history.state.params.Id)
          getListInfo({ id: history.state.params.Id }) //要执行的方法

        }
        if (router.currentRoute.value.path === '/IndexDrying') {
          // eslint-disable-next-line no-self-assign
          form.value = { StatTypeId: 'temp1' }
        }
      },
      { immediate: true, deep: true }
    )

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      // listInfo,
      back,
      form,
      detailList,
      sumList
    }
  }
})
</script>
<style lang="less">
.ant-table-thead>tr>th> {
  text-align: center;
  padding: 10px;
}

.ant-table-tbody>tr>td {
  text-align: center;
  padding: 10px;
}
</style>
