import React, { useState } from "react"
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css";

interface SnapMap_interface {
    getPosition: (coords: { lat: number, lng: number }) => void;
    onClose: () => void;
}

const SnapMap: React.FC<SnapMap_interface> = ({ getPosition, onClose }) => {
    const initialCenter = { lat: 10.8231, lng: 106.6297 };
    const [center, setCenter] = useState(initialCenter);
    const [map, setMap] = useState<any>(null);

    function MapMoveEvents() {
        const mapInstance = useMapEvents({
            move() {
                setCenter(mapInstance.getCenter());
            },
        });
        return null;
    }

    const handleMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                if (map) {
                    map.flyTo([latitude, longitude], 15);
                }
            }, () => {
                alert("Không thể lấy vị trí của bạn. Vui lòng kiểm tra cài đặt trình duyệt.");
            });
        } else {
            alert("Trình duyệt của bạn không hỗ trợ Geolocation.");
        }
    };

    return (
        <div className="absolute top-0 left-0 h-full w-full bg-white flex flex-col z-50">
            <MapContainer
                center={[initialCenter.lat, initialCenter.lng]}
                zoom={13}
                style={{ height: "100%", width: "100%", position: "relative" }}
                className="z-0"
                ref={setMap}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <MapMoveEvents />

                {/* Center Marker */}
                <span className="absolute z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-full !h-fit !w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 fill-mainRed drop-shadow-lg">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                </span>

                {/* Back Button */}
                <button onClick={onClose} className="absolute z-[1000] top-5 left-5 bg-white p-2 rounded-full mainShadow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {/* My Location Button */}
                 <button onClick={handleMyLocation} className="absolute z-[1000] top-5 right-5 bg-white p-2 rounded-full mainShadow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v.001M12 12.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                </button>

                {/* Bottom Control Panel */}
                <div className="absolute z-[1000] bottom-0 left-0 w-full p-4">
                    <div className="w-full bg-white rounded-main mainShadow p-4 flex flex-col gap-4">
                        <span className="">
                            <p className="text-csMedium font-semibold">Hệ tọa độ: WGS84</p>
                            <span className="flex gap-5 text-csNormal">
                                <p><b>Kinh độ:</b> {center.lng.toFixed(6)}</p>
                                <p><b>Vĩ độ:</b> {center.lat.toFixed(6)}</p>
                            </span>
                        </span>
                        <button
                            onClick={() => getPosition(center)}
                            className="w-full bg-mainLightBlue !text-csBig text-white flex items-center-safe justify-center-safe gap-2 !py-2.5 !rounded-main"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 fill-white">
                                <path fillRule="evenodd" d="M12 21.638c-5.042-5.042-7.86-8.28-7.86-11.638a7.86 7.86 0 0 1 15.72 0c0 3.358-2.818 6.596-7.86 11.638ZM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                            </svg>
                            Xác nhận vị trí này
                        </button>
                    </div>
                </div>
            </MapContainer>
        </div>
    )
}

export default SnapMap