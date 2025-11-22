import { IonPage } from "@ionic/react"
import React, { useEffect, useRef, useState } from "react"
import { useMap, MapContainer, TileLayer } from 'react-leaflet'
import { useDispatch, useSelector } from "react-redux";
import L from 'leaflet';

// Component
import UserMap from "../components/User/UserMap";
import StaffMap from "../components/Staff/StaffMap";
import RenderReport from "../components/RenderReport";
import ListDiscoveredReport from "../components/ListDiscoveredReport";
import NewsDetail from "../components/NewsDetail";
import { RootState } from "../../redux/store";
import { setDiscoveredReport } from "../../redux/reducers/report";
import { reportService } from "../../services/report";
import { toastConfig } from "../../config/toastConfig"; // Added import

// Map resize
export const MapResizeHandler: React.FC = () => {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [map]);
    return null;
};

// Zoom button
export const ZoomButton: React.FC = () => {
    const map = useMap()
    const [zoomLevel, setZoomLevel] = useState<number>()

    useEffect(() => {
        setZoomLevel(map.getZoom())

        const onZoom = () => {
            setZoomLevel(map.getZoom())
        };

        map.on("zoomend", onZoom);
        return () => {
            map.off("zoomend", onZoom);
        };
    }, [map])

    return (
        <span className="flex flex-col gap-2.5">
            <button className="mainShadow h-fit aspect-square bg-white flex justify-center-safe items-center-safe rounded-full! p-3!" onClick={() => { map.zoomIn() }}>
                <i className="fas fa-plus"></i>
            </button>

            <div className="mainShadow h-fit aspect-square bg-mainRed flex justify-center-safe items-center-safe rounded-full! p-3!">
                <p className="text-csNormal text-white font-medium">{zoomLevel}</p>
            </div>

            <button className="mainShadow h-fit aspect-square bg-white flex justify-center-safe items-center-safe rounded-full! p-3!" onClick={() => { map.zoomOut() }}>
                <i className="fas fa-minus"></i>
            </button>
        </span>
    )
}


const MapPage: React.FC<{ isUser: boolean }> = ({ isUser }) => {
    // State
    const [isDiscoveredReport, setIsDiscoveredReport] = useState<boolean>(false)
    const [isNewsDetail, setIsNewsDetail] = useState<boolean>(false)
    const [isReport, setIsReport] = useState<boolean>(true)
    const [map, setMap] = useState<L.Map | null>(null);

    // Redux
    const userId = useSelector((state: RootState) => state.user.user.id)
    const dispatch = useDispatch();
    const allReports = useSelector((state: RootState) => state.report.reports);

    // Layer
    const [layer, setLayer] = useState<number>(0)

    const mapLayers = useRef<Array<{ layer: string, attribution: string }>>([
        { layer: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", attribution: "&copy; OpenStreetMap contributors &copy; CARTO" },
        { layer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: "&copy; OpenStreetMap contributors" }
    ])

    const changeLayer = () => {
        if (layer === mapLayers.current.length - 1) {
            setLayer(0)
        } else {
            setLayer(layer + 1)
        }
    }

    const MapInstanceProvider: React.FC = () => {
        const mapInstance = useMap();
        useEffect(() => {
            if (mapInstance) {
                setMap(mapInstance);
            }
        }, [mapInstance]);
        return null;
    };

    const handleDiscover = () => {
        if (!map) {
            console.error("Map instance is not available yet.");
            return;
        }
        const bounds = map.getBounds();
        const visibleReports = allReports.filter(report =>
            report.lat && report.lng && bounds.contains([report.lat, report.lng])
        );
        dispatch(setDiscoveredReport(visibleReports));
        setIsDiscoveredReport(!isDiscoveredReport)
    }

    const handleDetail = () => {
        setIsNewsDetail(!isNewsDetail)
    }

    const handleSOSClick = () => {
        const cooldown = 60000; // 60 seconds
        const lastSOSTimestamp = localStorage.getItem("lastSOSTimestamp");
        const now = new Date().getTime();

        if (lastSOSTimestamp) {
            const timeSinceLastSOS = now - parseInt(lastSOSTimestamp, 10);
            if (timeSinceLastSOS < cooldown) {
                const timeLeft = Math.ceil((cooldown - timeSinceLastSOS) / 1000);
                toastConfig({
                    toastType: "error",
                    toastMessage: `Vui lòng đợi ${timeLeft} giây trước khi gửi SOS tiếp theo.`
                });
                return;
            }
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const sendSOSReport = await reportService.sendSOS(userId, latitude, longitude)

                    if (sendSOSReport) {
                        localStorage.setItem("lastSOSTimestamp", now.toString());
                    }
                },
                (error) => {
                    // Silently fail on geolocation error
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            toastConfig({
                toastType: "error",
                toastMessage: "Trình duyệt không hỗ trợ định vị."
            });
        }
    };

    const toggleReport = () => {
        setIsReport(!isReport)
    }


    return (
        <IonPage>
            <div className="relative h-full w-full">
                <MapContainer
                    center={[10.8231, 106.6297]}
                    zoom={5}
                    style={{ height: "100%", width: "100%", position: "relative" }}
                    className="z-0"
                    zoomControl={false}
                >
                    <MapInstanceProvider />
                    <MapResizeHandler />
                    <TileLayer
                        url={mapLayers.current[layer].layer}
                        attribution={mapLayers.current[layer].attribution}
                    />

                    {isReport && (<RenderReport />)}

                    {isUser ? (
                        <UserMap changeLayer={changeLayer} toggleReport={toggleReport} />
                    ) : (
                        <StaffMap changeLayer={changeLayer} />
                    )}

                    {!isDiscoveredReport && (
                        <span className="absolute h-fit w-[80%] z-1000 bottom-5 left-1/2 translate-x-[-50%] flex gap-2.5">
                            <button
                                className="mainShadow flex-1 bg-mainRed text-white! rounded-small!"
                                onClick={handleSOSClick}
                            >
                                SOS
                            </button>

                            <button
                                className="mainShadow h-fit w-fit bg-mainDark text-white! font-medium flex items-center gap-2.5 px-5! py-2.5! rounded-small!"
                                onClick={handleDiscover}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>

                                Xem sự cố
                            </button>
                        </span>
                    )}
                </MapContainer>

                {isDiscoveredReport && (<ListDiscoveredReport reportDetail={handleDetail} onCloseDiscoveredReportList={handleDiscover} />)}
                {isNewsDetail && (<NewsDetail onClose={handleDetail} />)}

            </div>
        </IonPage>
    )
}

export default MapPage