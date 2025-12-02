import api from "../config/gateway";
import { ReportStatusKey, TaskStatusKey } from "../config/reportStatus";
import { toastConfig } from "../config/toastConfig";
import HarversineFormula from "../modules/HarversineFormula";
import { countStaffTask, removeTask, taskType } from "../redux/reducers/staff";
import { store } from "../redux/store";

export class staffService {

    // Get assigned task
    public static async getAssignedTask(staffId: string, taskStatus: TaskStatusKey) {
        if (!staffId) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy nhiệm vụ'
            })

            console.error("StaffId is invalid")
            return false
        }

        try {
            const { data, status } = await api.get("/tasks/assigned", {
                params: {
                    staff_user_id: staffId,
                    status: taskStatus
                }
            })

            if (status === 200) {
                if (Array.isArray(data) && data.length > 0) {
                    return data[0] as taskType
                }
                return false
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy nhiệm vụ'
            })

            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy nhiệm vụ'
            })

            console.error(error)
            return false
        }
    }

    // Update task status
    public static async updateTaskStatus(reportID: string, reportStatus: ReportStatusKey) {
        if (!reportID || !reportStatus) {
            console.error("Unable to update status")
            return false
        }

        try {
            const { status } = await api.put(`/reports/${reportID}/status`, {
                status: reportStatus
            })

            if (status === 200) {
                return true
            }

            return false
        } catch (error) {
            console.error(error)
            return false
        }
    }

    // Complete task
    public static async completeTask(reportID: string, taskId: string, staffId: string, reportLat: number, reportLng: number, staffLat: number, staffLng: number) {
        if (!reportID || !taskId || !staffId || !reportLat || !reportLng || !staffLat || !staffLng) {
            toastConfig({
                toastType: 'error',
                toastMessage: "Không thể cập nhật kết quả"
            })

            return false
        }

        const distance = HarversineFormula(reportLat, reportLng, staffLat, staffLng)

        if (Math.round(distance) < 0) {
            toastConfig({
                toastType: 'error',
                toastMessage: "Không thể cập nhật kết quả"
            })

            toastConfig({
                toastType: 'info',
                toastMessage: "Vui lòng đến vị trí xảy ra sự cố"
            })

            return false
        }

        try {
            const { status } = await api.put(`/tasks/${reportID}/complete`, {
                task_id: taskId,
                staff_user_id: staffId
            })

            if (status === 200) {
                toastConfig({
                    toastType: 'success',
                    toastMessage: "Đã cập nhật kết quả"
                })

                const resultUpdate = await this.updateTaskStatus(reportID, "resolved")

                console.log(resultUpdate)

                store.dispatch(removeTask())
                return true
            }
        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: "Không thể cập nhật kết quả"
            })

            console.error(error)
            return false
        }
    }

    // Get assigned and completed task counts by staff ID
    public static async countTask(staffId: string) {
        if (!staffId) {
            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy nhân viên"
            })
            console.error("StaffId is invalid")
            return false
        }

        try {
            const { data, status } = await api.get(`/tasks/${staffId}/counts`)

            if (status === 200) {
                return data as countStaffTask
            }

            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy nhân viên"
            })

            return false

        } catch (error) {
            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy nhân viên"
            })
            console.error(error)
            return false
        }
    }
}