import { ref } from 'vue'
export default function jisuan1() {

  const listTable = [{
    TotalCount: "1",
    ListData: [
      {
        Id: "1",
        StatTypeId: "3",
        StatTask: "编制城市更新专项规划",
        StatOrgId: "3",
        StatOrgName: "办公室",
        StatOrgUserId: "u_180",
        StatOrgUserName: "陈寿旦",
        StatConcertUserName: "局领导",
        StatMonth: "1",
        CreateId: "dc7ab92a-7a30-44ba-bd1c-e3a5dde969f7",
        CreateName: "张郁楠_浙江申跃",
        CreateTime: "2023-05-21 18:39:27",
        Status: "1",
        StatContent: "1.西洪大桥、环城南路西延二期、鄞州大道-福庆路快速路（东钱湖段）实现通车。\n2.鄞州大道、世纪大道北延等项目推进桩基承台施工。\n3.环城南路东延、鄞州大道-福庆路1二期完成工可批复。",
        StatRemark: "1.固定资产投资同比增幅13.2%，其中城市更新完成投资85.26亿元，同比增幅61.5%，超额完成任务，全省排名第2位；房地产业（住房保障）完成投资503.3亿元，同比增幅7.8%。\n2.GDP支撑性指标中商品房销售面积完成242.34万平方米，同比增幅-41.9%；房地产工资总额完成24.20亿元，同比增幅10%；省内建筑业总产值一季度完成546.50亿元，同比增幅19.5%。",
        EditId: "null",
        EditName: "null",
        EditTime: "null",
        DetailList: [
          {
            Id: "1",
            TargetId: "1",
            DtCountyId: "HS",
            DtCounty: "海曙",
            DtTaregtValue: "null",
            DtCompletevalue: "正在采集",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0"
          },
          {
            Id: "2",
            TargetId: "1",
            DtCountyId: "JB",
            DtCounty: "江北",
            DtTaregtValue: "null",
            DtCompletevalue: "完成数据采集",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0"
          },
          {
            Id: "3",
            TargetId: "1",
            DtCountyId: "ZH",
            DtCounty: "镇海",
            DtTaregtValue: "null",
            DtCompletevalue: "完成指标",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0"
          },
          {
            Id: "4",
            TargetId: "1",
            DtCountyId: "BL",
            DtCounty: "北仑",
            DtTaregtValue: "null",
            DtCompletevalue: "正在采购",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0"
          },
          {
            Id: "5",
            TargetId: "1",
            DtCountyId: "YZ",
            DtCounty: "鄞州",
            DtTaregtValue: "null",
            DtCompletevalue: "正在采购",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0"
          },
          {
            Id: "6",
            TargetId: "1",
            DtCountyId: "FH",
            DtCounty: "奉化",
            DtTaregtValue: "null",
            DtCompletevalue: "数据指标",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0"
          },
          {
            Id: "7",
            TargetId: "1",
            DtCountyId: "YY",
            DtCounty: "余姚",
            DtTaregtValue: "null",
            DtCompletevalue: "指标体系",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0"
          },
          {
            Id: "8",
            TargetId: "1",
            DtCountyId: "CX",
            DtCounty: "慈溪",
            DtTaregtValue: "null",
            DtCompletevalue: "构建指标",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0"
          },
          {
            Id: "9",
            TargetId: "1",
            DtCountyId: "NH",
            DtCounty: "宁海",
            DtTaregtValue: "null",
            DtCompletevalue: "构建体系",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0"
          },
          {
            Id: "10",
            TargetId: "1",
            DtCountyId: "XS",
            DtCounty: "象山",
            DtTaregtValue: "null",
            DtCompletevalue: "完成数据采集",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0"
          },
          {
            Id: "11",
            TargetId: "1",
            DtCountyId: "QW",
            DtCounty: "前湾新区",
            DtTaregtValue: "null",
            DtCompletevalue: "完成数据采集",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0",
          },
          {
            Id: "12",
            TargetId: "1",
            DtCountyId: "GX",
            DtCounty: "高新区",
            DtTaregtValue: "null",
            DtCompletevalue: "构建体系",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0",
          },
          {
            Id: "13",
            TargetId: "1",
            DtCountyId: "DQ",
            DtCounty: "东钱湖",
            DtTaregtValue: "null",
            DtCompletevalue: "构建体系",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0",
          },
          {
            Id: "14",
            TargetId: "1",
            DtCountyId: "QS",
            DtCounty: "全市合计",
            DtTaregtValue: "null",
            DtCompletevalue: "构建体系",
            DtCompleterate: "null",
            DtMonth: "1",
            StatTypeId: "3",
            DtStatus: "0",
          }
        ],
        OtherList: "null",
      }
    ]
  }]
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
    all: '',
  }
  const jidu = ['一', '二', '三', '四']

  const target: any = {}
  const complete: any = {}
  const rate: any = {}

  const sumList: any = ref({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const jisuan2 = () => {
    console.log('listTable', (listTable[0].ListData)[0])
    const list = (listTable[0].ListData)[0].DetailList
    for (const [index, item] of list.entries()) {
      {
        // const title = jidu[Number(item.DtMonth) - 1] + "季度"
        target[item.DtCountyId] = item.DtTaregtValue
        complete[item.DtCountyId] = item.DtCompletevalue
        rate[item.DtCountyId] = item.DtCompleterate
      }
      target.title = jidu[Number(item.DtMonth) - 1] + "季度目标"
      complete.title = jidu[Number(item.DtMonth) - 1] + "季度完成"
      rate.title = jidu[Number(item.DtMonth) - 1] + "季度完成率"
    }
    sumList.value = {
      StatTask: (listTable[0].ListData)[0].StatTask,
      StatOrgName: (listTable[0].ListData)[0].StatOrgName,
      StatConcertUserName: (listTable[0].ListData)[0].StatConcertUserName,
      StatOrgUserName: (listTable[0].ListData)[0].StatOrgUserName,
      StatTypeId: (listTable[0].ListData)[0].StatTypeId,
      finishInfo: []
    }
    sumList.value.finishInfo.push(target)
    sumList.value.finishInfo.push(complete)
    sumList.value.finishInfo.push(rate)
    console.log(sumList.value)
  }
  return {
    sumList,
    jisuan2
  }

}