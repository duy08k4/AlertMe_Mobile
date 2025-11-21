import api from "../config/gateway";
import { toastConfig } from "../config/toastConfig";
import { reportType } from "../redux/reducers/report";

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

    // Send report data
    public static async sendReportData(reportData: { title: string, content: string, coordinates: { lat: number, lng: number } }, userId: string, attachment_paths: string[]) {
        try {
            if (!reportData.title || !reportData.content || !userId || attachment_paths.length === 0) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Không thể gửi báo cáo'
                })
                return false
            }

            const dataReport = {
                name: reportData.title,
                details: reportData,
                attachment_paths: attachment_paths,
                lat: reportData.coordinates.lat,
                lng: reportData.coordinates.lng,
                user_id: userId
            }

            const { data, status } = await api.post("/reports", dataReport)

            if (status === 201) {
                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Đã gửi báo cáo'
                })
                return true
            }

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
}