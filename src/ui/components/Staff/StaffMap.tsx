import { useMapEvent } from "react-leaflet"
import { ZoomButton } from "../../pages/Map"
import { useEffect, useRef, useState } from "react"
import { toastConfig } from "../../../config/toastConfig"
import { Capacitor } from "@capacitor/core"

interface StaffMap_interface {
    changeLayer: () => void
}

const StaffMap: React.FC<StaffMap_interface> = ({ changeLayer }) => {
    // Map event
    const mapRef = useRef<L.Map>(null);
    const map = useMapEvent("movestart", () => {
        if (isNote) setIsNote(false)
    })

    // Toggle report
    const [isReport, setIsReport] = useState<boolean>(false)

    const toggleReport = () => {

    }

    // Toggle Facility
    const [isFacility, setIsFacility] = useState<boolean>(false)

    const toggleFacility = () => {

    }

    // Toggle note
    const [isNote, setIsNote] = useState<boolean>(false)

    const toggleNote = () => {
        setIsNote(!isNote)
    }

    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
    const [isTracking, setIsTracking] = useState<boolean>(false);
    const isFirstTimeRef = useRef<boolean>(true);
    const watchIdRef = useRef<number | null>(null);
    const trackingRef = useRef(isTracking);

    const startTracking = () => {
        if (Capacitor.getPlatform() === "web" && isFirstTimeRef.current) {
            toastConfig({
                toastMessage:
                    "Lưu ý: Độ chính xác vị trí của bạn trên web có thể bị ảnh hưởng. Toạ độ các sự cố không thay đổi.",
                toastType: "info",
            });
            isFirstTimeRef.current = false;
        }

        if (navigator.geolocation) {
            setIsTracking(true);
            watchIdRef.current = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newPosition: [number, number] = [latitude, longitude];
                    setUserPosition(newPosition);
                    if (trackingRef.current) {
                        mapRef.current?.flyTo(newPosition, 15);
                    }
                },
                () => {
                    toastConfig({
                        toastMessage: "Không thể lấy vị trí của bạn",
                        toastType: "error",
                    });
                    stopTracking();
                }
            );
        } else {
            toastConfig({
                toastMessage: "Trình duyệt không hỗ trợ định vị",
                toastType: "error",
            });
        }
    };

    const toggleTracking = () => {
        if (isTracking) {
            stopTracking();
        } else {
            startTracking();
        }
    };

    const stopTracking = () => {
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
        setIsTracking(false);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopTracking();
        };
    }, []);

    return (
        <>
            <span className="absolute z-2000 bottom-10 right-2.5 flex flex-col gap-7.5">
                <span className="flex flex-col gap-2.5">
                    <button className="mainShadow h-fit aspect-square bg-mainDark rounded-full! p-3!" onClick={toggleNote}>
                        <i className="fas fa-question text-white"></i>
                    </button>

                    <button className="relative mainShadow h-fit aspect-square bg-white rounded-full! p-3!" onClick={toggleFacility}>
                        {isNote && (
                            <p
                                className="mainShadow text-nowrap absolute top-1/2 translate-y-[-50%] right-[calc(100%+10px)] bg-mainDark text-white px-2.5 py-1.5 before:content-[''] before:absolute before:top-1/2 before:-right-2 before:-translate-y-1/2 before:border-y-6 before:border-y-transparent before:border-l-8 before:border-l-mainDark rounded-small"
                            >
                                Vị trí nhân viên kỹ thuật
                            </p>
                        )}

                        <i className="fas fa-user-shield"></i>
                    </button>

                    <button className="relative mainShadow h-fit aspect-square bg-white rounded-full! p-3!" onClick={toggleFacility}>
                        {isNote && (
                            <p
                                className="mainShadow text-nowrap absolute top-1/2 translate-y-[-50%] right-[calc(100%+10px)] bg-mainDark text-white px-2.5 py-1.5 before:content-[''] before:absolute before:top-1/2 before:-right-2 before:-translate-y-1/2 before:border-y-6 before:border-y-transparent before:border-l-8 before:border-l-mainDark rounded-small"
                            >
                                Vị trí cơ quan & trạm
                            </p>
                        )}

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                        </svg>

                    </button>

                    <button className="relative mainShadow h-fit aspect-square bg-white rounded-full! p-3!" onClick={toggleReport}>
                        {isNote && (
                            <p
                                className="mainShadow text-nowrap absolute top-1/2 translate-y-[-50%] right-[calc(100%+10px)] bg-mainDark text-white px-2.5 py-1.5 before:content-[''] before:absolute before:top-1/2 before:-right-2 before:-translate-y-1/2 before:border-y-6 before:border-y-transparent before:border-l-8 before:border-l-mainDark rounded-small"
                            >
                                Vị trí sự cố
                            </p>
                        )}

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>

                    </button>
                </span>

                <ZoomButton />

                <span className="flex flex-col gap-2.5">
                    <button className="relative mainShadow h-fit aspect-square bg-white rounded-full! p-3!" onClick={changeLayer}>
                        {isNote && (
                            <p
                                className="mainShadow text-nowrap absolute top-1/2 translate-y-[-50%] right-[calc(100%+10px)] bg-mainDark text-white px-2.5 py-1.5 before:content-[''] before:absolute before:top-1/2 before:-right-2 before:-translate-y-1/2 before:border-y-6 before:border-y-transparent before:border-l-8 before:border-l-mainDark rounded-small"
                            >
                                Lớp bản đồ
                            </p>
                        )}

                        <i className="fas fa-layer-group"></i>
                    </button>

                    <button className="relative mainShadow h-fit aspect-square bg-white rounded-full! p-3!" onClick={toggleTracking}>
                        {isNote && (
                            <p
                                className="mainShadow text-nowrap absolute top-1/2 translate-y-[-50%] right-[calc(100%+10px)] bg-mainDark text-white px-2.5 py-1.5 before:content-[''] before:absolute before:top-1/2 before:-right-2 before:-translate-y-1/2 before:border-y-6 before:border-y-transparent before:border-l-8 before:border-l-mainDark rounded-small"
                            >
                                Vị trí của tôi
                            </p>
                        )}

                        <i className="fas fa-crosshairs"></i>
                    </button>
                </span>
            </span>
        </>
    )
}

export default StaffMap