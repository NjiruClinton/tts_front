"use client"
import React, {useEffect, useState} from "react";
import {DragDropContext, Droppable, Draggable} from "@hello-pangea/dnd";
import EditTasks from "./EditTasks";
import EmptyTask from "./EmptyTask";
import {fetchTasks} from "../../../utils/tasks";

export type Task = {
    id: string;
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    deadline: string;
    status: "open" | "In Progress" | "closed";
};

type TaskBoardProps = {
    tasks: Task[],
    updateTask: any,
    fetchTasks?: () => Promise<void>
};

const TaskBoard: React.FC<TaskBoardProps> = ({tasks, updateTask, fetchTasks}) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [task, setTask] = useState<Task | null>(null);
    // const [tasks, setTasks] = useState<Task[]>([])
    const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({});
    const statuses: Task["status"][] = ["open", "In Progress", "closed"];

    const allTasks = async () => {
        let rows_per_page = 5;
        // fetchTasks(rows_per_page, "", "", "createdAt", "DESC").then(r => {
            // setTasks(r.tasks)
        // });
    };

    const formatStatus = (status: string) => {
        return status
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const getTasksByStatus = (status: Task["status"]) => {
        let final_status = status === "In Progress" ? "in_progress" : status === "closed" ? "done" : "todo";
        return tasks.filter((task) => task.status === final_status)
    };

    const handleShowModal = (item: Task) => {
        setShowEditModal(true);
        setTask(item);
    };

    const toggleExpand = (itemId: string) => {
        setExpandedStates((prev) => ({...prev, [itemId]: !prev[itemId]}));
    }

    const handleUpdateTask = async (updatedTask: Task) => {
        try {
            let updated_task = await updateTask(updatedTask)
            if (updated_task.error) {
                console.error("Error updating task:", updated_task.error)
            } else {
                // allTasks()
                setShowEditModal(false)
                setTask(null)
            }

            // let final_status = updatedTask.status === "In Progress" ? "in_progress" : updatedTask.status === "closed" ? "done" : "todo"
            // let updated_task = await updateTask(
            //     updatedTask.id,
            //     updatedTask.title,
            //     updatedTask.description,
            //     updatedTask.priority.toLowerCase(),
            //     final_status,
            //     new Date(updatedTask.deadline).toISOString(),
            // )
            // if (!updated_task.error) {
            //     await allTasks()
            //     setShowEditModal(false)
            //     setTask(null)
            // } else {
            //     console.error("Error updating task:", updated_task.error);
            // }
        } catch (error) {
            console.error("Error updating task:", error)
        }
    }

    const onDragEnd = async (result: any) => {
        if (!result.destination) return
        let task_id = result.draggableId
        let movedTask = tasks.find((task) => task.id === task_id)
        if (!movedTask) return
        await handleUpdateTask({
            ...movedTask,
            status: result.destination.droppableId,
        })
    }

    useEffect(() => {
        // allTasks();
    }, []);

    return (
        <>
            {tasks.length !== 0 ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div
                        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 p-4 overflow-x-auto h-[calc(100vh-210px)]">
                        {statuses.map((status) => (
                            <div key={status}
                                 className="flex-shrink-0 sm:w-[300px] md:w-[350px] lg:w-[435px] h-[calc(100vh-250px)] sm:h-full">
                                <section className="bg-white rounded-t-xl p-4 shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className={`!w-2 h-2 rounded-full ${
                                                status === "closed" ? "bg-green-400" : status === "In Progress" ? "bg-yellow-400" : "bg-blue-400"}`}></div>
                                            <h2 className="text-lg font-semibold text-gray-700">{formatStatus(status)}</h2>
                                        </div>
                                        <span
                                            className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{getTasksByStatus(status).length}</span>
                                    </div>
                                </section>
                                <Droppable droppableId={status}>
                                    {(provided) => (
                                        <section className="bg-gray-50 space-y-4 p-4 rounded-b-xl h-max min-h-full"
                                                 ref={provided.innerRef} {...provided.droppableProps}>
                                            {getTasksByStatus(status).map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <TaskItem task={task} handleShowModal={handleShowModal}
                                                                      expandedStates={expandedStates}
                                                                      toggleExpand={toggleExpand}/>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </section>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </div>
                </DragDropContext>
            ) : (
                <EmptyTask selectedTaskStatus="open"/>
            )}

            {showEditModal && task && (
                <EditTasks
                    showEditModal={showEditModal}
                    task={task}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={fetchTasks}
                />
            )}
        </>
    );
};


const TaskItem: React.FC<{
    task: Task;
    handleShowModal: (item: Task) => void;
    expandedStates: Record<string, boolean>;
    toggleExpand: (itemId: string) => void
}> = ({task, handleShowModal, expandedStates, toggleExpand}) => {
    return (
        <div
            className="bg-white p-5 rounded-xl cursor-move border border-gray-100 hover:shadow-lg hover:border-purple-200 transform transition-all duration-300 ease-out relative group"
            onClick={() => handleShowModal(task)}
        >
            <div
                className={`absolute -top-[-14px] -right-[-10px] px-2.5 py-1 rounded-full text-xs font-medium shadow-sm transform transition-transform group-hover:scale-110 ${
                    task.priority === "high"
                        ? "bg-red-100 text-red-600"
                        : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                }`}
            >
                {task.priority}
            </div>
            <h3 className="font-semibold text-gray-800 text-base mb-2 pr-16">
                {task.title}
            </h3>
            <section className="bg-gray-50 rounded-lg p-4 mb-4 group-hover:bg-blue-50/50 transition-colors">
                <div className="relative">
                    <div
                        className={`text-sm text-gray-600 ${
                            !expandedStates[task.id] ? "line-clamp-3" : ""
                        }`}
                    >
                        <div dangerouslySetInnerHTML={{__html: task.description}}/>
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(task.id);
                    }}
                    className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none flex items-center"
                >
                      <span className="mr-1">
                        {expandedStates[task.id] ? "Show Less" : "Show More"}
                      </span>
                </button>
            </section>
            <section className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2 text-sm font-medium text-red-600">
                    <span>Deadline: {task.deadline}</span>
                </div>
            </section>
        </div>
    )
}

export default TaskBoard
