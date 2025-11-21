import { IonPage } from "@ionic/react"
import React, { useEffect, useRef, useState } from "react"
import { useMap, MapContainer, TileLayer } from 'react-leaflet'

// Component
import UserMap from "../components/User/UserMap";
import StaffMap from "../components/Staff/StaffMap";
import RenderReport from "../components/RenderReport";
import { Capacitor } from "@capacitor/core";
import { toastConfig } from "../../config/toastConfig";

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

    const mapRef = useRef<L.Map>(null);
    

    return (
        <IonPage>
            <div className="relative h-full w-full">
                <MapContainer
                    center={[10.8231, 106.6297]}
                    zoom={5}
                    style={{ height: "100%", width: "100%", position: "relative" }}
                    className="z-0"
                    // ref={mapRef}
                    zoomControl={false}
                >
                    <MapResizeHandler />
                    <TileLayer
                        url={mapLayers.current[layer].layer}
                        attribution={mapLayers.current[layer].attribution}
                    />

                    <RenderReport />

                    {isUser ? (
                        <UserMap changeLayer={changeLayer} />
                    ) : (
                        <StaffMap changeLayer={changeLayer} />
                    )}
                </MapContainer>
            </div>
        </IonPage>
    )
}

export default MapPage