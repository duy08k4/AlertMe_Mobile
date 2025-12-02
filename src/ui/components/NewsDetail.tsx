
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { reportService } from '../../services/report';
import { setReportDetail } from '../../redux/reducers/report';
import NotFound from "../../assets/Pattern/NotFound.svg"
import { reportStatus, reportStatusColor } from '../../config/reportStatus';
import uniqolor from 'uniqolor';
import { toastConfig } from '../../config/toastConfig';
import { toast } from 'react-toastify';

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

const NewsDetail: React.FC<NewsDetailProps> = ({ onClose }) => {
    const reportID = useSelector((state: RootState) => state.report.reportDetailID)
    const reportDetail = useSelector((state: RootState) => state.report.reportDetail)

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            if (!reportID || !reportDetail.id || reportID !== reportDetail.id) {
                const pendingToast = toastConfig({
                    pending: true,
                    toastMessage: 'Đang tải dữ liệu sự cố...'
                })
                const reportData = await reportService.getAReport(reportID)

                if (reportData) {
                    dispatch(setReportDetail(reportData))
                    toast.dismiss(pendingToast)
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
                                            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
                                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                        />
                                        <PinMarker position={[reportDetail.lat, reportDetail.lng]} color={uniqolor(reportDetail.id).color} />
                                    </MapContainer>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

        </motion.div>
    );
};

export default NewsDetail;