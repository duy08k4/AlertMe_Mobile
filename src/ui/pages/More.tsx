import { IonPage, useIonRouter } from "@ionic/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { setUser, setUserAuth } from "../../redux/reducers/user"
import { setStaff, setStaffAuth } from "../../redux/reducers/staff"
import { routeConfig } from "../../config/routeConfig"
import UserDefaultAvatar from "../../assets/userDefault.avif" // Using the specified default avatar
import { authUser } from "../../services/authUser"

const MorePage: React.FC = () => {
    const dispatch = useDispatch()
    const router = useIonRouter()
    const user = useSelector((state: RootState) => state.user.user)
    const staff = useSelector((state: RootState) => state.staff.staff)

    const handleLogout = async () => {
        await authUser.signout()
        router.push(routeConfig.login.root, "root", "replace")

        if (user.id) {
            // Clear user session
            dispatch(setUser({} as any))
        } else {
            dispatch(setStaff({} as any))
        }

        dispatch(setUserAuth(false))
        dispatch(setStaffAuth(false))

        // Redirect to login page
    }

    return (
        <IonPage>
            <div className="h-full w-full flex flex-col pt-2.5 gap-5 bg-white">
                <div className="px-mainTwoSidePadding">
                    <h2 className="font-semibold">Thông tin cá nhân</h2>
                </div>

                <div className="flex-1 flex flex-col justify-between px-mainTwoSidePadding pb-5">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-mainRed">
                            {Object.keys(user).length > 0 ? (
                                <img src={user.profile && user.profile.profilepic ? user.profile?.profilepic : UserDefaultAvatar} alt="User Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <img src={staff.profile && staff.profile.profilepic ? staff.profile.profilepic : UserDefaultAvatar} alt="User Avatar" className="w-full h-full object-cover" />
                            )}
                        </div>

                        <div className="text-center">
                            {Object.keys(user).length > 0 ? (
                                <>
                                    <p className="text-xl font-bold">{user.profile && user.profile.username ? user.profile?.username : "Username"}</p>
                                    <p className="text-csNormal text-gray-500">{user.email ? user.email : "user@email.com"}</p>
                                </>
                            ) : (

                                <>
                                    <p className="text-xl font-bold">{staff.profile && staff.profile.username ? staff.profile?.username : "Staff's name"}</p>
                                    <p className="text-csNormal text-gray-500">{staff.email ? staff.email : "user@email.com"}</p>
                                </>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full h-fit bg-mainRed text-white text-csMedium py-3! rounded-main! font-medium transition-colors"
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        </IonPage>
    )
}

export default MorePage