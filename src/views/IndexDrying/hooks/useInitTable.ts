import { ref, reactive } from 'vue'
import styles from '../components/tableTemp.module.less'
import { isUndefined, cloneDeep } from 'lodash'

export interface DatesType {
  params: string
}

interface ParamsType {
  endNo: string | undefined
}

interface SlotsType {
  edit: string
  default: Function
}

export interface ColType {
  params?: ParamsType
  editRender?: any
  slots?: SlotsType
}

export default function useInitTable(datas: DatesType[] | undefined, col: ColType | undefined) {
  if (isUndefined(datas)) {
    datas = []
  }
  
  const dataSource: any = ref(datas?.map((item) => {
    const dataTemp = {
      HS: undefined,
      JB: undefined,
      ZH: undefined,
      BL: undefined,
      YZ: undefined,
      FH: undefined,
      YY: undefined,
      CX: undefined,
      NH: undefined,
      XS: undefined,
      QW: undefined,
      GX: undefined,
      DQ: undefined,
      QS: undefined
    }
    return Object.assign(item, dataTemp)
  }))

  const colTemp = [
    { field: 'params', title: '', className: styles.col1 },
    {
      field: 'HS',
      title: '海曙'
    },
    {
      field: 'JB',
      title: '江北'
    },
    {
      field: 'ZH',
      title: '镇海'
    },
    {
      field: 'BL',
      title: '北仑'
    },
    {
      field: 'YZ',
      title: '鄞州'
    },
    {
      field: 'FH',
      title: '奉化'
    },
    {
      field: 'YY',
      title: '余姚'
    },
    {
      field: 'CX',
      title: '慈溪'
    },
    {
      field: 'NH',
      title: '宁海'
    },
    {
      field: 'XS',
      title: '象山'
    },
    {
      field: 'QW',
      title: '前湾新区'
    },
    {
      field: 'GX',
      title: '高新区'
    },
    {
      field: 'DQ',
      title: '东钱湖'
    },
    {
      field: 'QS',
      title: '全市合计'
    }
  ]

  const columns: any = ref(colTemp.map((item) => {
    if (item.field === 'params') {
      return item
    }
    return Object.assign(item, cloneDeep(col))
  }))

  

  return { dataSource, columns }
}
