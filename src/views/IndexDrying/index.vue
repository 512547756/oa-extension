<template>
  <div>
    <TableTemp
      v-model:data="dataSource"
      v-model:columns="columns"
      v-bind="tempProps"
    ></TableTemp>
  </div>
</template>

<script lang="ts" setup name="">
import useInitTable from '../IndexDrying/hooks/useInitTable'
import useChangeTable from './hooks/useChangeTable'
import TableTemp from './components/tableTemp'

const tempProps = useChangeTable('temp1')
const { dataSource, columns } = useInitTable(tempProps.datas, tempProps.column)

tempProps.hasFullYearTarget = false // 如果有数据控制全年目标不让填写
// 根据数据填充全年目标
// columns.value.forEach((v: any) => { // 如果是模板3的全年目标 需要向columns.params.endNo中将第二个参数传入
//     switch(v.field){
//         case "hs":
//             v.params.endNo = 2
//             break
//         case "jb":
//             v.params.endNo = 2
//             break
//         //...
//     }
// })
const qnmbRow: any = dataSource.value.find((v: any) => v.params === '全年目标值')
qnmbRow.hs = 2
qnmbRow.jb = 3
qnmbRow.zh = 3
qnmbRow.bl = 1
qnmbRow.yz = 3
qnmbRow.fh = 3
qnmbRow.yy = 3
qnmbRow.cx = 3
qnmbRow.nh = 3
qnmbRow.xs = 3
qnmbRow.qwxq = 3
qnmbRow.gxq = 3
qnmbRow.dqh = 3
qnmbRow.qshj = 3
</script>
