
import React from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Logo from "../../assets/AlertMe.png";


interface PinMarkerProps {
    position: [number, number];
    color?: string;
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
    const images = [Logo, Logo, Logo];

    const position: [number, number] = [10.7769, 106.7009];

    const handleViewOnMap = () => {
        alert("Chưa có gì đâu hẹ hẹ :v")
    }

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-full h-full bg-white flex flex-col"
        >
            {/* Header */}
            <header className="shrink-0 flex justify-between items-center px-mainTwoSidePadding border-b border-gray-200 bg-white py-2.5">
                <button
                    onClick={onClose}
                    className="mainShadow flex justify-center items-center h-10 w-10 transition-colors rounded-full!"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>

                </button>
                <h5 className="text-lg font-semibold text-gray-800">Chi Tiết Sự Cố</h5>
                <button className="mainShadow flex justify-center items-center h-10 w-10 rounded-small! transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                </button>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-3.5 px-mainTwoSidePadding py-2.5">
                {/* Image Gallery */}
                <div className="mainShadow h-48! rounded-main! border border-gray-200">
                    <div className="flex w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
                        {images.map((img, index) => (
                            <div key={index} className="w-full h-full shrink-0 snap-center flex justify-center items-center bg-white">
                                <img src={img} className="h-full object-cover object-center" alt={`Report image ${index + 1}`} loading='lazy' />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Report Title */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Tên Báo Cáo Sự Cố</h2>
                    <p className="text-csNormal text-gray mt-1"><b className='text-gray'>Tạo lúc: </b>12/11/2025 10:30 AM</p>
                </div>

                {/* Incident Details Section */}
                <div className="bg-white p-4 rounded-lg mainShadow">
                    {/* <h4 className="text-lg font-semibold text-gray-800 mb-3">Thông Tin Chi Tiết</h4> */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                            <p className="text-gray text-csMedium font-medium truncate">Mức độ:</p>
                            <p className="font-semibold text-csNormal text-red-600 bg-red-100 px-2 py-1 rounded-md inline-block">Cao</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray text-csMedium font-medium truncate">Loại sự cố:</p>
                            <p className="font-semibold text-csNormal text-gray-800">Tai Nạn Giao Thông</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray text-csMedium font-medium truncate">Trạng thái:</p>
                            <p className="font-semibold text-csNormal text-green-600 bg-green-100 px-2 py-1 rounded-md inline-block">Đã Xử Lý</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray text-csMedium font-medium truncate">Đã xử lý lúc:</p>
                            <p className="font-semibold text-csNormal text-gray-800">12/11/2025 11:45 AM</p>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="bg-white p-4 rounded-lg mainShadow">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Mô Tả</h4>
                    <p className="text-gray text-csMedium leading-relaxed">
                        Đây là một mô tả chi tiết về sự cố đã xảy ra. Ví dụ: "Vào lúc 10:00 sáng, một vụ tai nạn giao thông nghiêm trọng đã xảy ra tại giao lộ X và Y, liên quan đến hai xe ô tô và một xe máy..."
                    </p>
                </div>

                {/* Map Section */}
                <div className="bg-white p-4 rounded-lg mainShadow">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Vị Trí Sự Cố</h4>
                    <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden">
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <PinMarker position={position} />
                        </MapContainer>
                    </div>

                    <div className='w-full h-fit'>
                        <button className='w-full h-fit bg-mainRed flex gap-2.5 justify-center-safe items-center-safe text-white text-csNormal py-2.5!' onClick={handleViewOnMap}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                            </svg>

                            Xem trên B.Đồ
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsDetail;