import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Logo from "../../assets/AlertMe.png";
import { motion } from 'framer-motion';
import { MapResizeHandler } from "./Map";
import AllTask from "../components/Staff/AllTask";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { countStaffTask, setNewTask, taskType } from "../../redux/reducers/staff";
import { staffService } from "../../services/staffService";
import { routeConfig } from "../../config/routeConfig";
import uniqolor from "uniqolor";
import L from "leaflet"
import { toastConfig } from "../../config/toastConfig";

interface PinMarkerProps {
    position: [number, number];
    color: string;
    size?: number;
}

const PinMarker: React.FC<PinMarkerProps> = ({
    position,
    color,
    size = 32,
}) => {
    const icon = L.divIcon({
        className: "custom-pin-marker",
        html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}">
        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
      </svg>
    `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
    });

    return <Marker position={position} icon={icon} />;
};

const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (map) {
            map.setView(center, zoom);
            setTimeout(() => {
                map.invalidateSize();
            }, 200); // Short delay to ensure container is sized after any animations
        }
    }, [center, zoom, map]);
    return null;
};


const TaskPage: React.FC = () => {
    // --- MOCK DATA ---
    const hasTask = true;

    // Mock data for demonstration
    const images = [Logo, Logo, Logo];
    // --- END MOCK DATA ---

    const staffPosition = useSelector((state: RootState) => state.currentLocation.staffPosition);
    const task = useSelector((state: RootState) => state.staff.newTask)
    const staffId = useSelector((state: RootState) => state.staff.staff.id)
    const router = useIonRouter()

    const handleRouting = () => {
        router.push(`${routeConfig.main.map}/${task.report.id}`)
    }

    const handleComplete = async () => {
        if (staffPosition) {
            await staffService.completeTask(task.report.id, task.id, staffId, task.report.lat, task.report.lng, staffPosition[0], staffPosition[1])
        } else {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không tìm thấy vị trí của bạn'
            })
        }
    }

    const [countTask, setCountTask] = useState<countStaffTask | null>(null)

    useEffect(() => {
        (async () => {
            const amountTask = await staffService.countTask(staffId)

            if (amountTask) {
                setCountTask(amountTask)
            } else {
                setCountTask(null)
            }
        })()
    }, [task])

    return (
        <IonPage>
            <div className="relative h-full w-full flex flex-col overflow-auto">
                <div className="mainShadow sticky top-0 left-0 px-mainTwoSidePadding bg-white py-2">
                    <h2>Nhiệm vụ của tôi</h2>
                </div>

                <div className="p-4 flex-1 w-full flex flex-col gap-5 bg-white">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className="bg-white p-4 rounded-xl mainShadow flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h.008v.008H8.25v-.008Zm0 3.75h.008v.008H8.25v-.008Zm0-16.5h.008v.008H8.25V2.25ZM12 10.5h.008v.008H12v-.008Zm0 3.75h.008v.008H12v-.008Zm0 3.75h.008v.008H12v-.008Zm3.75-16.5h.008v.008h-.008V2.25ZM16.5 10.5h.008v.008h-.008v-.008Zm0 3.75h.008v.008h-.008v-.008Z" />
                                </svg>
                            </div>

                            <div>
                                <p className="text-gray-500 text-csNormal">Được giao</p>
                                <p className="text-csBig font-bold text-gray-800">{countTask?.assignedTasks}</p>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl mainShadow flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>

                            <div>
                                <p className="text-gray-500 text-csNormal">Hoàn thành</p>
                                <p className="text-2xl font-bold text-gray-800 text-csBig">{countTask?.completedTasks}</p>
                            </div>
                        </div>
                    </motion.div>

                    {task && task.id && task.report ? (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden flex-1"
                            >
                                {/* Image Gallery */}
                                <div className="h-48 bg-gray-200">
                                    <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory">
                                        <div className="w-full h-full shrink-0 snap-center flex justify-center items-center bg-white">
                                            <img src={task.report.attachment_paths[0]} className="h-full w-full object-cover" alt="Hình ảnh hiện trường" loading='lazy' />
                                        </div>
                                    </div>
                                </div>

                                {/* Task Info */}
                                <div className="p-4 flex flex-col gap-4">
                                    <div className="text-center">
                                        <h2 className="text-xl font-bold text-gray-900">{task.report.name}</h2>
                                        <p className="text-xs text-gray-500 mt-1">Giao lúc: {new Date(task.created_at).toLocaleString("vi-VN")}</p>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 gap-4 text-sm border-t border-b border-gray-100 py-4">
                                        <div className="flex items-start gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 mt-0.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12v-.008ZM12 18h.008v.008H12v-.008Z" />
                                            </svg>
                                            <div>
                                                <p className="text-gray-500 text-xs">Tạo lúc:</p>
                                                <p className="font-semibold text-gray-800">{new Date(task.report.created_at).toLocaleString("vi-VN")}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 mt-0.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>
                                            <div>
                                                <p className="text-gray-500 text-xs">Tạo bởi</p>
                                                <p className="w-[120px] font-semibold text-gray-800 truncate">{task.report.user.email || "Ẩn danh"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <h4 className="text-md font-semibold text-gray-800 mb-2">Chi tiết sự cố</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {task.report.details}
                                        </p>
                                    </div>

                                    {/* Map */}
                                    <div className="flex flex-col gap-2">
                                        <h4 className="text-md font-semibold text-gray-800">Bản đồ</h4>
                                        <div className="w-full h-56 bg-gray-200 rounded-lg overflow-hidden border">
                                            <MapContainer center={[task.report.lat, task.report.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
                                                <TileLayer
                                                    attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                                                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                                />
                                                <MapResizeHandler />
                                                <PinMarker color={uniqolor(task.report.id).color} position={[task.report.lat, task.report.lng]} />
                                                <MapUpdater center={[task.report.lat, task.report.lng]} zoom={15} />
                                            </MapContainer>
                                        </div>

                                        <button className="w-full h-fit bg-mainDark text-white py-2.5!" onClick={handleRouting}>
                                            <i className="fas fa-road text-white"></i> {" "}
                                            Đường đi
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="w-full h-fit py-2.5 bg-white">
                                <button className="w-full h-fit text-white bg-mainRed py-3.5!" onClick={handleComplete}>Hoàn thành</button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <svg className="w-24 h-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-700 mt-2">Không có nhiệm vụ mới</h3>
                                <p className="text-gray-500 max-w-xs text-sm">
                                    Tuyệt vời! Bạn đã hoàn thành tất cả công việc. Hãy kiểm tra lại sau nhé.
                                </p>
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* <AllTask /> */}
            </div>
        </IonPage>
    )
}

export default TaskPage;
