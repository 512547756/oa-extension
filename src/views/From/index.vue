<template>
  <home-search></home-search>
  <home-table></home-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HomeSearch from './components/HomeSearch.vue'
import HomeTable from './components/HomeTable.vue'
export default defineComponent({
  components: {
    HomeSearch,
    HomeTable
  },
  name: 'Home',
  setup() {
    return {}
  }
})
</script>
