import api from "../config/gateway";
import { toastConfig } from "../config/toastConfig";
import { userData } from "../redux/reducers/user";


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
                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Đăng nhập thành công'
                })

                localStorage.setItem("accessToken", data.access_token)
                localStorage.setItem("refreshToken", data.refresh_token)
                return data as userData
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
            const {  } = await api.post("/auth/signout", {
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

            if (status === 401 && accessToken && refreshToken) {
                toastConfig({
                    toastType: 'error',
                    toastMessage: 'Phiên đăng nhập hết hạn'
                })
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
}