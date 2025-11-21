import api from "../config/gateway";
import { toastConfig } from "../config/toastConfig";
import { ReportDetail, reportType, SOSReport } from "../redux/reducers/report";

export class reportService {

    // Upload image for report
    public static async uploadImage(file: File) {
        try {
            const formData = new FormData()

            formData.append('files', file)
            const { data, status } = await api.post("/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (status === 201) {
                return data.files[0].publicUrl as string
            }

            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thể tải ảnh lên'
            })
            console.error(error)
            return false
        }
    }

    // Get short data
    public static async getReportForMap() {
        try {
            const { data, status } = await api.get("/reports/list")

            if (status === 200) {
                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Dữ liệu đã được tải xuống'
                })

                return data as reportType[]
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy dữ liệu'
            })
            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy dữ liệu'
            })
            console.error(error)
            return false
        }
    }

    // Get reports based on userId - All reports of user(citizen)
    public static async getUserReports(userId: string) {
        if (!userId) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy dữ liệu'
            })
            return false
        }

        try {
            const { data, status } = await api.get("/reports/me", {
                params: {
                    user_id: userId
                }
            })

            if (status === 200) {
                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Đã tải xuống dữ liệu'
                })
                return data as ReportDetail[]
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy dữ liệu'
            })
            return false
        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy dữ liệu'
            })
            console.error(error)
            return false
        }
    }

    // Send report data
    public static async sendReportData(reportData: { name: string, details: string, attachment_paths: string[], lat: number, lng: number, user_id: string }) {
        try {
            if (!reportData.name || !reportData.details || !reportData.user_id || reportData.attachment_paths.length === 0) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Không thể gửi báo cáo'
                })
                return false
            }

            const dataReport = {
                name: reportData.name,
                details: reportData,
                attachment_paths: reportData.attachment_paths,
                lat: reportData.lat,
                lng: reportData.lng,
                user_id: reportData.user_id
            }

            const { data, status } = await api.post("/reports", dataReport)

            if (status === 201) {
                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Đã gửi báo cáo'
                })
                return data as ReportDetail
            }

            // If this application can't send the report, we must remove the image

            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thể gửi báo cáo'
            })
            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thể gửi báo cáo'
            })
            console.error(error)
            return false
        }
    }

    // Get a report based on ID
    public static async getAReport(reportId: string) {
        if (!reportId) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy dữ liệu báo cáo'
            })
            console.error("ID is invalid!")
            return false
        }

        try {
            const { data, status } = await api.get(`/reports/${reportId}`)

            if (status === 200) {
                return data as ReportDetail
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy dữ liệu báo cáo'
            })
            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy dữ liệu báo cáo'
            })
            console.error(error)
            return false
        }
    }

    // Send SOS
    public static async sendSOS(userId: string, lat: number, lng: number) {
        if (!userId || !lat || !lng) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thể gửi tín hiệu'
            })
            return false
        }

        try {
            const { status, data } = await api.post("/sos-reports", { lat, lng, user_id: userId })

            if (status === 201) {
                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Tín hiệu đã được gửi'
                })
                return data as SOSReport
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thể gửi tín hiệu'
            })
            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thể gửi tín hiệu'
            })
            console.error(error)
            return false
        }
    }
}