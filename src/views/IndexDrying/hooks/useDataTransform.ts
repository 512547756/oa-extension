import dayjs from "dayjs"

const getDetailList = (detailList: any, StatTypeId: number) => {
    const list = detailList?.columns?.filter((v: any) => v.field!== 'params')?.map((item: any) => {
        const obj = {
            DtCountyId: item.field,
            DtCounty:item.title,
            DtTaregtValue: undefined,
            DtCompletevalue: undefined,
            DtCompleterate: undefined,
            DtMonth: detailList.data[1].params.split('月')[0],
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

    // detailList.data.forEach((v: any) => {
    //     console.log(detailMap.keys().next().value)
    //     if(v.params === '全年目标值'){
    //         //
    //         detailMap.get('HS').DtTaregtValue = v.HS
    //     }
    // })



    return list || []
}


export default function useDataTransform(basicInfo: any, detailList: any, subType: number = 1,id: any = undefined) {
    const StatTypeId = +basicInfo.StatTypeId.replace('temp','')
    const DetailList = getDetailList(detailList, StatTypeId)
    const StattargetDto = {
        Id: id,
        StatTypeId ,
        StatTask: basicInfo.StatTask,
        StatOrgName: basicInfo.StatOrgName,
        StatOrgUserName: basicInfo.StatOrgUserName,
        StatConcertUserName: basicInfo.StatConcertUserName,
        StatContent: basicInfo.comments,
        StatRemark : basicInfo.remark,
        StatMonth: dayjs().format('YYYYMM'), 
        DetailList: subType === 0? undefined: DetailList
    }
    const postData: any = {
        subType,
        idList: '',
        StattargetDto
    }

    return postData
}