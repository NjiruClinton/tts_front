"use client"

import React, { useEffect, useRef, useState, useMemo } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import TaskCalendarDialog, {Task} from "@/components/admin/calendar/TaskDialog"
import {fetchTasks} from "@/utils/tasks"
import "@/styles/globals.css"

const TaskCalendar: React.FC = () => {
    const calendarRef = useRef<FullCalendar | null>(null);
    const [showTaskListDialog, setShowTaskListDialog] = useState(false);
    const [calendarTasksList, setCalendarTasksList] = useState<Task>({
        id: "",
        title: "",
        description: "",
        priority: "",
        status: "",
        deadline: ""
    })

    const [tasks, setTasks] = useState<Task[]>([])

    const fetchTask = async () => {
        try {
            let rows_per_page = 100
            let response: any = await fetchTasks(
                rows_per_page,
                "",
                "",
                "createdAt",
                "DESC"
            )
            if (response.error) {
            } else {
                setTasks(response.tasks)
            }
        } catch (e: any) {
            console.error('Error fetching tasks:', e)
        } finally {
        }
    }

const getPriorityColor = (priority: "high" | "medium" | "low" | string): string => {
    const colors: Record<"high" | "medium" | "low" | string, string> = {
        high: "#ef5350",
        medium: "#fb8c00",
        low: "#66bb6a"
    }
    return colors[priority] || "#9e9e9e"
}

    const formattedTasks = useMemo(() => {
        return tasks.map((task) => ({
            id: task.id,
            title: task.title,
            start: new Date(task.deadline).toISOString(),
            allDay: true,
            description: task.description,
            extendedProps: {
                priority: task.priority,
                status: task.status,
                description: task.description
            },
            backgroundColor: getPriorityColor(task.priority),
            borderColor: getPriorityColor(task.priority),
            classNames: [
                `priority-${task.priority.toString().toLowerCase()}`,
                `status-${task.status.toLowerCase().replace(" ", "-")}`
            ]
        }))
    }, [tasks])

    const handleEventClick = (info: any) => {
        setCalendarTasksList({
            id: info.event._def.publicId,
            title: info.event._def.title,
            description: info.event._def.extendedProps.description,
            priority: info.event._def.extendedProps.priority,
            status: info.event._def.extendedProps.status,
            deadline: info.event.start.toISOString()
        })
        setShowTaskListDialog(true)
    }

    useEffect(() => {
        fetchTask()
    }, [])

    return (
        <section className="rounded-md py-3 p-2 h-full w-full bg-white border overflow-x-auto">
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Task Calendar</h2>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="!w-3 h-3 rounded-full bg-red-500"></span>
                        <span>High Priority</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="!w-3 h-3 rounded-full bg-orange-500"></span>
                        <span>Medium Priority</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="!w-3 h-3 rounded-full bg-green-500"></span>
                        <span>Low Priority</span>
                    </div>
                </div>
            </div>
            <TaskCalendarDialog
                calendarTasksList={calendarTasksList}
                showTaskListDialog={showTaskListDialog}
                onClose={() => setShowTaskListDialog(false)}
            />
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                events={formattedTasks}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                height="auto"
                eventDisplay="block"
                eventClick={handleEventClick}
            />
        </div>
        </section>
    );
};

export default TaskCalendar
