import { toastConfig } from "../config/toastConfig";

export class authUserGuard {

    // Update password for staff
    public static async updatePasswordGuard(currentPassword: string, newPassword: string, confirmPassword: string) {
        if (!newPassword || !confirmPassword || !currentPassword || newPassword.trim().length === 0) {
            toastConfig({
                toastType: 'error',
                toastMessage: "Vui lòng điền đầy đủ thông tin"
            })
            return false
        }

        if (newPassword !== confirmPassword) {
            toastConfig({
                toastType: 'error',
                toastMessage: "Thông tin không trùng khớp"
            })
            return false
        }
    }
}