import type { VxeTablePropTypes } from 'vxe-table'
import type { DatesType, ColType } from './useInitTable'
import dayjs from 'dayjs'

interface TempObj {
  datas: DatesType[] // useInitTable需要用到的数据对象
  column: ColType // useInitTable需要用到的列对象
  editRender?: Function // 编辑渲染方法
  footerMethod?: Function //表尾渲染方法
  hasFullYearTarget?: boolean // 是否有全年目标
}

  // 用来计算算完成率
  const divisionNum = (a: string, b: string) => {
    const res = Number(b) / Number(a)
    return isNaN(res) ? '-' : (res * 100).toFixed(1) + '%'
  }



  const queryWriteMonthStr = () => {
    const month = dayjs().get('month')
    return (month === 0 ? 12 : month) + '月'
  }

  // 表尾
export const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
    console.log(columns)
    return [
      columns.map((column, columnIndex) => {
        if (columnIndex === 0) {
          return queryWriteMonthStr() + '完成率'
        }
        if (data[0][column.property] && data[1][column.property]) {
          return divisionNum(data[0][column.property], data[1][column.property])
        }
        return '-'
      })
    ]
  }

export default function useChangeTable(tempType: string) {
  const cellFormatter = ({ row, column, rowIndex }: any, temp3: boolean = false) => {
    if (!row[column.field]) {
      // 如果没有数据
      return <span style={{ color: '#c0c4cc' }}>请编辑</span>
    }
    if (rowIndex == 0 && temp3) {
      // 如果有数据并且是第一行（需要展示两个值）并且是需要展示temp3
      return `${row[column.field] || ''} - ${column.params.endNo || ''}`
    }
    return `${row[column.field] || ''}`
  }

  // temp3 需要的编辑逻辑
  const editRender1 = (info: any) => {
    const { _rowIndex, data, column } = info
    switch (_rowIndex) {
      case 0:
        return (
          <a-input-group compact>
            <a-input
              size={'small'}
              v-model:value={data[_rowIndex][column.field]}
              style="width: 45%"
              placeholder="数量"
            />
            -
            <a-input
              size={'small'}
              v-model:value={column.params.endNo}
              style="width: 45%"
              placeholder="数量"
            />
          </a-input-group>
        )
      default:
        return <a-input v-model:value={data[_rowIndex][column.field]}></a-input>
    }
  }

  const editRender = (info: any) => {
    const { _rowIndex, data, column } = info
    return <a-input v-model:value={data[_rowIndex][column.field]}></a-input>
  }

  const tempStrategy: Record<string, TempObj> = {
    temp1: {
      datas: [
        { params: '全年目标值' },
        { params: queryWriteMonthStr() + '完成值' },
        { params: queryWriteMonthStr() + '完成率' }
      ],
      column: {
        editRender: {},
        slots: { edit: 'edit', default: cellFormatter }
      },
      hasFullYearTarget: false,
      editRender
    },
    temp2: {
      datas: [{ params: '全年目标值' }, { params: queryWriteMonthStr() + '完成值' }, { params: queryWriteMonthStr() + '完成率' }
    ],
      column: {
        editRender: {},
        slots: { edit: 'edit', default: cellFormatter }
      },
      hasFullYearTarget: false,
      editRender,
    //   footerMethod
    },
    temp3: {
      datas: [{ params: '全年目标值' }, { params: queryWriteMonthStr() + '完成情况' }],
      column: {
        params: { endNo: undefined },
        editRender: {},
        slots: {
          edit: 'edit',
          default: ({ row, column, rowIndex }: any) =>
            cellFormatter({ row, column, rowIndex }, true)
        }
      },
      hasFullYearTarget: false,
      editRender: editRender1
    },
    temp4: {
      datas: [{ params: queryWriteMonthStr() + '完成情况' }],
      column: {
        editRender: {},
        slots: { edit: 'edit', default: cellFormatter }
      },
      editRender
    },
    temp5: {
      datas: [{ params: '全年目标值' }, { params: queryWriteMonthStr() + '完成值' }],
      column: {
        editRender: {},
        slots: { edit: 'edit', default: cellFormatter }
      },
      hasFullYearTarget: false,
      editRender
    }
  }

  return tempStrategy[tempType]
}
