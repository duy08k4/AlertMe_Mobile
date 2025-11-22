// Import libraries
import { IonPage } from "@ionic/react"
import React, { useEffect, useRef, useState } from "react"

// Images
import PlaceholderImage from "../../assets/AlertMe.png"

// Toast interface
import { toastConfig } from "../../config/toastConfig"

// Components
import ReportForm from "../components/ReportForm"
import NewsDetail from "../components/NewsDetail"
import { reportService } from "../../services/report"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { setMyReport } from "../../redux/reducers/user"
import { ReportDetail, setReportDetailID } from "../../redux/reducers/report" // Import ReportDetail
import { reportStatus, reportStatusColor } from "../../config/reportStatus"

const ReportCard: React.FC<{
    report: ReportDetail, // Changed from id: number to report: ReportDetail
    toggleReportDetail: () => void
}> = ({ report, toggleReportDetail }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setReportDetailID(report.id))
        toggleReportDetail()
    }

    return (
        <span className="mainShadow shrink-0 basis-[calc(50%-4px)] flex flex-col gap-2.5 rounded-main p-2.5" onClick={handleClick}>
            <span className="w-full aspect-video flex justify-center-safe items-center-safe bg-gray-100 rounded-small overflow-hidden">
                <img src={report.attachment_paths[0]} className="w-full h-full object-cover" />
            </span>

            <span className="w-full flex-1 flex flex-col items-start-safe gap-1.5">
                <span className="flex-1">
                    <p className="text-csNormal font-semibold text-left w-full">{report.name}</p>
                </span>

                <span className="h-fit">
                    <p className={`w-fit text-csNormal sm:text-csNormal ${reportStatusColor[report.status].bgColor} ${reportStatusColor[report.status].textColor} font-medium px-1.5`}>{reportStatus[report.status]}</p>
                </span>

                <p className="text-csSmall sm:text-csNormal text-gray font-medium flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 fill-gray">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                    </svg>

                    {report.status === "closed" ? new Date(report.updated_at).toLocaleString("vi-VN") : new Date(report.created_at).toLocaleString("vi-VN")}
                </p>
            </span>
        </span>
    )
}

// Main component
const ReportPage: React.FC = () => {
    // User
    const userId = useSelector((state: RootState) => state.user.user.id)
    const myReport = useSelector((state: RootState) => state.user.myReport)

    const dispatch = useDispatch()

    // State 
    const [isPending, setIsPending] = useState<boolean>(true)
    const [isReportDetail, setIsReportDetail] = useState<boolean>(false)
    const [isReportFormOpen, setIsReportFormOpen] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("") // New state for search term
    const invalidToast = useRef<NodeJS.Timeout | null>(null)

    const changeList = (type: boolean) => {
        setIsPending(type)
    }

    const toggleReportDetail = (id?: string) => {
        setIsReportDetail(!isReportDetail)
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    // Main handler
    useEffect(() => {
        (async () => {
            const getMyReport = await reportService.getUserReports(userId)

            if (!getMyReport.status) {
                invalidToast.current = getMyReport.invalidDataToast ?? null
                console.log("Looi")
                return
            }

            if (getMyReport.data) {
                dispatch(setMyReport(getMyReport.data))
                if (invalidToast.current) clearTimeout(invalidToast.current)
            } else {
                console.log("wow")
            }
        })()
    }, [userId])

    // Filter reports based on isPending and searchTerm
    const filteredReports = myReport.filter(report => {
        const matchesStatus = isPending ? report.status !== "closed" : report.status === "closed"
        const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesStatus && matchesSearch
    })

    return (
        <IonPage>
            <div className="relative h-full w-full flex flex-col pt-2.5 gap-2.5">
                <span className="w-full px-mainTwoSidePadding">
                    <span className=" mainShadow p-[0.5px] w-full h-10 bg-lightGray flex rounded-main">
                        <button
                            onClick={() => { changeList(true) }}
                            className={`text-csNormal font-medium h-full w-1/2 ${isPending ? "bg-white" : "bg-transparent"} rounded-main!`}
                        >
                            Chưa giải quyết
                        </button>

                        <button
                            onClick={() => { changeList(false) }}
                            className={`text-csNormal font-medium h-full w-1/2 ${!isPending ? "bg-white" : "bg-transparent"} rounded-main!`}
                        >
                            Đã giải quyết
                        </button>
                    </span>
                </span>

                <span className="flex-1 h-0 flex flex-col px-mainTwoSidePadding">
                    <span className="flex flex-col bg-white gap-2.5 pb-2.5">
                        <span className="w-full">
                            <h2>Báo cáo của tôi</h2>
                            <p className="text-csNormal text-mainRed font-medium">Số lượng: {filteredReports.length} báo cáo</p>
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
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </span>
                        </span>
                    </span>

                    <div className="w-full flex-1 overflow-auto flex flex-wrap justify-start content-start gap-2 px-0.5 py-2.5">
                        {filteredReports.map((report, i) => (
                            <ReportCard
                                key={report.id}
                                report={report}
                                toggleReportDetail={toggleReportDetail}
                            />
                        ))}
                    </div>
                </span>

                <span className="absolute bottom-5 right-mainTwoSidePadding">
                    <button className="mainShadow h-[50px] aspect-square bg-mainRed flex justify-center-safe items-center-safe rounded-main!" onClick={() => setIsReportFormOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 stroke-white fill-white">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </span>

                {isReportDetail && (<NewsDetail onClose={toggleReportDetail} />)}

                {isReportFormOpen && (<ReportForm onClose={() => setIsReportFormOpen(false)} />)}
            </div>
        </IonPage>
    )
}

export default ReportPage