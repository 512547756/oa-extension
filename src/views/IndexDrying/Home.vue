<template>
  <div>
    <home-search></home-search>
    <!-- <div v-if="listData"> -->
    <home-table @changeVisiable="changeVisiable"></home-table>
  </div>
  <!-- </div> -->
  <!-- <div v-if="listInfo">
    <drying-detail v-if="!TableVisiable" :listInfo="listInfo" @back="back"></drying-detail>
  </div> -->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import HomeSearch from './components/HomeSearch.vue'
import HomeTable from './components/HomeTable.vue'
// import jisuan from '@/hooks/jisuan'
export default defineComponent({
  components: {
    HomeSearch,
    HomeTable
    // DryingDetail
  },
  name: 'Home',
  setup() {
    const listInfo = ref()
    const TableVisiable = ref(true)
    const changeVisiable = (visible: any, record: any) => {
      TableVisiable.value = visible
      listInfo.value = record
      console.log(TableVisiable.value, listInfo.value)
    }
    const back = (visible: any) => {
      TableVisiable.value = visible
    }
    return {
      TableVisiable,
      listInfo,
      changeVisiable,
      back
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
