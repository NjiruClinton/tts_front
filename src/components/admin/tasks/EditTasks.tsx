"use client"
import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import {Task} from "./tasks";
import {updateTask} from "../../../utils/tasks";


export interface EditTaskProps {
    showEditModal: boolean;
    task: Task;
    // tasks: Task[];
    onClose: () => void;
    onUpdate: any // (updatedTask: Task) => void;
}

const EditTask: React.FC<EditTaskProps> = ({
                                               showEditModal,
                                               task,
                                               onClose,
                                               onUpdate,
                                           }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editedTask, setEditedTask] = useState<Task>({ ...task });

    const handleEditTask = async () => {
        try {
            setIsLoading(true)
            let updatedTask = await updateTask(
                editedTask.id,
                editedTask.title,
                editedTask.description,
                editedTask.priority.toLowerCase(),
                editedTask.status,
                new Date(editedTask.deadline).toISOString(),
            )
            if(!updatedTask.error) {
                setIsLoading(false)
                onUpdate(updatedTask)
                setShowEdit(false)
                onClose()
            } else {
                
            }
            
        } catch (error) {
            console.error("Error updating task:", error);
            setIsLoading(false)
        }
    };

    const headerElement = (
        <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-semibold text-[#1a40e2]">Edit Task</h2>
        </div>
    );

    return (
        <div>
            <Dialog visible={showEditModal} header={headerElement} modal style={{width: "45rem"}} onHide={onClose}>
                <div className="bg-white rounded-lg">
                    <hr />
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-2">
                            {showEdit ? (
                                <InputText
                                    type="text"
                                    value={editedTask.title}
                                    onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-indigo-600"
                                />
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold">{task.id} -</span>
                                    <span className="text-xl capitalize">{task.title}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-2">
                            {showEdit ? (
                                <>
                                    <button
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md shadow-sm hover:bg-indigo-600"
                                        onClick={handleEditTask}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Saving..." : "Save"}
                                    </button>
                                    <button
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
                                        onClick={() => setShowEdit(false)}
                                    >
                                        Close
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md shadow-sm hover:bg-indigo-600"
                                    onClick={() => setShowEdit(true)}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        {showEdit ? (
                            <Editor
                                value={editedTask.description}
                                onTextChange={(e) => setEditedTask({...editedTask, description: e.htmlValue || ""})}
                                style={{height: "150px"}}
                            />
                        ) : (
                            <div className="prose prose-sm max-w-none"
                                 dangerouslySetInnerHTML={{__html: task.description}}/>
                        )}
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Priority</h3>
                        {showEdit ? (
                            <Dropdown
                                value={editedTask.priority}
                                options={["Low", "Medium", "High"]}
                                onChange={(e) => setEditedTask({...editedTask, priority: e.value})}
                                placeholder="Select Priority"
                                className="w-full md:w-64 border-gray-300"
                            />
                        ) : (
                            <p className="text-gray-900">{task.priority}</p>
                        )}
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Deadline</h3>
                        {showEdit ? (
                            <Calendar
                                value={new Date(editedTask.deadline)}
                                onChange={(e) => setEditedTask({...editedTask, deadline: e.value?.toString() || ""})}
                                dateFormat="dd/mm/yy"
                                className="w-full md:w-64 border-gray-300"
                            />
                        ) : (
                            <p className="text-gray-900">{task.deadline}</p>
                        )}
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default EditTask