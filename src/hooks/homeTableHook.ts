import { ref, computed, onMounted } from 'vue'
export default function finishDataHook() {
  const inputData: any = {
    HS: '',
    JB: '',
    ZH: '',
    BL: '',
    YZ: '',
    FH: '',
    YY: '',
    CX: '',
    NH: '',
    XS: '',
    QW: '',
    GX: '',
    DQ: '',
    QS: '',
  }
  const jidu = ['一', '二', '三', '四']

  const target: any = {}
  const complete: any = {}
  const rate: any = {}

  const sumList: any = ref([{}])





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

  // antTable计算合并
  const sharedOnCell = (_: any, index: number) => {
    // console.log('newRowList', newRowList)
    // if (newRowList[0] !== 1) {
    //   newRowList.unshift(0)
    // }
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
      dataIndex: 'StatTask',
      key: 'StatTask',
      customCell: sharedOnCell
    },
    {
      title: '负责人',
      dataIndex: 'StatOrgUserName',
      key: 'StatOrgUserName',
      // customCell: sharedOnCell
    },
    {
      title: '完成情况',
      dataIndex: 'finishInfo',
      key: 'finishInfo'
    },
    {
      title: '海曙',
      dataIndex: 'HS',
      key: 'HS'
    },
    {
      title: '江北',
      dataIndex: 'JB',
      key: 'JB'
    },
    {
      title: '镇海',
      dataIndex: 'ZH',
      key: 'ZH'
    },
    {
      title: '北仑',
      dataIndex: 'BL',
      key: 'BL'
    },
    {
      title: '鄞州',
      dataIndex: 'YZ',
      key: 'YZ'
    },
    {
      title: '奉化',
      dataIndex: 'FH',
      key: 'FH'
    },
    {
      title: '余姚',
      dataIndex: 'YY',
      key: 'YY'
    },
    {
      title: '慈溪',
      dataIndex: 'CX',
      key: 'CX'
    },
    {
      title: '宁海',
      dataIndex: 'NH',
      key: 'NH'
    },
    {
      title: '象山',
      dataIndex: 'XS',
      key: 'XS'
    },
    {
      title: '前湾新区',
      dataIndex: 'QW',
      key: 'QW'
    },
    {
      title: '高新区',
      dataIndex: 'GX',
      key: 'GX'
    },
    {
      title: '东钱湖',
      dataIndex: 'DQ',
      key: 'DQ'
    },
    {
      title: '全市合计',
      dataIndex: 'QS',
      key: 'QS'
    }
  ])

  // const inputData = {
  //   HS: '',
  //   JB: '',
  //   ZH: '',
  //   BL: '',
  //   YZ: '',
  //   FH: '',
  //   YY: '',
  //   CX: '',
  //   NH: '',
  //   XS: '',
  //   QW: '',
  //   GX: '',
  //   DQ: '',
  //   QS: '',
  // }
  /**表内数据 */
  const dataSource = ref<any>([
    {
      id: '1234',
      StatTask: '实现公租房保障11',
      metricType: '类型一',
      StatOrgName: '轨空处',
      StatOrgUserName: '小明',
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
      StatTask: '城市更新223',
      finishInfo: [
        {
          index: '2',
          title: '全年目标值',
          HS: '200',
          JB: '200',
          ZH: '200',
          BL: '200',
          YZ: '200',
          FH: '200',
          YY: '200',
          CX: '200',
          NH: '200',
          XS: '200',
          QW: '200',
          GX: '200',
          DQ: '200'
        },
        {
          title: '一季度目标值',
          HS: '100',
          JB: '100',
          ZH: '100',
          BL: '100',
          YZ: '100',
          FH: '100',
          YY: '100',
          CX: '100',
          NH: '100',
          XS: '100',
          QW: '100',
          GX: '100',
          DQ: '100'
        },
        {
          title: '一季度完成值',
          HS: '100',
          JB: '100',
          ZH: '100',
          BL: '100',
          YZ: '100',
          FH: '100',
          YY: '100',
          CX: '100',
          NH: '100',
          XS: '100',
          QW: '100',
          GX: '100',
          DQ: '100'
        },
        {
          title: '一季度完成率',
          HS: '100%',
          JB: '100%',
          ZH: '100%',
          BL: '100%',
          YZ: '100%',
          FH: '100%',
          YY: '100%',
          CX: '100%',
          NH: '100%',
          XS: '100%',
          QW: '100%',
          GX: '100%',
          DQ: '100%'
        }
      ]
    },
    {
      StatTask: '房地产业工资总额全年目标（增幅%）',
      // colSpan: 2,
      // customCell: { rowSpan: 2 },
      id: '10000',
      StatTypeId: '类型二',
      StatOrgName: 'A处',
      StatOrgUserName: '小红',
      StatConcertUserName: 'C处',
      filerPerson: '无',
      finishInfo: [
        {
          index: '3',
          title: '目标值',
          HS: '8',
          JB: '8',
          ZH: '8',
          BL: '8',
          YZ: '8',
          FH: '8',
          YY: '8',
          CX: '8',
          NH: '8',
          XS: '8',
          QW: '8',
          GX: '8',
          DQ: '8'
        },
        {
          title: '完成值',
          HS: '80%',
          JB: '80%',
          ZH: '80%',
          BL: '80%',
          YZ: '80%',
          FH: '80%',
          YY: '80%',
          CX: '80%',
          NH: '80%',
          XS: '80%',
          QW: '80%',
          GX: '80%',
          DQ: '80%'
        }
      ]
    },
    {
      StatTask: '加强城市治理',
      StatTypeId: '类型一',
      StatOrgName: 'C处',
      StatOrgUserName: '小李',
      StatConcertUserName: '无',
      filerPerson: '张三',
      finishInfo: [
        {
          index: '4',
          title: '社区治理创新',
          HS: '78.5%',
          JB: '83%',
          ZH: '80%',
          BL: '80%',
          YZ: '80%',
          FH: '80%',
          YY: '80%',
          CX: '80%',
          NH: '80%',
          XS: '80%',
          QW: '80%',
          GX: '80%',
          DQ: '80%'
        },
        {
          title: '治理非法商贸市场',
          HS: '92.3%',
          JB: '95.7%',
          ZH: '80%',
          BL: '80%',
          YZ: '80%',
          FH: '80%',
          YY: '80%',
          CX: '80%',
          NH: '80%',
          XS: '80%',
          QW: '80%',
          GX: '80%',
          DQ: '80%'
        },
        {
          title: '城市管理合规化',
          HS: '87.8%',
          JB: '91.2%',
          ZH: '80%',
          BL: '80%',
          YZ: '80%',
          FH: '80%',
          YY: '80%',
          CX: '80%',
          NH: '80%',
          XS: '80%',
          QW: '80%',
          GX: '80%',
          DQ: '80%'
        },
        {
          title: '城市管理智能化',
          HS: '23.7%',
          JB: '29.1%',
          ZH: '80%',
          BL: '80%',
          YZ: '80%',
          FH: '80%',
          YY: '80%',
          CX: '80%',
          NH: '80%',
          XS: '80%',
          QW: '80%',
          GX: '80%',
          DQ: '80%'
        },
        {
          title: '加强执法监管能力建设',
          HS: '15.2%',
          JB: '20.6%',
          ZH: '80%',
          BL: '80%',
          YZ: '80%',
          FH: '80%',
          YY: '80%',
          CX: '80%',
          NH: '80%',
          XS: '80%',
          QW: '80%',
          GX: '80%',
          DQ: '80%'
        }
      ]
    },
    {
      StatTask: '加强城市治理222',
      finishInfo: [
        {
          title: '社区治理创新',
          HS: '78.5%',
          JB: '83%'
        },
        {
          title: '治理非法商贸市场',
          HS: '92.3%',
          JB: '95.7%'
        },
        {
          title: '城市管理合规化',
          HS: '87.8%',
          JB: '91.2%'
        },
        {
          title: '城市管理智能化',
          HS: '23.7%',
          JB: '29.1%'
        },
        {
          title: '加强执法监管能力建设',
          HS: '15.2%',
          JB: '20.6%'
        }
      ]
    },
    {
      StatTask: '加强城市治理3333',
      finishInfo: [
        {
          title: '社区治理创新',
          HS: '78.5%',
          JB: '83%'
        },
        {
          title: '治理非法商贸市场',
          HS: '92.3%',
          JB: '95.7%'
        },
        {
          title: '城市管理合规化',
          HS: '87.8%',
          JB: '91.2%'
        },
        {
          title: '城市管理智能化',
          HS: '23.7%',
          JB: '29.1%'
        },
        {
          title: '加强执法监管能力建设',
          HS: '15.2%',
          JB: '20.6%'
        }
      ]
    }
  ])


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const jisuan2 = (data: any) => {
    // console.log('(listTable[0].ListData)[0].DetailList', (listTable[0].ListData)[0].DetailList)
    // const list = (listTable[0].ListData)[0].DetailList
    console.log('data', data)
    for (const [i, list] of data.entries()) {
      for (const [index, item] of list.DetailList.entries()) {

        target[item.DtCountyId] = item.DtTaregtValue
        complete[item.DtCountyId] = item.DtCompletevalue
        rate[item.DtCountyId] = item.DtCompleterate

        switch (data[i].StatTypeId) {
          case 3: {
            // target.title = jidu[Number(item.DtMonth.substring(4, 6)) - 1] + "季度目标"
            complete.title = "完成情况"
            // rate.title = jidu[Number(item.DtMonth.substring(4, 6)) - 1] + "季度完成率"
            break
          }
        }
      }
      console.log('data[i]', data[i])
      sumList.value[i] = {
        Id: data[i].Id,
        StatTask: data[i].StatTask,
        StatOrgName: data[i].StatOrgName,
        StatConcertUserName: data[i].StatConcertUserName,
        StatOrgUserName: data[i].StatOrgUserName,
        StatTypeId: data[i].StatTypeId,
        finishInfo: []
      }
      switch (data[i].StatTypeId) {
        case 3: {
          // sumList.value[i].finishInfo.push(target)
          sumList.value[i].finishInfo.push(complete)
          // sumList.value[i].finishInfo.push(rate)
          break
        }
      }
    }
    // sumList.value.push(dataSource)
    console.log('sumList.value', sumList.value)
    return sumList.value
  }




  let currentIndex = 0
  const getMergeCells = (data: any) => {
    newDataSource.value = []
    mergeIndex = 0
    // mergeCells.value = 
    console.log('data', data)

    // antTable
    // dataSource.value = []
    // data.value[0] = sumList.value
    // if (Object.keys(data.value[0].finishInfo).length > 1) {
    //   rowList.unshift(0)
    // }

    for (const [index, value] of data.entries()) {
      currentIndex += 1
      console.log('value', value)
      // 获取finishInfo长度
      const finishInfoLength = Object.keys(value.finishInfo).length

      mergeCells.value[mergeIndex] = { row: historyRow, col: 2, rowspan: finishInfoLength, colspan: 1 }
      mergeIndex += 1
      mergeCells.value[mergeIndex] = { row: historyRow, col: 1, rowspan: finishInfoLength, colspan: 1 }
      mergeIndex += 1
      mergeCells.value[mergeIndex] = { row: historyRow, col: 0, rowspan: finishInfoLength, colspan: 1 }
      mergeIndex += 1
      // console.log('dataSource.value[index].finishInfo', dataSource.value[index].finishInfo)
      for (const [index2, item] of value.finishInfo.entries()) {
        const a = {
          index: currentIndex,
          StatTask: value.StatTask,
          finishInfo: item.title,
          StatTypeId: value.StatTypeId,
          StatOrgName: value.StatOrgName,
          StatOrgUserName: value.StatOrgUserName,
          StatConcertUserName: value.StatConcertUserName,
          filerPerson: value.filerPerson,
          Id: value.Id,
          ...item
        }
        newDataSource.value[newIndex] = a
        newIndex += 1
      }
      console.log('newDataSource', newDataSource.value)
      if (pageLength + finishInfoLength > 10) {
        pageSizeChangeList.push(pageLength)
        pageLength = finishInfoLength
      } else {
        pageLength = pageLength + finishInfoLength
      }
      historyRow = finishInfoLength + historyRow
      rowList.push(historyRow)
      newRowList = rowList
      // newRowList.unshift(0)
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
    dataSource,
    columns,
    pageSize,
    newDataSource,
    mergeCells,
    pageLength,
    getMergeCells,
    changePage,
    jisuan2,
    sumList
    // tableData,
    // pagination,
    // handleTableChange,
    // handleTableData,
  }
}
