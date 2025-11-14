// Import libraries
import { IonPage } from "@ionic/react"
import React, { useState } from "react"

// Images
import PlaceholderImage from "../../assets/AlertMe.png"

// Toast interface
import { toastConfig } from "../../config/toastConfig"

// Components
import ReportForm from "../components/ReportForm"
import NewsDetail from "../components/NewsDetail"

const ReportCard: React.FC<{
    id: number,
    isDeleting: boolean,
    isSelected: boolean,
    onSelect: (id: number) => void,
    toggleReportDetail: () => void
}> = ({ id, isDeleting, isSelected, onSelect, toggleReportDetail }) => {
    const handleClick = () => {
        if (isDeleting) {
            onSelect(id)
        } else {
            toggleReportDetail()
        }
    }

    return (
        <span className="relative mainShadow shrink-0 basis-[calc(50%-4px)] h-fit flex flex-col gap-2.5 rounded-main p-2.5" onClick={handleClick}>
            {isDeleting && (
                <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="absolute top-2 left-2 w-4 h-4 accent-mainBlue"
                />
            )}
            <span className="w-full aspect-video flex justify-center-safe items-center-safe bg-gray-100 rounded-small overflow-hidden">
                <img src={PlaceholderImage} className="w-full h-full object-cover" />
            </span>

            <span className="w-full flex flex-col items-start-safe gap-1">
                <p className="text-csNormal font-semibold text-left w-full">Sự cố mất nước</p>
                <p className="text-csTiny sm:text-csNormal text-gray font-medium flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 fill-gray">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                    </svg>
                    22/10/2025
                </p>
                <p className="text-csTiny sm:text-csNormal text-yellow-500 font-medium">Chưa xử lý</p>
            </span>
        </span>
    )
}

// Main component
const ReportPage: React.FC = () => {
    // State 
    const [isPending, setIsPending] = useState<boolean>(true)
    const [isReportDetail, setIsReportDetail] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [isReportFormOpen, setIsReportFormOpen] = useState<boolean>(false) // New state for ReportForm

    const changeList = (type: boolean) => {
        setIsPending(type)
    }

    const toggleReportDetail = () => {
        setIsReportDetail(!isReportDetail)
    }

    const toggleIsDeleting = () => {
        setIsDeleting(!isDeleting)
        setSelectedItems([])
    }

    const handleSelectItem = (id: number) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        )
    }

    const handleDelete = () => {
        console.log("Xóa các mục:", selectedItems)

        toastConfig({
            toastType: "success",
            toastMessage: `Đã xóa ${selectedItems.length} báo cáo thành công`
        })

        toggleIsDeleting()
    }

    return (
        <IonPage>
            <div className="relative h-full w-full flex flex-col pt-2.5 gap-2.5">
                <span className="w-full px-mainTwoSidePadding">
                    <span className=" mainShadow p-[0.5px] w-full h-10 bg-lightGray flex rounded-main">
                        <button
                            onClick={() => { changeList(true) }}
                            className={`text-csNormal font-medium h-full w-1/2 ${isPending ? "bg-white" : "bg-transparent"} rounded-main!`}
                        >
                            Chưa xử lý
                        </button>

                        <button
                            onClick={() => { changeList(false) }}
                            className={`text-csNormal font-medium h-full w-1/2 ${!isPending ? "bg-white" : "bg-transparent"} rounded-main!`}
                        >
                            Đã xử lý
                        </button>
                    </span>
                </span>

                <span className="flex-1 h-0 flex flex-col px-mainTwoSidePadding">
                    <span className="flex flex-col bg-white gap-2.5 pb-2.5">
                        <span className="w-full">
                            <h2>{isPending ? "Báo cáo chưa xử lý" : "Báo cáo đã xử lý"}</h2>
                            <p className="text-csNormal text-mainRed font-medium">Số lượng: 10 báo cáo</p>
                        </span>

                        <span className="w-full flex items-center-safe gap-2.5">
                            <span className="mainShadow h-10 flex-1 flex items-center-safe gap-2.5 px-2.5 rounded-small">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>

                                <input
                                    className="text-csNormal! h-full w-full outline-none"
                                    type="text"
                                    placeholder="Tìm kiếm báo cáo..."
                                 />
                            </span>

                            {!isDeleting && (
                                <button className="mainShadow w-10 h-10 flex justify-center-safe items-center-safe rounded-small!" onClick={toggleIsDeleting}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.077-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            )}
                        </span>
                    </span>

                    <div className="w-full flex-1 overflow-auto flex flex-wrap justify-start gap-2 px-0.5 py-2.5">
                        {isPending
                            ? Array(10)
                                .fill(0)
                                .map((_, i) => <ReportCard key={i} id={i} isDeleting={isDeleting} isSelected={selectedItems.includes(i)} onSelect={handleSelectItem} toggleReportDetail={toggleReportDetail} />)
                            : Array(5)
                                .fill(0)
                                .map((_, i) => <ReportCard key={i} id={i} isDeleting={isDeleting} isSelected={selectedItems.includes(i)} onSelect={handleSelectItem} toggleReportDetail={toggleReportDetail} />)
                        }
                    </div>
                </span>

                {!isDeleting && (
                    <span className="absolute bottom-5 right-mainTwoSidePadding">
                        <button className="mainShadow h-[50px] aspect-square bg-mainRed flex justify-center-safe items-center-safe rounded-main!" onClick={() => setIsReportFormOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 stroke-white fill-white">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </span>
                )}

                {isDeleting && (
                    <div className="absolute bottom-0 w-full px-mainTwoSidePadding py-2.5 bg-white drop-shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
                        <div className="w-full flex justify-center-safe items-center-safe gap-5">
                            <button
                                onClick={toggleIsDeleting}
                                className="mainShadow w-full h-fit py-2.5! bg-lightGray rounded-main text-csNormal font-semibold"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={selectedItems.length === 0}
                                className="mainShadow w-full h-fit py-2.5! bg-mainRed rounded-main text-csNormal font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {`Xóa(${selectedItems.length})`}
                            </button>
                        </div>
                    </div>
                )}

                {/* Placeholder for Report Detail Modal */}
                {isReportDetail && (<NewsDetail onClose={toggleReportDetail} />)}

                {isReportFormOpen && (<ReportForm onClose={() => setIsReportFormOpen(false)} />)}
            </div>
        </IonPage>
    )
}

export default ReportPage