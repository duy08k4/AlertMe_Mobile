import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Logo from "../../assets/AlertMe.png";
import { motion } from 'framer-motion';
import { MapResizeHandler } from "./Map";

const TaskPage: React.FC = () => {
    // --- MOCK DATA ---
    const hasTask = true;

    // Mock data for demonstration
    const images = [Logo, Logo, Logo];
    const position: [number, number] = [10.7769, 106.7009];
    const assignedTasks = hasTask ? 11 : 12;
    const completedTasks = 12;
    const task = {
        id: 'TSK-001',
        title: "Kiểm tra và xử lý sự cố cây đổ",
        assignedAt: "13/11/2025 09:00 AM",
        deadline: "13/11/2025 05:00 PM",
        priority: "Cao",
        type: "Sự cố môi trường",
        status: "Chờ nhận",
        description: "Một cây lớn đã đổ tại công viên trung tâm, gây cản trở lối đi và có nguy cơ gây nguy hiểm. Yêu cầu đội đến hiện trường, đánh giá tình hình, và thực hiện các biện pháp xử lý cần thiết như cưa cắt, dọn dẹp.",
        location: "Công viên trung tâm, Quận 1, TP.HCM"
    };
    // --- END MOCK DATA ---

    const priorityStyles: { [key: string]: string } = {
        "Cao": "bg-red-100 text-red-700",
        "Trung bình": "bg-yellow-100 text-yellow-700",
        "Thấp": "bg-green-100 text-green-700",
    }

    return (
        <IonPage>
            <div className="h-full w-full flex flex-col overflow-auto">
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
                                <p className="text-csBig font-bold text-gray-800">{assignedTasks}</p>
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
                                <p className="text-2xl font-bold text-gray-800 text-csBig">{completedTasks}</p>
                            </div>
                        </div>
                    </motion.div>

                    {hasTask ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden flex-1 mb-16"
                        >
                            {/* Image Gallery */}
                            <div className="h-48 bg-gray-200">
                                <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory">
                                    {images.map((img, index) => (
                                        <div key={index} className="w-full h-full shrink-0 snap-center flex justify-center items-center bg-white">
                                            <img src={img} className="h-full w-full object-cover" alt={`Task image ${index + 1}`} loading='lazy' />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Task Info */}
                            <div className="p-4 flex flex-col gap-4">
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-gray-900">{task.title}</h2>
                                    <p className="text-xs text-gray-500 mt-1">Giao lúc: {task.assignedAt}</p>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-4 text-sm border-t border-b border-gray-100 py-4">
                                    <div className="flex items-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5h2.25l.75.75H21v6m0 0-3 2.25V12m0 0-3 2.25m-3 1.5.25.25V21l-1.5-1.5-1.5 1.5V21m0 0H9.375M3 3h15m-3 0-3 2.25m-3 1.5-3 2.25M3 12h18" />
                                        </svg>
                                        <div>
                                            <p className="text-gray-500 text-xs">Mức độ</p>
                                            <p className={`font-semibold px-2 py-0.5 rounded-md inline-block text-xs ${priorityStyles[task.priority]}`}>{task.priority}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.69.69 1.81.69 2.5 0l4.5-4.5c.69-.69.69-1.81 0-2.5L11.16 3.66A2.25 2.25 0 0 0 9.568 3ZM12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                        </svg>
                                        <div>
                                            <p className="text-gray-500 text-xs">Loại nhiệm vụ</p>
                                            <p className="font-semibold text-gray-800">{task.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12v-.008ZM12 18h.008v.008H12v-.008Z" />
                                        </svg>
                                        <div>
                                            <p className="text-gray-500 text-xs">Tạo lúc:</p>
                                            <p className="font-semibold text-gray-800">{task.deadline}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                        <div>
                                            <p className="text-gray-500 text-xs">Tạo bởi</p>
                                            <p className="w-[120px] font-semibold text-gray-800 truncate">duytran.290804@gmai.com</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h4 className="text-md font-semibold text-gray-800 mb-2">Mô tả chi tiết</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {task.description}
                                    </p>
                                </div>

                                {/* Map */}
                                <div>
                                    <h4 className="text-md font-semibold text-gray-800 mb-2">Bản đồ</h4>
                                    <div className="w-full h-56 bg-gray-200 rounded-lg overflow-hidden border">
                                        <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={position}></Marker>
                                            <MapResizeHandler />
                                        </MapContainer>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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

                {hasTask && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mainShadow absolute z-1000 bottom-0 w-full bg-white p-3 flex justify-center items-center gap-3 border-t border-gray-200"
                    >
                        <button className="flex-1 py-3! px-4! text-center text-csNormal! font-medium bg-gray-200 text-gray-700 rounded-lg transition-colors">
                            Từ chối
                        </button>
                        <button className="flex-1 py-3! px-4! text-center text-csNormal! font-medium bg-blue-600 text-white rounded-lg transition-colors">
                            Nhận nhiệm vụ
                        </button>
                    </motion.div>
                )}
            </div>
        </IonPage>
    )
}

export default TaskPage;
