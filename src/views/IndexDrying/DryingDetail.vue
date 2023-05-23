<template>
  <div>
    <a-card title="指标晾晒--详情" style="display: flex; flex-direction: column; flex: 30">
      <!-- <template #extra>
        <a-button type="primary" @click="back">返回</a-button>
      </template> -->
    </a-card>
    <basic-info :disable="true"></basic-info>

    <!-- 往期数据 -->
    <a-card title="完成情况">
      <last-detail />
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, onMounted, watch } from 'vue'
import BasicInfo from './components/BasicInfo.vue'
// import SandTableFromDetail from './components/SandTableFromDetail.vue'
import LastDetail from './components/LastDetail.vue'
import { useRoute, useRouter } from 'vue-router'
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

    /**返回 */
    const back = () => {
      router.push({ name: 'Home' })
    }

    // const getInfoList = () => {
    //   console.log('history.state', history.state)
    //   listInfo.value = history.state.params
    // }
    // const listInfo = ref()
    // onMounted(() => {
    //   getInfoList()
    // })
    watch(
      () => history.state.params.workTask,
      () => {
        console.log('123')
      },
      {
        deep: true
      }
    )

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      // listInfo,
      back
    }
  }
})
</script>
<style lang="less">
.ant-table-thead > tr > th > {
  text-align: center;
  padding: 10px;
}

.ant-table-tbody > tr > td {
  text-align: center;
  padding: 10px;
}
</style>
