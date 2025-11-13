import { useState } from "react"
import { ZoomButton } from "../../pages/Map"
import { useMapEvent } from "react-leaflet"

interface UserMap_interface {
    changeLayer: () => void
}

const UserMap: React.FC<UserMap_interface> = ({ changeLayer }) => {

    // Map event
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

    return (
        <>
            <span className="absolute z-1000 bottom-10 right-2.5 flex flex-col gap-7.5">
                <span className="flex flex-col gap-2.5">
                    <button className="mainShadow h-fit aspect-square bg-mainDark rounded-full! p-3!" onClick={toggleNote}>
                        <i className="fas fa-question text-white"></i>
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

                    <button className="relative mainShadow h-fit aspect-square bg-white rounded-full! p-3!">
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

export default UserMap