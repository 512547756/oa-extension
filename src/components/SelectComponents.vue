<template>
  <a-select style="width: 250px" :options="optionsList" placeholder="请选择"></a-select>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'App',
  props: {
    optionsList: {
      tyepe: String,
      default: []
    }
  },
  setup(props) {
    const { optionsList } = toRefs(props)

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      optionsList
    }
  }
})
</script>
