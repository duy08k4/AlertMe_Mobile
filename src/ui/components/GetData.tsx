import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { reportService } from "../../services/report"
import { setReport } from "../../redux/reducers/report"

const GetData: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {

        (async () => {
            const getReportForMap = await reportService.getReportForMap()
            if (getReportForMap) {
                dispatch(setReport(getReportForMap))
            }

        })()
    }, [])

    return (
        <></>
    )
}

export default GetData