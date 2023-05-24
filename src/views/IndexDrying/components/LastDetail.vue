<!-- 往期数据 -->
<template>
  {{ detailList }}
  <!-- <a-table :columns="lastColumns" :dataSource="detailList" bordered> </a-table> -->
  <vxe-table :data="detailList" border>
    <!-- <vxe-column type="seq" width="60"></vxe-column> -->
    <vxe-column v-for="(item, index) in lastColumns" :key="index" :field="item.key" :title="item.title"></vxe-column>
  </vxe-table>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  props: {
    detailList: {
      type: Object,
      default: () => ({})
    },
    lastColumns: {
      type: Object,
      default: () => ({})
    },
  },
  name: 'LastDetail',
  setup(props) {
    const lastColumns = computed(() => props.lastColumns)
    const { detailList } = toRefs(props)
    const dataSource = ref()

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      detailList,
      dataSource,
      // eslint-disable-next-line vue/no-dupe-keys
      lastColumns
    }
  }
})
</script>
