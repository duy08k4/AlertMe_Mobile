import { IonPage } from "@ionic/react"
import React, { useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { reportType, setReport, setReportDetailID } from "../../redux/reducers/report";
import { reportStatus, reportStatusColor } from "../../config/reportStatus";
import NewsDetail from "../components/NewsDetail"
import Logo from "../../assets/AlertMe.png"
import Funnel, { FilterSection } from "../components/Funnel";
import { reportService } from "../../services/report";
import { authUser } from "../../services/authUser";
import { setInitializing, setUser, setUserAuth } from "../../redux/reducers/user";
import { setStaff, setStaffAuth } from "../../redux/reducers/staff";


type Selections = Record<string, string[]>;

const NewsCard: React.FC<{ onCardClick: (id: string) => void; report: reportType }> = ({ onCardClick, report }) => {
    const formattedDate = new Date(report.created_at).toLocaleString('vi-VN');

    return (
        <div className="mainShadow h-fit w-full bg-white flex items-center-safe gap-2.5 rounded-small p-2.5" onClick={() => onCardClick(report.id)}>
            <span className="h-[60px] aspect-square overflow-hidden border border-lightGray rounded-small">
                <img src={report.attachment_paths[0] || Logo} className="w-full h-full object-cover object-center" />
            </span>

            <span className="flex flex-col gap-1.5 justify-center-safe flex-1">
                <h6 className="leading-none! m-0! font-medium">{report.name}</h6>
                <p className="text-csNormal">
                    <b className="text-gray">Trạng thái:</b>
                    <span className={`${reportStatusColor[report.status].textColor} ${reportStatusColor[report.status].bgColor} font-semibold px-1.5 py-0.5`}>
                        {reportStatus[report.status]}
                    </span>
                </p>
                <p className="text-csSmall text-gray-500 flex items-center-safe">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {formattedDate}
                </p>
            </span>
        </div>
    )
}

const NewsPage: React.FC = () => {
    const [showNewsDetail, setShowNewsDetail] = useState(false);
    const [isFunnel, setIsFunnel] = useState(false);
    const [selections, setSelections] = useState<Selections>({});
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const reports = useSelector((state: RootState) => state.report.reports);

    const handleCardClick = (id: string) => {
        dispatch(setReportDetailID(id));
        setShowNewsDetail(true);
    };

    const handleCloseDetail = () => {
        setShowNewsDetail(false);
    };

    const toggleFunnel = () => {
        setIsFunnel(!isFunnel);
    };


    const filterSections = useMemo<FilterSection[]>(() => {
        return [
            {
                key: 'status',
                title: 'Lọc theo trạng thái',
                options: Object.entries(reportStatus).map(([key, value]) => ({
                    id: key,
                    label: value,
                })),
            }
        ];
    }, []);

    const filteredReports = useMemo(() => {
        let currentReports = reports.filter(report =>
            report.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const activeFilterKeys = Object.keys(selections).filter(key => selections[key]?.length > 0);

        if (activeFilterKeys.length === 0) {
            return currentReports;
        }

        return currentReports.filter(report => {
            return activeFilterKeys.every(key => {
                const reportPropertyKey = key as keyof reportType;
                const reportValue = report[reportPropertyKey];
                return typeof reportValue === 'string' && selections[key].includes(reportValue);
            });
        });
    }, [reports, searchTerm, selections]);


    const refreshData = async () => {
        try {
            // Fetch reports
            const getReportForMap = await reportService.getReportForMap()
            if (getReportForMap) {
                dispatch(setReport(getReportForMap))
            }

            // Auto sign-in
            const userData = await authUser.autosigin()
            if (userData) {
                if (userData.role.name === 'user') {
                    dispatch(setUserAuth(true))
                    dispatch(setStaffAuth(false))
                    dispatch(setUser(userData))
                } else {
                    dispatch(setUserAuth(false))
                    dispatch(setStaffAuth(true))
                    dispatch(setStaff(userData))
                }
            }
        } catch (error) {
            console.error("Initialization error:", error)
        } finally {
            dispatch(setInitializing(false))
        }
    }

    return (
        <IonPage>
            <div className="h-full w-full bg-white flex flex-col">
                <div className="px-mainTwoSidePadding py-2.5">
                    <h2 className="font-semibold! leading-none!">
                        Danh sách sự cố
                    </h2>

                    <div className="h-fit flex items-center-safe gap-2.5 mt-2">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên sự cố..."
                            className="mainShadow flex-1 h-10 px-3 text-csNormal! border-[0.5px] border-lightGray rounded-small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <div className="relative h-10 flex items-center-safe gap-2.5">
                            <button
                                onClick={refreshData}
                                className="mainShadow h-full! aspect-square flex justify-center-safe items-center-safe bg-white rounded-small!"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </button>

                            <button
                                onClick={toggleFunnel}
                                className="mainShadow h-full! aspect-square flex justify-center-safe items-center-safe bg-white rounded-small!"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grow overflow-auto flex flex-col gap-2.5 px-mainTwoSidePadding py-0.5 pb-2.5">
                    {filteredReports.map((report) => (
                        <NewsCard key={report.id} report={report} onCardClick={handleCardClick} />
                    ))}
                </div>
            </div>

            {showNewsDetail && (
                <div className="absolute inset-0 z-50 bg-white overflow-auto">
                    <NewsDetail onClose={handleCloseDetail} />
                </div>
            )}
            {isFunnel && (
                <Funnel
                    closeFunnel={toggleFunnel}
                    sections={filterSections}
                    initialSelections={selections}
                    onApply={setSelections}
                />
            )}
        </IonPage>
    )
}

export default NewsPage