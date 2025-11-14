import { IonPage } from "@ionic/react"
import React, { useState } from "react"
import NewsDetail from "../components/NewsDetail"
import Logo from "../../assets/AlertMe.png"

const NewsCard: React.FC<{ onCardClick: (id: number) => void; id: number }> = ({ onCardClick, id }) => {
    return (
        <div className="mainShadow h-[70px] w-full bg-white flex items-center-safe gap-2.5 rounded-small px-2.5" onClick={() => onCardClick(id)}>
            <span className="h-4/5 aspect-square overflow-hidden border">
                <img src={Logo} className="object-cover object-center" />
            </span>

            <span className="flex flex-col gap-1.5 justify-center-safe">
                <h6 className="leading-none! m-0!">Tiêu đề sự cố {id}</h6>
                <p className="text-csNormal flex items-center-safe">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    11/11/2025
                </p>
            </span>
        </div>
    )
}

const NewsPage: React.FC = () => {
    const [showNewsDetail, setShowNewsDetail] = useState(false);
    const [showFilterOptions, setShowFilterOptions] = useState(false);

    const handleCardClick = (id: number) => {
        setShowNewsDetail(true);

        console.log("Selected Report ID:", id);
    };

    const handleCloseDetail = () => {
        setShowNewsDetail(false);
    };

    return (
        <IonPage>
            <div className="h-full w-full bg-white flex flex-col">
                <div className="px-mainTwoSidePadding py-2.5">
                    <h2 className="font-semibold!">
                        Danh sách sự cố
                    </h2>

                    <div className="h-fit flex items-center-safe gap-2.5">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên sự cố..."
                            className="mainShadow flex-1 h-10 px-3 text-csNormal! outline-[0.5px] outline-gray rounded-small"
                        />

                        <div className="relative h-10">
                            <button
                                onClick={() => setShowFilterOptions(!showFilterOptions)}
                                className="mainShadow h-full! aspect-square flex justify-center-safe items-center-safe bg-white rounded-small!"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                                </svg>

                            </button>

                            {showFilterOptions && (
                                <div className="absolute top-full right-0 w-fit bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-10">
                                    <p
                                        onClick={() => { /* Add filter logic here */ setShowFilterOptions(false); }}
                                        className="block w-full text-left px-4 py-2.5 text-csNormal text-nowrap"
                                    >
                                        24 giờ trước
                                    </p>
                                    <p
                                        onClick={() => { /* Add filter logic here */ setShowFilterOptions(false); }}
                                        className="block w-full text-left px-4 py-2.5 text-csNormal text-nowrap"
                                    >
                                        3 ngày trước
                                    </p>
                                    <p
                                        onClick={() => { /* Add filter logic here */ setShowFilterOptions(false); }}
                                        className="block w-full text-left px-4 py-2.5 text-csNormal text-nowrap"
                                    >
                                        7 ngày trước
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grow overflow-auto flex flex-col gap-2.5 px-mainTwoSidePadding py-0.5 pb-2.5">
                    {Array(10).fill(0).map((_, i) => {
                        return <NewsCard key={i} id={i + 1} onCardClick={handleCardClick} />
                    })}
                </div>
            </div>

            {showNewsDetail && (
                <div className="absolute inset-0 z-50 bg-white overflow-auto">
                    <NewsDetail onClose={handleCloseDetail} />
                </div>
            )}
        </IonPage>
    )
}

export default NewsPage