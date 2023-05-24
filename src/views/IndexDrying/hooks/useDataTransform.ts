// const areaObj: any ={
//     hs: {
//         title: '海曙',
//         value: 'HS'
//     },
//     jb: {
//         title: '江北',
//         value: 'JB'
//     },
//     zh: {
//         title: '镇海',
//         value: 'ZH'
//     },
//     bl: {
//         title: '北仑',
//         value: 'BL'
//     },
//     yz: {
//         title: '鄞州',
//         value: 'YZ'
//     },
//     fh: {
//         title: '奉化',
//         value: 'FH'
//     },
//     yy: {
//         title: '余姚',
//         value: 'YY'
//     },
//     cx: {
//         title: '慈溪',
//         value: 'CX'
//     },
//     nh: {
//         title: '宁海',
//         value: 'NH'
//     },
//     xs: {
//         title: '象山',
//         value: 'XS'
//     },
//     qwxq: {
//         title: '前湾新区',
//         value: 'QW'
//     },
//     gxq: {
//         title: '高新区',
//         value: 'GX'
//     },
//     dqh: {
//         title: '东钱湖',
//         value: 'DQ'
//     },
//     qshj: {
//         title: '全市合计',
//         value: 'QS'
//     }
// }

import { footerMethod } from './useChangeTable'
const getDetailList = (detailList: any, StatTypeId: number) => {
    const {columns, data } = detailList
    const list = detailList?.columns?.filter((v: any) => v.field!== 'params')?.map((item: any) => {
        const obj = {
            DtCountyId: item.field,
            DtCounty:item.title,
            DtTaregtValue: undefined,
            DtCompletevalue: undefined,
            DtCompleterate: undefined,
            DtMonth: undefined,
            StatTypeId: StatTypeId,
            DtStatus : undefined
        }
       
        detailList.data.forEach( (j: any) => {
            if(j.params === '全年目标值') {
                obj.DtTaregtValue = item?.params?.endNo? `${j[item.field]}-${item?.params?.endNo}`:j[item.field] 
            }
            if(j.params.endsWith('完成值') ||j.params.endsWith('完成情况')) {
                obj.DtCompletevalue = j[item.field]
            }
            
            if(j.params.endsWith('完成率')) {
                obj.DtCompleterate = j[item.field]
            }
        })

        return obj
    })

    console.log((footerMethod as any)({columns, data }))
    // detailList.data.forEach((v: any) => {
    //     console.log(detailMap.keys().next().value)
    //     if(v.params === '全年目标值'){
    //         //
    //         detailMap.get('HS').DtTaregtValue = v.HS
    //     }
    // })



    return list || []
}


export default function useDataTransform(basicInfo: any, detailList: any,status: number, subType: number = 1) {
    console.log(basicInfo, detailList)
    const StatTypeId = +basicInfo.metricType.replace('temp','')
    const DetailList = getDetailList(detailList, StatTypeId)
    const StattargetDto = {
        StatTypeId ,
        StatTask: basicInfo.workTasks,
        StatOrgName: basicInfo.responsibilityDivision,
        StatOrgUserName: basicInfo.leaderShip,
        StatConcertUserName: basicInfo.cooperateOffice,
        Status: status,
        StatContent: basicInfo.comments,
        StatRemark : basicInfo.remark,
        DetailList
    }
    const postData: any = {
        subType,
        idList: '',
        StattargetDto
    }

    return postData
}