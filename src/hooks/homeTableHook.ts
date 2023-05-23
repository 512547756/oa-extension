import { ref, computed, onMounted } from 'vue'
export default function finishDataHook() {
  /**合并行列 */
  const mergeCells = ref<any>([])

  /**合并几行 */
  let ainclude: any = []

  const arrSum = ref<any>([])

  let rowListIndex = -1

  const loading = ref(false)

  const rowList: Array<number> = []

  let newRowList: any = []

  const newDataSource = ref<any>([])

  let historyRow = 0

  let newIndex = 0

  let mergeIndex = 0

  const pageSizeChangeList: number[] = []

  let pageLength = 0

  const sharedOnCell = (_: any, index: number) => {
    if (newRowList.includes(index)) {
      rowListIndex = newRowList.findIndex((value: number) => value == index)
      ainclude = Array.from(
        { length: newRowList[rowListIndex + 1] - newRowList[rowListIndex] },
        (x, i) => i + newRowList[rowListIndex]
      )
      // rowListIndex += 1
      // ainclude = Array.from({ length: newRowList[rowListIndex + 1] - newRowList[rowListIndex] }, (x, i) => i + newRowList[rowListIndex])
      return { rowSpan: newRowList[rowListIndex + 1] - newRowList[rowListIndex] }
    }
    if (ainclude.includes(index)) {
      // console.log(ainclude)
      return { rowSpan: 0 }
    }
    // if
    // for (const [index, value] of arrSum.value.entries()) {
    // if (value.rowspan > 1) {
    //   const start = value.row
    //   const end = value.row + value.rowspan
    //   const arr = Array.from({ length: end - start }, (x, i) => i + start)
    //   console.log(arr)

    // if (index === value.row) {
    //   return { rowSpan: value.rowspan };
    // }
    // // These two are merged into above cell
    // if (arr.includes(index)) {
    //   return { rowSpan: 0 };
    // }
    // }
    // }
  }

  /**列名 */
  const columns = ref<any>([
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      customCell: sharedOnCell
    },
    {
      title: '工作任务',
      dataIndex: 'workTasks',
      key: 'workTasks',
      customCell: sharedOnCell
    },
    {
      title: '完成情况',
      dataIndex: 'finishInfo',
      key: 'finishInfo'
    },
    {
      title: '海曙',
      dataIndex: 'haiShu',
      key: 'haiShu'
    },
    {
      title: '江北',
      dataIndex: 'jiangBei',
      key: 'jiangBei'
    },
    {
      title: '镇海',
      dataIndex: 'zhenHai',
      key: 'zhenHai'
    },
    {
      title: '北仑',
      dataIndex: 'beiLun',
      key: 'beiLun'
    },
    {
      title: '鄞州',
      dataIndex: 'yinZhou',
      key: 'yinZhou'
    },
    {
      title: '奉化',
      dataIndex: 'fengHua',
      key: 'fengHua'
    },
    {
      title: '余姚',
      dataIndex: 'yuYao',
      key: 'yuYao'
    },
    {
      title: '慈溪',
      dataIndex: 'ciXi',
      key: 'ciXi'
    },
    {
      title: '宁海',
      dataIndex: 'ningHai',
      key: 'ningHai'
    },
    {
      title: '象山',
      dataIndex: 'xiangShan',
      key: 'xiangShan'
    },
    {
      title: '前湾新区',
      dataIndex: 'qianWanXinQu',
      key: 'qianWanXinQu'
    },
    {
      title: '高新区',
      dataIndex: 'gaoXinQu',
      key: 'gaoXinQu'
    },
    {
      title: '东钱湖',
      dataIndex: 'dongQianHu',
      key: 'dongQianHu'
    },
    {
      title: '全市合计',
      dataIndex: 'all',
      key: 'all'
    }
  ])

  // const inputData = {
  //   haiShu: '',
  //   jiangBei: '',
  //   zhenHai: '',
  //   beiLun: '',
  //   yinZhou: '',
  //   fengHua: '',
  //   yuYao: '',
  //   ciXi: '',
  //   ningHai: '',
  //   xiangShan: '',
  //   qianWanXinQu: '',
  //   gaoXinQu: '',
  //   dongQianHu: '',
  //   all: '',
  // }
  /**表内数据 */
  const dataSource = ref<any>([
    {
      id: '1234',
      workTasks: '实现公租房保障11',
      metricType: '类型一',
      responsibilityDivision: '轨空处',
      leaderShip: '小明',
      cooperateOffice: '无',
      filerPerson: '张三、李四',
      finishInfo: [
        {
          index: '1',
          title: '完成情况',
          haiShu: '已完成',
          jiangBei: '未完成',
          zhenHai: '已完成',
          beiLun: '已完成',
          yinZhou: '已完成',
          fengHua: '已完成',
          yuYao: '未完成',
          ciXi: '未完成',
          ningHai: '已完成',
          xiangShan: '已完成',
          qianWanXinQu: '已完成',
          gaoXinQu: '已完成',
          dongQianHu: '已完成'
        }
      ]
    },
    {
      workTasks: '城市更新223',
      finishInfo: [
        {
          index: '2',
          title: '全年目标值',
          haiShu: '200',
          jiangBei: '200',
          zhenHai: '200',
          beiLun: '200',
          yinZhou: '200',
          fengHua: '200',
          yuYao: '200',
          ciXi: '200',
          ningHai: '200',
          xiangShan: '200',
          qianWanXinQu: '200',
          gaoXinQu: '200',
          dongQianHu: '200'
        },
        {
          title: '一季度目标值',
          haiShu: '100',
          jiangBei: '100',
          zhenHai: '100',
          beiLun: '100',
          yinZhou: '100',
          fengHua: '100',
          yuYao: '100',
          ciXi: '100',
          ningHai: '100',
          xiangShan: '100',
          qianWanXinQu: '100',
          gaoXinQu: '100',
          dongQianHu: '100'
        },
        {
          title: '一季度完成值',
          haiShu: '100',
          jiangBei: '100',
          zhenHai: '100',
          beiLun: '100',
          yinZhou: '100',
          fengHua: '100',
          yuYao: '100',
          ciXi: '100',
          ningHai: '100',
          xiangShan: '100',
          qianWanXinQu: '100',
          gaoXinQu: '100',
          dongQianHu: '100'
        },
        {
          title: '一季度完成率',
          haiShu: '100%',
          jiangBei: '100%',
          zhenHai: '100%',
          beiLun: '100%',
          yinZhou: '100%',
          fengHua: '100%',
          yuYao: '100%',
          ciXi: '100%',
          ningHai: '100%',
          xiangShan: '100%',
          qianWanXinQu: '100%',
          gaoXinQu: '100%',
          dongQianHu: '100%'
        }
      ]
    },
    {
      workTasks: '房地产业工资总额全年目标（增幅%）',
      // colSpan: 2,
      // customCell: { rowSpan: 2 },
      id: '10000',
      metricType: '类型二',
      responsibilityDivision: 'A处',
      leaderShip: '小红',
      cooperateOffice: 'C处',
      filerPerson: '无',
      finishInfo: [
        {
          index: '3',
          title: '目标值',
          haiShu: '8',
          jiangBei: '8',
          zhenHai: '8',
          beiLun: '8',
          yinZhou: '8',
          fengHua: '8',
          yuYao: '8',
          ciXi: '8',
          ningHai: '8',
          xiangShan: '8',
          qianWanXinQu: '8',
          gaoXinQu: '8',
          dongQianHu: '8'
        },
        {
          title: '完成值',
          haiShu: '80%',
          jiangBei: '80%',
          zhenHai: '80%',
          beiLun: '80%',
          yinZhou: '80%',
          fengHua: '80%',
          yuYao: '80%',
          ciXi: '80%',
          ningHai: '80%',
          xiangShan: '80%',
          qianWanXinQu: '80%',
          gaoXinQu: '80%',
          dongQianHu: '80%'
        }
      ]
    },
    {
      workTasks: '加强城市治理',
      metricType: '类型一',
      responsibilityDivision: 'C处',
      leaderShip: '小李',
      cooperateOffice: '无',
      filerPerson: '张三',
      finishInfo: [
        {
          index: '4',
          title: '社区治理创新',
          haiShu: '78.5%',
          jiangBei: '83%',
          zhenHai: '80%',
          beiLun: '80%',
          yinZhou: '80%',
          fengHua: '80%',
          yuYao: '80%',
          ciXi: '80%',
          ningHai: '80%',
          xiangShan: '80%',
          qianWanXinQu: '80%',
          gaoXinQu: '80%',
          dongQianHu: '80%'
        },
        {
          title: '治理非法商贸市场',
          haiShu: '92.3%',
          jiangBei: '95.7%',
          zhenHai: '80%',
          beiLun: '80%',
          yinZhou: '80%',
          fengHua: '80%',
          yuYao: '80%',
          ciXi: '80%',
          ningHai: '80%',
          xiangShan: '80%',
          qianWanXinQu: '80%',
          gaoXinQu: '80%',
          dongQianHu: '80%'
        },
        {
          title: '城市管理合规化',
          haiShu: '87.8%',
          jiangBei: '91.2%',
          zhenHai: '80%',
          beiLun: '80%',
          yinZhou: '80%',
          fengHua: '80%',
          yuYao: '80%',
          ciXi: '80%',
          ningHai: '80%',
          xiangShan: '80%',
          qianWanXinQu: '80%',
          gaoXinQu: '80%',
          dongQianHu: '80%'
        },
        {
          title: '城市管理智能化',
          haiShu: '23.7%',
          jiangBei: '29.1%',
          zhenHai: '80%',
          beiLun: '80%',
          yinZhou: '80%',
          fengHua: '80%',
          yuYao: '80%',
          ciXi: '80%',
          ningHai: '80%',
          xiangShan: '80%',
          qianWanXinQu: '80%',
          gaoXinQu: '80%',
          dongQianHu: '80%'
        },
        {
          title: '加强执法监管能力建设',
          haiShu: '15.2%',
          jiangBei: '20.6%',
          zhenHai: '80%',
          beiLun: '80%',
          yinZhou: '80%',
          fengHua: '80%',
          yuYao: '80%',
          ciXi: '80%',
          ningHai: '80%',
          xiangShan: '80%',
          qianWanXinQu: '80%',
          gaoXinQu: '80%',
          dongQianHu: '80%'
        }
      ]
    },
    {
      workTasks: '加强城市治理222',
      finishInfo: [
        {
          title: '社区治理创新',
          haiShu: '78.5%',
          jiangBei: '83%'
        },
        {
          title: '治理非法商贸市场',
          haiShu: '92.3%',
          jiangBei: '95.7%'
        },
        {
          title: '城市管理合规化',
          haiShu: '87.8%',
          jiangBei: '91.2%'
        },
        {
          title: '城市管理智能化',
          haiShu: '23.7%',
          jiangBei: '29.1%'
        },
        {
          title: '加强执法监管能力建设',
          haiShu: '15.2%',
          jiangBei: '20.6%'
        }
      ]
    },
    {
      workTasks: '加强城市治理3333',
      finishInfo: [
        {
          title: '社区治理创新',
          haiShu: '78.5%',
          jiangBei: '83%'
        },
        {
          title: '治理非法商贸市场',
          haiShu: '92.3%',
          jiangBei: '95.7%'
        },
        {
          title: '城市管理合规化',
          haiShu: '87.8%',
          jiangBei: '91.2%'
        },
        {
          title: '城市管理智能化',
          haiShu: '23.7%',
          jiangBei: '29.1%'
        },
        {
          title: '加强执法监管能力建设',
          haiShu: '15.2%',
          jiangBei: '20.6%'
        }
      ]
    }
  ])

  const getMergeCells = () => {
    for (const [index, value] of dataSource.value.entries()) {
      // 获取finishInfo长度
      const finishInfoLength = Object.keys(value.finishInfo).length

      mergeCells.value[mergeIndex] = {
        row: historyRow,
        col: 2,
        rowspan: finishInfoLength,
        colspan: 1
      }
      mergeIndex += 1
      // mergeCells.value[mergeIndex] = { row: historyRow, col: 1, rowspan: finishInfoLength, colspan: 1 }
      // mergeIndex += 1
      // mergeCells.value[mergeIndex] = { row: historyRow, col: 0, rowspan: finishInfoLength, colspan: 1 }
      // mergeIndex += 1
      // console.log('dataSource.value[index].finishInfo', dataSource.value[index].finishInfo)
      for (const [index2, item] of value.finishInfo.entries()) {
        const a = {
          id: value.id,
          workTasks: value.workTasks,
          finishInfo: item.title,
          metricType: value.metricType,
          responsibilityDivision: value.responsibilityDivision,
          leaderShip: value.leaderShip,
          cooperateOffice: value.cooperateOffice,
          filerPerson: value.filerPerson,
          ...item
        }
        newDataSource.value[newIndex] = a
        newIndex += 1
      }
      if (pageLength + finishInfoLength > 10) {
        pageSizeChangeList.push(pageLength)
        pageLength = finishInfoLength
      } else {
        pageLength = pageLength + finishInfoLength
      }
      historyRow = finishInfoLength + historyRow
      rowList.push(historyRow)
      newRowList = rowList
    }

    for (const [index, value] of mergeCells.value.entries()) {
      if (value.rowspan > 1) {
        const start = value.row
        const end = value.row + value.rowspan
        const arr = Array.from({ length: end - start }, (x, i) => i + start)
        // console.log('arr', arr)
        arrSum.value[index] = arr
      }
    }
    pageSizeChangeList.push(10)
  }

  const pageSize = ref<number>(4)

  // 翻页
  const changePage = (currentPage: number) => {
    // pageSizeChange = rowList.filter(item => item <= (currentPage - 1) * 10)[-1]
    // const changeRowList = rowList.filter(item => item > (currentPage - 1) * 10)
    const changeRowList = rowList.filter(
      (item) => item > (currentPage - 1) * pageSizeChangeList[currentPage - 1]
    )
    pageSize.value = pageSizeChangeList[currentPage - 1]
    newRowList = changeRowList.map(function (index) {
      return index - (currentPage - 1) * 10
    })
    newRowList.unshift(0)
    rowListIndex = -1
  }

  // getMergeCells()

  return {
    loading,
    columns,
    pageSize,
    newDataSource,
    mergeCells,
    pageLength,
    getMergeCells,
    changePage
    // tableData,
    // pagination,
    // handleTableChange,
    // handleTableData,
  }
}
