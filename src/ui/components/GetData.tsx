import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { reportService } from "../../services/report"
import { setReport } from "../../redux/reducers/report"
import { authUser } from "../../services/authUser"
import { setInitializing, setUser, setUserAuth } from "../../redux/reducers/user"
import { setStaff, setStaffAuth } from "../../redux/reducers/staff"

const GetData: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                // Fetch reports
                const getReportForMap = await reportService.getReportForMap()
                if (getReportForMap) {
                    dispatch(setReport(getReportForMap))
                }

                // Auto sign-in
                const userData = await authUser.autosigin()
                if (userData) {
                    if (userData.role.name === 'user') {
                        dispatch(setUserAuth(true))
                        dispatch(setStaffAuth(false))
                        dispatch(setUser(userData))
                    } else {
                        dispatch(setUserAuth(false))
                        dispatch(setStaffAuth(true))
                        dispatch(setStaff(userData))
                    }
                }
            } catch (error) {
                console.error("Initialization error:", error)
            } finally {
                dispatch(setInitializing(false))
            }
        })()
    }, [dispatch])

    return null
}

export default GetData