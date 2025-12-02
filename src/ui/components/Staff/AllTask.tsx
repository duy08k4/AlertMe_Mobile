// Import libraries
import { IonPage } from "@ionic/react"
import React, { useState } from "react"

// Components
import NewsDetail from "../NewsDetail" // Keep for structural completeness, but it won't be used without data

// Main component
const AllTask: React.FC = () => {
    // State 
    const [isPending, setIsPending] = useState<boolean>(true)
    const [isTaskDetail, setIsTaskDetail] = useState<boolean>(false) // Keep for structural completeness
    const [searchTerm, setSearchTerm] = useState<string>("") // New state for search term

    const changeList = (type: boolean) => {
        setIsPending(type)
    }

    const toggleTaskDetail = () => {
        setIsTaskDetail(!isTaskDetail)
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    // No actual tasks, so the count is 0
    const taskCount = 0;

    return (
        <div className="fixed top-0 left-0 z-1000 bg-white h-full w-full flex flex-col pt-5 gap-2.5">
            <span className="w-full px-mainTwoSidePadding">
                <span className=" mainShadow p-[0.5px] w-full h-10 bg-lightGray flex rounded-main">
                    <button
                        onClick={() => { changeList(true) }}
                        className={`text-csNormal font-medium h-full w-1/2 ${isPending ? "bg-white" : "bg-transparent"} rounded-main!`}
                    >
                        Được giao
                    </button>

                    <button
                        onClick={() => { changeList(false) }}
                        className={`text-csNormal font-medium h-full w-1/2 ${!isPending ? "bg-white" : "bg-transparent"} rounded-main!`}
                    >
                        Đã hoàn thành
                    </button>
                </span>
            </span>

            <span className="flex-1 h-0 flex flex-col px-mainTwoSidePadding">
                <span className="flex flex-col bg-white gap-2.5 pb-2.5">
                    <span className="w-full">
                        <h2>Tất cả nhiệm vụ</h2>
                        <p className="text-csNormal text-mainRed font-medium">Số lượng: {taskCount} nhiệm vụ</p>
                    </span>

                    <span className="w-full flex items-center-safe gap-2.5">
                        <span className="mainShadow h-10 flex-1 flex items-center-safe gap-2.5 px-2.5 rounded-small">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>

                            <input
                                className="text-csNormal! h-full w-full outline-none"
                                type="text"
                                placeholder="Tìm kiếm nhiệm vụ..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </span>
                    </span>
                </span>

                <div className="w-full flex-1 overflow-auto flex flex-wrap justify-start content-start gap-2 px-0.5 py-2.5">
                    {/* Task cards would go here if there were data */}
                    <p className="text-gray-500 text-center w-full mt-4">Không có nhiệm vụ nào.</p>
                </div>
            </span>

            {isTaskDetail && (<NewsDetail onClose={toggleTaskDetail} />)}
        </div>
    )
}

export default AllTask