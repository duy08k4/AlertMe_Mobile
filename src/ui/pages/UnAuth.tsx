import { IonPage } from "@ionic/react"
import React from "react"

// Image
import UnAuthImg from "../../assets/svg/unAuth.svg"

const UnAuth: React.FC = () => {
    return (
        <IonPage>
            <div className="h-full w-full bg-white flex justify-center-safe items-center-safe">
                <div className="w-[90%] h-fit flex flex-col items-center-safe">
                    <img src={UnAuthImg} className="h-[200px] mb-10" />
                    <h3 className="uppercase font-semibold!">Chưa đăng nhập</h3>
                    <button className="w-[80%] text-csNormal text-white font-medium bg-mainRed py-3.5! rounded-main!">Đến trang Đăng nhập</button>
                </div>
            </div>
        </IonPage>
    )
}

export default UnAuth