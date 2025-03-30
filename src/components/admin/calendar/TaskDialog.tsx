import React from "react";
import { Dialog } from "primereact/dialog";

export interface Task {
    id: string
    title: string
    priority: "high" | "medium" | "low" | string
    status: "open" | "in-progress" | "closed" | string
    deadline: string
    description: string
}

interface TaskCalendarDialogProps {
    calendarTasksList: Task
    showTaskListDialog: boolean
    onClose: () => void
}

const getPriorityColor = (priority: Task["priority"]): string => {
    const colors: Record<Task["priority"], string> = {
        high: "bg-red-500",
        medium: "bg-orange-500",
        low: "bg-green-500",
    };
    return colors[priority] || "bg-gray-500"
};

const getStatusColor = (status: Task["status"]): string => {
    const colors: Record<Task["status"], string> = {
        open: "bg-blue-500",
        "in-progress": "bg-yellow-500",
        closed: "bg-gray-500",
    };
    return colors[status] || "bg-gray-500"
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (!isFinite(date.getTime())) {
        return "Invalid date"
    }
    return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date)
};

const formatTime = (dateString: string): string => {
    const date = new Date(dateString)
    if (!isFinite(date.getTime())) {
        return "Invalid time"
    }
    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date)
}

const capitalizeFirst = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1)

const TaskCalendarDialog: React.FC<TaskCalendarDialogProps> = ({
                                                                   calendarTasksList,
                                                                   showTaskListDialog,
                                                                   onClose,
                                                               }) => {
    const headerElement = (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-indigo-600">
                {calendarTasksList.title}
            </h2>
        </div>
    )
    return (
        <Dialog
            visible={showTaskListDialog}
            onHide={onClose}
            style={{ width: "25rem" }}
            header={headerElement}
        >
            <div className="bg-white rounded-lg">
                {/* Status and Priority */}
                <div className="flex gap-3 mb-6">
                    <div
                        className={`px-3 py-1.5 rounded-full text-white text-sm font-medium ${getPriorityColor(
                            calendarTasksList.priority
                        )}`}
                    >
                        <i className="pi pi-flag mr-1"></i>
                        {calendarTasksList.priority}
                    </div>
                    <div
                        className={`px-3 py-1.5 rounded-full text-white text-sm font-medium ${getStatusColor(
                            calendarTasksList.status
                        )}`}
                    >
                        <i className="pi pi-clock mr-1"></i>
                        {capitalizeFirst(calendarTasksList.status)}
                    </div>
                </div>

                {/* Date and Time */}
                <div className="flex items-center space-x-3 mb-6 text-gray-700">
                    <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                        <i className="pi pi-calendar text-indigo-600 mr-2"></i>
                        <div>
                            <div className="text-sm font-medium">
                                {formatDate(calendarTasksList.deadline)}
                            </div>
                            <div className="text-xs text-gray-500">
                                {formatTime(calendarTasksList.deadline)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="divider my-4 border-t border-gray-200"></div>

                {/* Description */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <i className="pi pi-file-edit text-gray-600"></i>
                        <h3 className="font-medium text-gray-700">Description</h3>
                    </div>
                    <div
                        className="prose prose-sm max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{ __html: calendarTasksList.description }}
                    ></div>
                </div>

                {/* Close Button */}
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="btn-danger outlined">
                        Close
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default TaskCalendarDialog
