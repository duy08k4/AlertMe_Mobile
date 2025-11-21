
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { reportService } from '../../services/report';
import { setReportDetail } from '../../redux/reducers/report';
import Logo from "../../assets/AlertMe.png";
import NotFound from "../../assets/Pattern/NotFound.svg"
import { reportStatus, reportStatusColor } from '../../config/reportStatus';
import uniqolor from 'uniqolor';

interface PinMarkerProps {
    position: [number, number];
    color: string;
    size?: number;
}
const PinMarker: React.FC<PinMarkerProps> = ({ position, color = '#f25255', size = 32 }) => {
    const icon = L.divIcon({
        className: "custom-pin-marker",
        html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}" stroke="black">
        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
      </svg>
    `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
    });

    return <Marker position={position} icon={icon} />;
};


interface NewsDetailProps {
    onClose: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ onClose}) => {
    const reportID = useSelector((state: RootState) => state.report.reportDetailID)
    const reportDetail = useSelector((state: RootState) => state.report.reportDetail)
    const images = [Logo, Logo, Logo];
    const [isData, setIsData] = useState<boolean>(false)

    const dispatch = useDispatch()


    useEffect(() => {
        (async () => {
            if (!reportID || !reportDetail.id || reportID !== reportDetail.id) {
                const reportData = await reportService.getAReport(reportID)

                if (reportData) {
                    setIsData(true)
                    dispatch(setReportDetail(reportData))
                } else {
                    setIsData(false)
                }
            }
        })()
    }, [reportID])

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-full h-full bg-white flex flex-col"
        >

            <header className="shrink-0 flex justify-between gap-3.5 items-center px-mainTwoSidePadding border-b border-gray-200 bg-white py-2.5">
                <button
                    onClick={onClose}
                    className="mainShadow flex justify-center items-center h-10 w-10 transition-colors rounded-full!"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>

                </button>
                <span className='h-full flex-1'>
                    <h5 className="text-lg font-semibold text-gray-800">
                        {(Object.keys(reportDetail).length === 0) ? "Không tìm thấy dữ liệu" : "Chi Tiết Sự Cố"}
                    </h5>
                </span>
                {/* <button className="mainShadow flex justify-center items-center h-10 w-10 rounded-small! transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                </button> */}
            </header>

            <div className="flex-1 overflow-y-auto flex flex-col gap-3.5 px-mainTwoSidePadding py-2.5">
                {(Object.keys(reportDetail).length === 0) ? (
                    <div className='h-full w-full flex flex-col justify-center-safe items-center-safe gap-2.5'>
                        <img src={NotFound} className='h-[200px]' />
                    </div>
                ) : (

                    <>
                        <div className="mainShadow h-48! rounded-main! border border-gray-200">
                            <div className="flex w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory rounded-small">
                                {reportDetail.attachment_paths && reportDetail.attachment_paths.map((img, index) => (
                                    <div key={index} className="w-full h-full shrink-0 snap-center flex justify-center items-center bg-white">
                                        <img src={img} className="h-full object-cover object-center" alt={`Report image ${index + 1}`} loading='lazy' />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-center-safe gap-1.5">
                            <h2 className="leading-none! text-2xl font-bold text-gray-900">{reportDetail.name}</h2>
                            <p className="text-csMedium text-gray mt-1"><b className='text-gray'>Tạo lúc: </b>{new Date(reportDetail.created_at).toLocaleString("vi-VN")}</p>
                            
                        </div>

                        <div className="bg-white p-4 rounded-lg mainShadow">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                    <p className="text-gray text-csMedium font-medium truncate">Trạng thái:</p>
                                    <p className={`font-semibold text-csNormal ${reportStatusColor[reportDetail.status].textColor} ${reportStatusColor[reportDetail.status].bgColor} px-2 py-1 rounded-md inline-block`}>{reportStatus[reportDetail.status]}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray text-csMedium font-medium truncate">Đã xử lý lúc:</p>
                                    <p className="font-semibold text-csNormal text-gray-800">{new Date(reportDetail.updated_at).toLocaleString("vi-VN")}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg mainShadow">
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Mô Tả</h4>
                            <p className="text-gray text-csMedium leading-relaxed">{reportDetail.details}</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg mainShadow">
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Vị Trí Sự Cố</h4>
                            <div className="w-full h-80 bg-gray-200 rounded-small overflow-hidden">
                                {reportDetail.lat !== undefined && reportDetail.lng !== undefined && (
                                    <MapContainer center={[reportDetail.lat, reportDetail.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <PinMarker position={[reportDetail.lat, reportDetail.lng]} color={uniqolor(reportDetail.id).color} />
                                    </MapContainer>
                                )}
                            </div>

                            {/* <div className='w-full h-fit'>
                                <button className='w-full h-fit bg-mainRed flex gap-2.5 justify-center-safe items-center-safe text-white text-csNormal py-2.5!' onClick={handleViewOnMap}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                                    </svg>

                                    Xem trên B.Đồ
                                </button>
                            </div> */}
                        </div>
                    </>
                )}
            </div>

        </motion.div>
    );
};

export default NewsDetail;