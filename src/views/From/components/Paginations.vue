<template>
    <div class="pagination" v-if="total > 0">
        <a-pagination v-model:current="pageNo" :defaultPageSize="pageSize" :total="total" @change="pageChange" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Paginations',
    props: {
        pageNo: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        total: {
            type: Number,
            default: 1
        }
    },

    setup(props, { emit }) {
        const pageChange = (page: number) => {
            emit('page-change', page);
        }

        return {
            pageChange
        }
    }
})
</script>


<style lang="less">
.pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
}
</style>