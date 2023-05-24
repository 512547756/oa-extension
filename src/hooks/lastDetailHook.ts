import { ref, computed, onMounted } from 'vue'
export default function lastDetailHook() {
  /**列名 */
  const columns = ref<any>([
    {
      title: '序号',
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

  return {
    columns
  }
}
