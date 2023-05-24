import { defineComponent } from 'vue'
import { reactive, watch } from 'vue'
import {isUndefined} from 'lodash'

import styles from './tableTemp.module.less'

export default defineComponent({
  name: 'TableTemp',
  props: {
    columns: {
        type: Array
    },
    data: {
        type: Array
    },
    hasFullYearTarget: {
        trpe: Boolean,
        default: false
    },
    editRender: {
        type: Function,
    },
    footerMethod: {
        type: Function,
        default: undefined
    },
    disabledRow: {
        type: Array,
        default: () => []
    }
  },
  setup(props) {

    const beforeEditMethod = ({ row, rowIndex, column, columnIndex }: any) => {
        // // 全年目标是否有值
        // const hasValue = Object.keys(row).every(item => {return (row[item] ?? '')!== '' })
        if(row.params === '全年目标值' && props.hasFullYearTarget) {
            return false
        }
        if(props.disabledRow.includes(row.params)) {
            return false  
        }
        return true
    }
    const gridOptions = reactive<any>({
      border: true,
      showOverflow: true,
      // height: 400,
      showHeader: true,
      showFooter: false,
      keepSource: true,
      footerMethod: props.footerMethod,
      footerCellClassName: styles.footerCell,
      editConfig: {
        trigger: 'click',
        mode: 'row',
        showStatus: true,
        beforeEditMethod
      },
      columns: [],
      data: []
    })

    watch(
        props,
        (newData) => {
            gridOptions.data = newData.data
            gridOptions.columns = newData.columns
            gridOptions.showFooter = false
            if(!isUndefined(newData.footerMethod)) {
                gridOptions.showFooter = true
                gridOptions.footerMethod = newData.footerMethod
            } 
            
        },
        {deep: true, immediate: true}
    )


    // // eslint-disable-next-line vue/no-setup-props-destructure
    // gridOptions.data = props.data
    // // eslint-disable-next-line vue/no-setup-props-destructure
    // gridOptions.columns = props.columns

    return () => (
        <vxe-grid class={styles['reverse-table']} {...gridOptions}>
          {{
            edit: props.editRender
          }}
        </vxe-grid>
    )
  }
})
