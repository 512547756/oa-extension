import { ref, computed } from 'vue'
export default function finishDataHook() {
  /**列名 */
  const columns = ref<any>([
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '工作任务',
      dataIndex: 'StatTask',
      key: 'StatTask',
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

  const inputData = {
    haiShu: '',
    jiangBei: '',
    zhenHai: '',
    beiLun: '',
    yinZhou: '',
    fengHua: '',
    yuYao: '',
    ciXi: '',
    ningHai: '',
    xiangShan: '',
    qianWanXinQu: '',
    gaoXinQu: '',
    dongQianHu: '',
    all: ''
  }
  /**表内数据 */
  const dataSource = ref<any>()

  /**根据指标类型 选择模板 数据赋值 */
  const getDataSource = (type: string) => {
    switch (type) {
      case 'type1': {
        dataSource.value = [
          { key: 'allTarget', index: '全年目标值', ...inputData },
          { key: 'firstTarget', index: '一季度目标值', ...inputData },
          { key: 'firstCompletion', index: '一季度完成值', ...inputData },
          { key: 'firstCompletionRate', index: '一季度完成率', ...inputData },
          { key: 'secondTarget', index: '二季度目标值', ...inputData },
          { key: 'secondCompletion', index: '二季度完成值', ...inputData },
          { key: 'secondCompletionRate', index: '二季度完成率', ...inputData }
        ]
        break
      }
      case 'type2': {
        dataSource.value = [
          { key: 'target', index: '目标值', ...inputData },
          { key: 'completion', index: '完成值', ...inputData },
          { key: 'completionRate', index: '完成率', ...inputData }
        ]
        break
      }
    }
  }

  return {
    columns,
    dataSource,
    getDataSource
  }
}
