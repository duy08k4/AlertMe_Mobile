import { PanInfo, useMotionValue, motion } from "framer-motion";
import React, { useMemo, useRef, useState } from "react"
import uniqolor from 'uniqolor';
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { reportType, setReportDetailID } from "../../redux/reducers/report";
import { reportStatus } from "../../config/reportStatus";
import Funnel, { FilterSection } from "./Funnel";


type Selections = Record<string, string[]>;

// Card
interface Tag_interface {
    reportDetail: () => void,
    report: reportType
}

const Tag: React.FC<Tag_interface> = ({ report, reportDetail }) => {
    const randomColor = uniqolor(report.id).color
    const dispatch = useDispatch()
    const d = new Date(report.created_at);

    const time = d.toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh"
    });

    const chooseSpecies = () => {
        dispatch(setReportDetailID(report.id))
        reportDetail()
    }

    return (
        <div
            onClick={chooseSpecies}
            className={`relative w-full h-fit flex gap-2.5 items-center px-5 border-[0.5px]! border-lightGray py-1.5 rounded-main border-l-4 border-l-[${randomColor}]`}
        >
            <span className="h-[50px] aspect-square overflow-hidden flex justify-center items-center rounded-small">
                <img src={report.attachment_paths[0]} className="h-full w-full object-cover object-center" loading="lazy" />
            </span>
            
            <span className="flex-1">
                <p className="text-csNormal font-medium">{report.name}</p>
                <p className="flex items-center text-csSmall text-gray">{reportStatus[report.status]}</p>
                <p className="flex items-center text-csSmall text-gray">{time}</p>
            </span>
        </div>
    )
}

interface DiscoveredReport_interface {
    onCloseDiscoveredReportList: () => void,
    reportDetail: () => void
}

const ListDiscoveredReport: React.FC<DiscoveredReport_interface> = ({ onCloseDiscoveredReportList, reportDetail }) => {
    // State
    const [isList, setIsList] = useState<boolean>(true)
    const [isFunnel, setIsFunnel] = useState<boolean>(false)
    const [selections, setSelections] = useState<Selections>({});


    const height = useMotionValue(isList ? window.innerHeight * 0.5 : 0);
    const lastHeight = useRef(window.innerHeight * 0.65);
    const minHeight = window.innerHeight * 0.2;
    const maxHeight = window.innerHeight * 0.9;

    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const newHeight = height.get() - info.delta.y;
        if (newHeight > minHeight && newHeight < maxHeight) {
            height.set(newHeight);
            lastHeight.current = newHeight;
        }
    };

    // Data
    const reportListDiscovered = useSelector((state: RootState) => state.report.discoveredReport)

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
        const activeFilterKeys = Object.keys(selections).filter(key => selections[key]?.length > 0);

        if (activeFilterKeys.length === 0) {
            return reportListDiscovered;
        }

        return reportListDiscovered.filter(report => {
            return activeFilterKeys.every(key => {
                const reportPropertyKey = key as keyof reportType;
                const reportValue = report[reportPropertyKey];
                return typeof reportValue === 'string' && selections[key].includes(reportValue);
            });
        });
    }, [reportListDiscovered, selections]);


    // Toggle
    const toggleFunnel = () => {
        setIsFunnel(!isFunnel)
    }

    const toggleList = () => {
        if (isList) {
            height.set(0);
        } else {
            height.set(lastHeight.current);
        }
        setIsList(!isList);
    }

    return (
        <>
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                style={{ height }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="mainShadow absolute bottom-0 left-0 flex w-full bg-white flex-col gap-2.5 pt-6"
            >
                <motion.div
                    onDrag={handleDrag}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0}
                    dragMomentum={false}
                    className="absolute top-0 left-0 w-full h-6 cursor-row-resize flex justify-center items-center"
                >
                    <div className="w-28 h-1.5 bg-gray-300 rounded-full" />
                </motion.div>

                <button
                    onClick={toggleList}
                    className={`absolute top-0 left-1/2 translate-y-[-120%] translate-x-[-50%] mainShadow ${isList ? "bg-white" : "bg-mainRed"} px-2.5! py-2.5! rounded-small!`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${!isList && "stroke-white"}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>

                <div className="w-full flex justify-center-safe gap-2.5 px-mainTwoSidePadding">
                    <button className="w-1/2 bg-mainRedRGB text-mainRed py-1.5! rounded-small!" onClick={onCloseDiscoveredReportList}>Đóng</button>
                </div>

                <div className="flex-1 w-full h-0 gap-2.5 flex flex-col px-mainTwoSidePadding">
                    <span className="h-fit w-full flex justify-between items-center">
                        <span className="">
                            <h2 className="leading-2.5!">Sự cố</h2>
                            <p className="text-gray text-csSmall">Tại khu vực bạn đang xem</p>
                        </span>
                        <span className="flex gap-2.5">
                            <button className="mainShadow p-2! rounded-small!" onClick={toggleFunnel}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                                </svg>
                            </button>
                        </span>
                    </span>

                    <p className="text-mainRed text-csSmall">Số lượng: {filteredReports.length} báo cáo</p>

                    <span className={"w-full flex-1 overflow-auto flex flex-wrap content-start gap-x-2.5 gap-y-2.5 justify-start px-0.5 py-2.5"}>
                        {filteredReports.length > 0 && filteredReports.map((report) => <Tag key={report.id} report={report} reportDetail={reportDetail} />)}
                    </span>
                </div>
            </motion.div>

            {isFunnel && (<Funnel closeFunnel={toggleFunnel} sections={filterSections} initialSelections={selections} onApply={setSelections} />)}
        </>
    )
}

export default ListDiscoveredReport