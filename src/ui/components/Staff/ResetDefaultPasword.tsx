import React, { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import Logo from "../../../assets/AlertMe.png";
import { authUser } from "../../../services/authUser";

const ResetDefaultPasword: React.FC = () => {
    // Redux
    const staffProfile = useSelector((state: RootState) => state.staff.staff)

    // State
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    // Handler
    const updatePassword = async () => {
        await authUser.updatePassword(currentPassword, newPassword, confirmPassword)
    }

    if (!staffProfile.is_new_user || !staffProfile.is_new_user) return null

    return (
        <div className="fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.85)] flex justify-center items-center p-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 space-y-4">
                <div className="flex flex-col items-center text-center space-y-2">
                    <img src={Logo} alt="AlertMe Logo" className="w-20 h-20" />
                    <h2 className="text-2xl font-bold text-mainDark">Cập nhật mật khẩu</h2>
                    <p className="text-sm text-gray-500">Lần đăng nhập đầu. Vui lòng tạo mật khẩu mới.</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="new-password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Mật khẩu hiện tại
                        </label>

                        <input
                            id="new-password"
                            name="new-password"
                            type="password"
                            required
                            className="outline-none w-full text-csNormal border border-gray-300 px-3 py-2.5 rounded-md focus:border-red-500"
                            placeholder="Nhập mật khẩu hiện tại"
                            value={currentPassword}
                            onChange={(e) => { setCurrentPassword(e.target.value) }}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="new-password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Mật khẩu mới
                        </label>

                        <input
                            id="new-password"
                            name="new-password"
                            type="password"
                            required
                            className="outline-none w-full text-csNormal border border-gray-300 px-3 py-2.5 rounded-md focus:border-red-500"
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => { setNewPassword(e.target.value) }}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Xác nhận mật khẩu mới
                        </label>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            required
                            className="outline-none w-full text-csNormal border border-gray-300 px-3 py-2.5 rounded-md focus:border-red-500"
                            placeholder="Xác nhận lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-mainRed text-white py-3! rounded-lg font-semibold text-csNormal btn transition-colors"
                            onClick={updatePassword}
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetDefaultPasword