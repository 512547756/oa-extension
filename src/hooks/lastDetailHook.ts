import { ref, computed, onMounted } from 'vue'
export default function lastDetailHook() {
  /**列名 */
  const columns = ref<any>([
    {
      title: '',
      dataIndex: 'title',
      key: 'title',
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


  const jidu = ['一', '二', '三', '四']

  const target: any = {}
  const complete: any = {}
  const rate: any = {}

  const sumList: any = ref([{}])

  const taskList = (data: any) => {
    // if (Object.keys(data).length === 1) {
    //   return {}
    // }
    sumList.value = []
    // console.log('(listTable[0].ListData)[0].DetailList', (listTable[0].ListData)[0].DetailList)
    // const list = (listTable[0].ListData)[0].DetailList
    // console.log('data', data)
    for (const [index, item] of data.OtherList.entries()) {
      // console.log('item', item)
      target[item.DtCountyId] = item.DtTaregtValue
      complete[item.DtCountyId] = item.DtCompletevalue
      rate[item.DtCountyId] = item.DtCompleterate

      switch (data.StatTypeId) {
        case 2: {
          target.title = "目标值"
          complete.title = "完成值"
          rate.title = "完成率"
          break
        }
        case 3: {
          // target.title = jidu[Number(item.DtMonth.substring(4, 6)) - 1] + "季度目标"
          complete.title = "完成情况"
          // rate.title = jidu[Number(item.DtMonth.substring(4, 6)) - 1] + "季度完成率"
          break
        }
      }
    }
    sumList.value = {
      Id: data.Id,
      StatTask: data.StatTask,
      StatOrgName: data.StatOrgName,
      StatConcertUserName: data.StatConcertUserName,
      StatOrgUserName: data.StatOrgUserName,
      StatTypeId: data.StatTypeId,
      finishInfo: []
    }
    switch (data.StatTypeId) {
      case 3: {
        // sumList.value[i].finishInfo.push(target)
        sumList.value.finishInfo.push(complete)
        // sumList.value[i].finishInfo.push(rate)
        break
      }
    }
    // sumList.value.push(dataSource)
    console.log('sumList.value.finishInfo', sumList.value.finishInfo)
    return sumList.value.finishInfo
  }

  return {
    columns,
    taskList
  }
}
