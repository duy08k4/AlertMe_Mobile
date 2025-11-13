import { IonPage, useIonRouter } from "@ionic/react"
import React, { useEffect, useState } from "react"

// images
import Citizen_img from "../../assets/Pattern/Citizen.svg"
import Staff_img from "../../assets/Pattern/Towing.svg"

// Motion
import { motion } from "framer-motion"

// Component
import CitizenRegisterForm from "../components/User/UserRegisterForm"
import StaffRegisterForm from "../components/Staff/StaffRegisterForm"

type role = "citizen" | "staff"

interface ChooseRole_interface {
    chooseRole: (role: role) => void
}

const ChooseRole: React.FC<ChooseRole_interface> = ({ chooseRole }) => {
    const [selectedRole, setSelectedRole] = useState<role | undefined>()
    const router = useIonRouter()

    // Animation

    useEffect(() => {
        if (selectedRole) {
            setTimeout(() => {
                chooseRole(selectedRole)
            }, 100)
        }
    }, [selectedRole])

    // Toggle
    const backToIntroduction = () => {
        router.push("/", "root")
    }

    return (
        <motion.div
            initial={{ opacity: !selectedRole ? 0 : 1 }}
            animate={{ opacity: !selectedRole ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 h-full w-full flex justify-center-safe items-center-safe bg-black"
        >
            <motion.div
                initial={{ scale: !selectedRole ? 0.9 : 1, opacity: !selectedRole ? 0 : 1 }}
                animate={{ scale: !selectedRole ? 1 : 0.9, opacity: !selectedRole ? 1 : 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-white h-fit w-[90%] flex flex-col gap-5 rounded-main p-5"
            >
                <span className="flex flex-col items-center-safe">
                    <h3 className="leading-none!">Vai trò</h3>
                    <p className="text-gray text-csMedium">Hãy chọn vai trò của bạn</p>
                </span>

                <span className="h-fit flex gap-2.5">
                    <span
                        onClick={() => { setSelectedRole("citizen") }}
                        className="flex-1 mainShadow flex flex-col justify-end-safe items-center-safe gap-2.5 px-2.5 py-3.5 rounded-main"
                    >
                        <img className="w-[80%]" src={Citizen_img} />
                        <p className="text-csMedium">Người dân</p>
                    </span>

                    <span
                        onClick={() => { setSelectedRole("staff") }}
                        className="flex-1 mainShadow flex flex-col justify-end-safe items-center-safe gap-2.5 px-2.5 py-3.5 rounded-main"
                    >
                        <img className="w-[80%]" src={Staff_img} />
                        <p className="text-csMedium">Nhân viên</p>
                    </span>
                </span>

                <span className="">
                    <button
                        onClick={backToIntroduction}
                        className="w-full bg-mainRedRGB text-mainRed font-medium py-3.5! rounded-main!"
                    >
                        Quay lại
                    </button>
                </span>
            </motion.div>
        </motion.div>
    )
}

const RegisterPage: React.FC = () => {
    const [isCitizen, setIsCitizen] = useState<boolean | undefined>()

    const chooseRole = (role: role) => {
        if (role == "citizen") {
            setIsCitizen(true)
        } else {
            setIsCitizen(false)
        }
    }

    const toggleRole = () => {
        setIsCitizen(undefined)
    }

    return (
        <IonPage>
            <div className="relative h-full w-full bg-white">
                {isCitizen === undefined && (<ChooseRole chooseRole={chooseRole} />)}
                {isCitizen && (<CitizenRegisterForm toggleRole={toggleRole} />)}
                {!isCitizen && isCitizen != undefined && (<StaffRegisterForm toggleRole={toggleRole} />)}
            </div>
        </IonPage>
    )
}

export default RegisterPage