<template>
  <a-card class="home-search">
    工作任务:
    <a-input v-model:value="searchValue" placeholder="请输入" style="width: 200px" /> 责任处室:
    <a-input v-model:value="searchValue" placeholder="请输入" style="width: 200px" />
    <a-button type="primary">查询</a-button>
    <a-button>重置</a-button>
    <!-- <a-button>高级查询</a-button> -->
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    const searchValue = ref<string>()
    return {
      searchValue
    }
  }
})
</script>

<style lang="less">
.home-search button {
  margin-left: 15px;
}
</style>
