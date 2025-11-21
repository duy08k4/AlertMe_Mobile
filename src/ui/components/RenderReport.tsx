import React, { useEffect } from "react"
import L from 'leaflet'
import { Marker } from "react-leaflet";
import { reportService } from "../../services/report";
import { useDispatch, useSelector } from "react-redux";
import { setReport } from "../../redux/reducers/report";
import { RootState } from "../../redux/store";
import uniqolor from 'uniqolor';
import MarkerClusterGroup from "react-leaflet-markercluster";

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

const RenderReport: React.FC = () => {
    const listReport = useSelector((state: RootState) => state.report.reports) //Shorted data
    
    return (
        <MarkerClusterGroup>
            {listReport.length === 0 ? null : (
                listReport.map((report, index) => {
                    return <PinMarker key={index} position={[report.lat, report.lng]} color={uniqolor(report.id).color} />
                })
            )}
        </MarkerClusterGroup>
    )
}

export default RenderReport