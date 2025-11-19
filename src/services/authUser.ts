import api from "../config/gateway";
import { toastConfig } from "../config/toastConfig";
import { userData } from "../redux/reducers/user";


export class authUser {

    private async sendVerificationMail(email: string) {
        const { } = await api.post("/auth/email/resend-verification", {

        })
    }

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

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Đăng nhập thất bại'
            })
            console.error(error)
            return false
        }
    }

    public static storageToken(accessToken: string, refreshToken: string) {
        // Do something
    }
}