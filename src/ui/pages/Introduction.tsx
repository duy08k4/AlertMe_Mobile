import React from "react"
import { IonPage, useIonRouter } from "@ionic/react"

// Images 
import AlertMeLogo_text from "../../assets/AlertMe_Text.png"
import RemoteWorker from "../../assets/Pattern/RemoteWorker.svg"

// Config
import { routeConfig } from "../../config/routeConfig"

// Motion
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const IntroductionPage: React.FC = () => {
    const router = useIonRouter()
    return (
        <IonPage>
            <div className="h-full w-full bg-mainRed flex justify-center-safe items-end-safe">
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0, height: "80vh" }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="shadowForm h-[75vh] w-full bg-white flex flex-col gap-5 rounded-tl-4xl rounded-tr-4xl p-5"
                >
                    <span className="flex justify-center-safe mb-5">
                        <img src={RemoteWorker} />
                    </span>

                    <span className="flex-1 flex flex-col gap-5 items-center-safe">
                        <img src={AlertMeLogo_text} className="h-6" />
                        <p className="text-center text-gray text-csMedium leading-loose">Cung cấp thông tin sự cố nhanh chóng, giúp bạn chủ động hơn trên hành trình.</p>
                    </span>

                    <span className="flex flex-col items-center gap-2.5">
                        <button
                            onClick={() => { router.push(routeConfig.register.root, "root") }}
                            className="shadowForm h-fit w-full flex justify-center-safe items-center-safe bg-mainRed py-3.5! rounded-main! text-white text-csMedium font-medium uppercase!"
                        >
                            tài khoản mới
                        </button>
                        <p className="text-csNormal text-mainDark">Bạn đã có tài khoản? <Link to={routeConfig.login.root} className="text-mainRed! font-medium! underline">Đăng nhập</Link></p>
                    </span>
                </motion.div>
            </div>
        </IonPage>
    )
}

export default IntroductionPage