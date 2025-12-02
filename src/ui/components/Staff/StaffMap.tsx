import { Marker, useMap, useMapEvents } from "react-leaflet"
import { ZoomButton } from "../../pages/Map"
import { useEffect, useRef, useState } from "react"
import { toastConfig } from "../../../config/toastConfig"
import L from "leaflet"
import { webSocketManagerTracking } from "../../../websocket/socketToTracking"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { useParams } from "react-router"
import "leaflet-routing-machine";

const MyPositionMarker: React.FC<{ position: [number, number] }> = ({
    position,
}) => {
    const icon = L.divIcon({
        className: "custom-pin-marker",
        html: `
    <i class="fas fa-map-marker text-2xl text-mainRed"></i>
    `,
        iconSize: [24, 24],
        iconAnchor: [24 / 2, 24]
    });

    return <Marker position={position} icon={icon} />;
};

interface StaffMap_interface {
    changeLayer: () => void,
    toggleReport: () => void
}

const StaffMap: React.FC<StaffMap_interface> = ({ changeLayer, toggleReport }) => {
    // Map event - simplified
    const mapEvent = useMapEvents({
        movestart: () => {
            if (isNote) setIsNote(false);
            // Removed programmaticMove.current and isTracking checks
        },
        moveend: () => {
            // Removed programmaticMove.current check
        }
    });

    // Toogle share location
    const [isShareLocation, setIsShareLocation] = useState<boolean>(false)

    const toggleShareLocation = () => {
        // userPosition now comes from Redux
        if (!isShareLocation && userPosition) {
            webSocketManagerTracking.sendMessage("updateCoordinate", { lat: userPosition[0], lng: userPosition[1] })
        }
        setIsShareLocation(!isShareLocation)
    }

    // Toggle note
    const [isNote, setIsNote] = useState<boolean>(false)

    const toggleNote = () => {
        setIsNote(!isNote)
    }

    // userPosition now comes from Redux
    const userPosition = useSelector((state: RootState) => state.currentLocation.staffPosition);
    const map = useMap()

    const centerOnUser = () => {
        if (userPosition) {
            map.flyTo(userPosition, 15);
        } else {
            toastConfig({
                toastMessage: "Chưa thể xác định vị trí của bạn.",
                toastType: "error",
            });
        }
    };

    const routingControlRef = useRef<L.Routing.Control | null>(null);

    // Routing
    const myTask = useSelector((state: RootState) => state.staff.newTask)
    const { reportId } = useParams<{ reportId: string }>();

    useEffect(() => {
        if (!map) return;

        const isTaskPage = myTask?.report?.id && reportId === String(myTask.report.id);

        if (isTaskPage) {
            setTimeout(() => map.invalidateSize(), 200);

            if (!routingControlRef.current) {
                routingControlRef.current = L.Routing.control({
                    waypoints: [], // Initially empty
                    lineOptions: {
                        styles: [{ color: "#007bff", weight: 6 }],
                        extendToWaypoints: false,
                        missingRouteTolerance: 0
                    },
                    show: false,
                    addWaypoints: false,
                    createMarker: () => null,
                } as any).addTo(map);
            }

            if (userPosition) {
                const waypoints = [
                    L.latLng(userPosition[0], userPosition[1]),
                    L.latLng(myTask.report.lat, myTask.report.lng)
                ];
                routingControlRef.current.setWaypoints(waypoints);
            }
        } else {
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
                routingControlRef.current = null;
            }
        }
    }, [reportId, myTask?.report?.id, userPosition, map, myTask?.report?.lat, myTask?.report?.lng]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (map && routingControlRef.current) {
                map.removeControl(routingControlRef.current);
                routingControlRef.current = null;
            }
        };
    }, [map]);

    return (
        <>
            {userPosition && <MyPositionMarker position={userPosition} />}
            <span className="absolute z-2000 bottom-20 right-2.5 flex flex-col gap-7.5">
                <span className="flex flex-col gap-2.5">
                    <button className="mainShadow h-fit aspect-square bg-mainDark rounded-full! p-3!" onClick={toggleNote}>
                        <i className="fas fa-question text-white"></i>
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

                    <button className={`relative mainShadow h-fit aspect-square bg-white ${isShareLocation && "bg-mainRed!"} rounded-full! p-3!`} onClick={toggleShareLocation}>
                        {isNote && (
                            <p
                                className="mainShadow text-nowrap absolute top-1/2 translate-y-[-50%] right-[calc(100%+10px)] bg-mainDark text-white px-2.5 py-1.5 before:content-[''] before:absolute before:top-1/2 before:-right-2 before:-translate-y-1/2 before:border-y-6 before:border-y-transparent before:border-l-8 before:border-l-mainDark rounded-small"
                            >
                                Chia sẻ vị trí
                            </p>
                        )}

                        <i className={`fas fa-satellite-dish ${isShareLocation && "text-white"}`}></i>

                    </button>

                    <button className="relative mainShadow h-fit aspect-square bg-white rounded-full! p-3!" onClick={centerOnUser}>
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