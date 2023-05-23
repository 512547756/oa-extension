import { ref, computed, onMounted } from 'vue'
export default function lastDetailHook() {
  /**列名 */
  const columns = ref<any>([
    {
      title: '',
      dataIndex: 'index',
      key: 'index'
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

  return {
    columns
  }
}
