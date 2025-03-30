"use client";

import { useState, useEffect } from "react"
import AllTasks from "@/components/admin/dashboard/AllTasks"
import OpenTasks from "@/components/admin/dashboard/OpenTasks"
import InProgressTasks from "@/components/admin/dashboard/InProgressTasks"
import CompletedTasks from "@/components/admin/dashboard/CompletedTasks"
import PastTasks from "@/components/admin/dashboard/PastTasks"
import TaskProgress from "@/components/admin/dashboard/Gauge"
import '@/styles/global.css'
import {fetchTaskCounts, fetchTasks} from "@/utils/tasks"

export default function Dashboard() {
    
    const [status, setStatus] = useState<string>("All Tasks");
    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState([])
    const [taskCounts, setTaskCounts] = useState({
        total: 0,
        todo: 0,
        done: 0,
        in_progress: 0,
    })
    const taskItems = [
        {
            taskStatus: "All Tasks",
            taskNumber: taskCounts.total,
            color: "text-amber-700",
        },
        {
            taskStatus: "Open Tasks",
            taskNumber: taskCounts.todo,
            color: "text-indigo-700",
        },
        {
            taskStatus: "Completed Tasks",
            taskNumber: taskCounts.done,
            color: "text-emerald-700",
        },
        {
            taskStatus: "Inprogress Tasks",
            taskNumber: taskCounts.in_progress,
            color: "text-purple-700",
        },
    ];

    const statuses = {
        allTasks: "All Tasks",
        openTasks: "Open Tasks",
        inProgressTasks: "Inprogress Tasks",
        completedTasks: "Completed Tasks",
    }
    
    const fetchTotalCounts = async () => {
        let totals = await fetchTaskCounts()
        let taskStatuses = {
            total: totals.total,
            todo: totals.todo,
            done: totals.done,
            in_progress: totals.in_progress,
        }
        setTaskCounts(taskStatuses)
    }

    useEffect(() => {
        fetchTotalCounts().then(r => {
            setStatus(statuses.allTasks)
        })
    }, [])

    const handleShowTask = (taskStatus: string) => {
        setStatus(taskStatus)
    }

    const getTaskStyles = (status: string) => {
        const styles: Record<string, string> = {
            "All Tasks": "bg-gradient-to-br from-amber-200 to-orange-150 border border-amber-250 uppercase",
            "Completed Tasks": "bg-gradient-to-br from-emerald-200 to-teal-150 border border-emerald-100 uppercase",
            "Open Tasks": "bg-gradient-to-br from-blue-200 to-indigo-150 border border-blue-80 uppercase",
            "Inprogress Tasks": "bg-gradient-to-br from-purple-200 to-indigo-150 border border-purple-100 uppercase",
        };
        return styles[status] || "";
    };
    // fetch tasks totals

    return (
        <section className="dashboard rounded-md py-3 p-2 h-full w-full bg-white border overflow-x-auto">
            {/* Task Category Cards */}
            <section className="">
                <div className="flex justify-between">
                    {taskItems.map((task, index) => (
                        <div key={index} className="w-full px-2">
                            <div
                                className={`w-full h-[135px] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg ${getTaskStyles(task.taskStatus)}`}
                                onClick={() => handleShowTask(task.taskStatus)}
                            >
                                <div className="flex items-center justify-between h-full p-6 relative">
                                    {/* Task Status Icon */}
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-105 bg-gray-100">
                                        <img src="/completedtasks.svg" className="w-8 h-8" alt="Task status icon" />
                                    </div>

                                    <div className={`flex flex-col items-end ${task.color}`}>
                                        <h1 className="text-[17px] font-medium mb-1">{task.taskStatus}</h1>
                                        <p className="text-[16px] font-bold">{task.taskNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Task Tables */}
            <section className="mt-[10px]">
                {status === statuses.allTasks && <AllTasks />}
                {status === statuses.openTasks && <OpenTasks />}
                {status === statuses.inProgressTasks && <InProgressTasks />}
                {status === statuses.completedTasks && <CompletedTasks />}
            </section>

            {/* Task Info & Charts */}
            <section className="flex w-full">
                <section className="w-2/3 mt-[10px] mr-2">
                    <PastTasks />
                </section>
                <section className="w-1/3 mt-[10px] ml-2">
                    <TaskProgress />
                </section>
            </section>
        </section>
    );
}
