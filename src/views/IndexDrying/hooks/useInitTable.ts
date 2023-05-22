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
      hs: undefined,
      jb: undefined,
      zh: undefined,
      bl: undefined,
      yz: undefined,
      fh: undefined,
      yy: undefined,
      cx: undefined,
      nh: undefined,
      xs: undefined,
      qwxq: undefined,
      gxq: undefined,
      dqh: undefined,
      qshj: undefined
    }
    return Object.assign(item, dataTemp)
  }))

  const colTemp = [
    { field: 'params', title: '', className: styles.col1 },
    {
      field: 'hs',
      title: '海曙'
    },
    {
      field: 'jb',
      title: '江北'
    },
    {
      field: 'zh',
      title: '镇海'
    },
    {
      field: 'bl',
      title: '北仑'
    },
    {
      field: 'yz',
      title: '鄞州'
    },
    {
      field: 'fh',
      title: '奉化'
    },
    {
      field: 'yy',
      title: '余姚'
    },
    {
      field: 'cx',
      title: '慈溪'
    },
    {
      field: 'nh',
      title: '宁海'
    },
    {
      field: 'xs',
      title: '象山'
    },
    {
      field: 'qwxq',
      title: '前湾新区'
    },
    {
      field: 'gxq',
      title: '高新区'
    },
    {
      field: 'dqh',
      title: '东钱湖'
    },
    {
      field: 'qshj',
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
