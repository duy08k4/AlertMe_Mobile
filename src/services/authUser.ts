import api from "../config/gateway";
import { routeConfig } from "../config/routeConfig";
import { toastConfig } from "../config/toastConfig";
import { setStaff, setStaffAuth } from "../redux/reducers/staff";
import { setUser, setUserAuth, userData } from "../redux/reducers/user";
import { store } from "../redux/store";
import { authUserGuard } from "./authUser.guard";


export class authUser {
    // Only user(citizen)
    public static async signup(email: string, password: string, username: string) {
        if (!email || !password || !username) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thành công.'
            })

            console.error("Data is empty!")
            return
        }

        try {
            const { data, status } = await api.post("/auth/signup", { email, password, username })

            if (status === 201) {
                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Thành công'
                })

                return true
            }


            if (status === 400) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Không thành công.'
                })

                return false
            }


            if (status === 409) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Tài khoản đã tồn tại.'
                })

                return false
            }

            return false
        }
        catch (error) {
            console.error(error)
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thành công.'
            })

            return false
        }
    }

    public static async reSendVerification(email: string) {
        if (!email) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Email không hợp lệ.'
            })

            console.error(`Email is ${email}`)
            return false
        }

        try {
            const { status } = await api.post("/auth/email/resend-verification", { email })

            if (status === 200) {
                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Email đã được gửi.'
                })

                return true
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Email không hợp lệ.'
            })

            console.error(`Email is ${email}`)
            return false
        }

        catch (error) {
            console.error(error)
            toastConfig({
                toastType: 'error',
                toastMessage: 'Email không hợp lệ.'
            })

            return false
        }
    }

    public static async signin(email: string, password: string) {
        try {
            if (!email || !password) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Đăng nhập thất bại'
                })
                console.error(`Invalid data`)
                return false
            }

            const { data, status } = await api.post("/auth/signin", {
                email,
                password
            })

            if (status === 200) {
                const userLogin = data as userData

                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Đăng nhập thành công'
                })

                localStorage.setItem("accessToken", userLogin.access_token)
                localStorage.setItem("refreshToken", userLogin.refresh_token)


                if (userLogin.user.role.name === 'user') {
                    store.dispatch(setUserAuth(true))
                    store.dispatch(setStaffAuth(false))
                    store.dispatch(setUser(userLogin.user))
                } else {
                    store.dispatch(setUserAuth(false))
                    store.dispatch(setStaffAuth(true))
                    store.dispatch(setStaff(userLogin.user))
                }

                return routeConfig.main.root

            }

            if (status === 401) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Đăng nhập thất bại'
                })
                return false
            }

            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Đăng nhập thất bại'
            })
            console.error(error)
            return false
        }
    }

    public static async signout() {
        try {
            const { } = await api.post("/auth/signout", {
                authorization: localStorage.getItem("accessToken")
            })
        }
        finally {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("lastSOSTimestamp")
        }
    }

    public static async autosigin() {
        const accessToken = localStorage.getItem("accessToken")
        const refreshToken = localStorage.getItem("refreshToken")

        if (!accessToken || !refreshToken) {
            return false
        }

        try {
            const { data, status } = await api.post("/auth/refresh", {
                refresh_token: refreshToken
            })

            if (status === 200) {
                localStorage.setItem("accessToken", data.access_token)
                localStorage.setItem("refreshToken", data.refresh_token)

                const response = await api.get("/auth/me", {
                    headers: {
                        Authorization: `Bearer ${data.access_token}`
                    }
                })

                return response.data as userData['user']
            }

            if (status === 401) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Phiên đăng nhập hết hạn'
                })
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                return false
            }

            return false
        } catch (error) {
            if (accessToken && refreshToken) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Phiên đăng nhập hết hạn'
                })
            }
            console.log(error)
            return false
        }
    }

    // Update password for staff
    public static async updatePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
        authUserGuard.updatePasswordGuard(currentPassword, newPassword, confirmPassword)

        try {
            const { status } = await api.post('/auth/password/update', {
                current_password: currentPassword,
                new_password: newPassword
            })

            if (status === 200) {


                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Mật khẩu đã được cập nhật'
                })
                return true
            }

            if (status === 400) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Không thể cập nhật mật khẩu'
                })
                console.error(400)
                return false
            }
            
            if (status === 401) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Vui lòng kiểm tra lại mật khẩu'
                })
                console.error(401)
                return false
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thể cập nhật mật khẩu'
            })
            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thể cập nhật mật khẩu'
            })

            console.log(error)
            return false
        }
    }
}