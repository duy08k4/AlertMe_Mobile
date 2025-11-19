import { useIonRouter } from "@ionic/react"
import React, { useEffect } from "react"
import { useLocation } from "react-router"
import { authUser } from "../../services/authUser"
import { setUser, setUserAuth, userData } from "../../redux/reducers/user"
import { routeConfig } from "../../config/routeConfig"
import { useDispatch } from "react-redux"
import { setStaffAuth } from "../../redux/reducers/staff"

const Auth: React.FC = () => {
    const pathLocation = useLocation()
    const dispatch = useDispatch()
    const router = useIonRouter()

    useEffect(() => {
        autoAuth()
    }, [pathLocation.pathname])

    const autoAuth = async () => {
        const isAuth: userData['user'] | boolean = await authUser.autosigin()

        if (isAuth) {
            dispatch(setUser(isAuth))

            if (isAuth.role.name === 'user') {
                dispatch(setUserAuth(true))
                dispatch(setStaffAuth(false))
            } else {
                dispatch(setUserAuth(false))
                dispatch(setStaffAuth(true))
            }

            if (!pathLocation.pathname.includes("main")) {
                router.push(routeConfig.main.root)
            }
        } else {
            router.push("/", 'root')
        }
    }
    return (
        <></>
    )
}

export default Auth