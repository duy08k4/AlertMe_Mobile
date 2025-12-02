import { useEffect } from "react"
import { webSocketManagerTracking } from "../../websocket/socketToTracking"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { addOtherStaffLocation, setNewTask, taskType } from "../../redux/reducers/staff"
import { webSocketManagerAlert } from "../../websocket/socketToAlert"
import { reportStatus } from "../../config/reportStatus"
import { addNewReport } from "../../redux/reducers/report"
import { reportService } from "../../services/report"
import { staffService } from "../../services/staffService"
import { toastConfig } from "../../config/toastConfig"

const Websocket = () => {
    const staffId = useSelector((state: RootState) => state.staff.staff.id)
    const dispatch = useDispatch()

    // Receive annouce task
    useEffect(() => {

    }, [])

    // Receive other staff locations
    useEffect(() => {
        if (webSocketManagerTracking.isConnected() && staffId) {
            webSocketManagerTracking.on("coordinateUpdate", (data: { staffId: string, lat: number, lng: number }) => {
                dispatch(addOtherStaffLocation(data))
            })
        }
    }, [webSocketManagerTracking.isConnected(), staffId])

    // Receive alert when having new report
    useEffect(() => {
        if (webSocketManagerAlert.isConnected()) {
            webSocketManagerAlert.on("newReport", (data: { reportId: string; status: keyof typeof reportStatus }) => {
                (async () => {
                    const reportData = await reportService.getAReport(data.reportId)
                    if (reportData) {
                        const shortData = {
                            id: reportData.id,
                            status: reportData.status,
                            attachment_paths: reportData.attachment_paths,
                            name: reportData.name,
                            lat: reportData.lat,
                            lng: reportData.lng,
                            created_at: reportData.created_at
                        }
                        dispatch(addNewReport(shortData))
                    }
                })()
            })
        }

        return webSocketManagerAlert.off("newReport", () => { })
    }, [webSocketManagerAlert.isConnected()])

    // Staff----------------------------------------------------------------------------------------

    // Receive alert when staff has a new task
    useEffect(() => {
        if (webSocketManagerAlert.isConnected()) {
            webSocketManagerAlert.on("staffAssignment", (data: { staffId: string, reportId: string }) => {
                if (data.staffId === staffId) {
                    setTimeout(async () => {
                        const task = await staffService.getAssignedTask(data.staffId, "in_progress")
                        console.log(task)
                        if (task) {
                            dispatch(setNewTask(task))
                            toastConfig({
                                toastType: 'info',
                                toastMessage: 'Bạn có nhiệm vụ mới'
                            })
                        }
                    }, 1000)
                }
            })
        }

        return webSocketManagerAlert.off("staffAssignment", () => { })
    }, [webSocketManagerAlert.isConnected(), staffId, dispatch])

    useEffect(() => {
        if (staffId) {
            (async () => {
                const taskData = await staffService.getAssignedTask(staffId, "in_progress");
                if (taskData) {
                    dispatch(setNewTask(taskData));
                    toastConfig({
                        toastType: 'info',
                        toastMessage: 'Bạn có nhiệm vụ mới'
                    })
                } else {
                    dispatch(setNewTask({} as taskType));
                }
            })();
        }
    }, [staffId, dispatch]);

    return null
}

export default Websocket