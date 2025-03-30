"use client";

import { useEffect, useMemo, useState } from "react";
import '@/styles/global.css'
import {fetchTaskCounts} from "@/utils/tasks";


export default function TaskProgress() {

    useEffect(() => {
        fetchTotalCounts()
    }, []);

    
    
    const [taskCounts, setTaskCounts] = useState({
        total: 0,
        todo: 0,
        done: 0,
        in_progress: 0,
    })
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
    const totalTasks = useMemo(() => {
        return taskCounts.total
    }, [taskCounts.total])
    
    const completedTasks = useMemo(() => {
        return taskCounts.done
    }, [taskCounts.done])
    const inProgressTasks = useMemo(() => {
        return taskCounts.in_progress
    }, [taskCounts.in_progress])
    const pendingTasks = useMemo(() => {
        return taskCounts.todo
    }, [taskCounts.todo])
    
    const completedPercentage = useMemo(() => {
        return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    }, [totalTasks, completedTasks])

    const inProgressPercentage = useMemo(() => {
        return totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0
    }, [totalTasks, inProgressTasks])

    const totalPercentage = completedPercentage.toFixed(2)

    // Arc Path Functions
    function getArcPath(startAngle: number, endAngle: number) {
        const start = polarToCartesian(100, 90, 80, -startAngle);
        const end = polarToCartesian(100, 90, 80, -endAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return `M ${start.x} ${start.y} A 80 80 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    }

    function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    }

    return (
        <section className="border rounded-md p-4 h-[450px] flex flex-col">
            <div className="flex justify-between items-center mb-4 bottom-1 border-b border-gray-200">
                <h1 className="font-semibold text-lg text-indigo-700">{totalTasks} Tasks</h1>
            </div>

            {/* Gauge Start */}
            <section className="flex justify-center items-center mt-4 w-full h-[290px]">
                <div className="relative w-full h-full">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                        {/* Background arc */}
                        <path d="M20 90 A 80 80 0 0 1 180 90" fill="none" stroke="#e5e7eb" strokeWidth="10" />

                        {/* Completed Tasks Arc */}
                        <path
                            d={getArcPath(-90, (completedPercentage / 100) * 180 - 90)}
                            fill="none"
                            stroke="url(#blueGradient)"
                            strokeWidth="10"
                        />

                        <defs>
                            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: "#60A5FA" }} />
                                <stop offset="100%" style={{ stopColor: "#6366F1" }} />
                            </linearGradient>
                        </defs>

                        {/* In-Progress Tasks Arc */}
                        <path
                            d={getArcPath(
                                (completedPercentage / 100) * 180 - 90,
                                ((completedPercentage + inProgressPercentage) / 100) * 180 - 90
                            )}
                            fill="none"
                            stroke="url(#orangeGradient)"
                            strokeWidth="10"
                        />

                        <defs>
                            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: "#FBBF24" }} />
                                <stop offset="100%" style={{ stopColor: "#F59E0B" }} />
                            </linearGradient>
                        </defs>

                        {/* Percentage Text */}
                        <text x="100" y="85" textAnchor="middle" className="text-[20px] font-bold">
                            {totalPercentage}%
                        </text>
                    </svg>
                </div>
            </section>
            {/* Gauge End */}

            <div className="flex justify-around mt-[-20px]">
                <div className="text-center">
                    <p className="font-medium text-sm text-[#8D98A9]">Total Tasks</p>
                    <p className="font-bold">{totalPercentage}%</p>
                </div>

                <div className="text-center">
                    <p className="font-medium text-sm text-[#8D98A9]">In-Progress Tasks</p>
                    <p className="font-bold">{inProgressPercentage.toFixed(2)}%</p>
                </div>

                <div className="text-center">
                    <p className="font-medium text-sm text-[#8D98A9]">Completed Tasks</p>
                    <p className="font-bold">{completedPercentage.toFixed(2)}%</p>
                </div>
            </div>
        </section>
    );
}