"use client";

import React, {useRef, useState} from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext"
import { Editor } from "primereact/editor"
import { Dropdown } from "primereact/dropdown"
import { Calendar } from "primereact/calendar"
import { Toast } from "primereact/toast"
import InputContainer from "./InputContainer"
import {createTask} from "@/utils/tasks"

interface CreateTaskDialogProps {
    openCreateTaskDialog: boolean;
    onClose: () => void;
    fetchTasks: () => void;
}

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
                                                               openCreateTaskDialog,
                                                               onClose,
                                                               fetchTasks,
                                                           }) => {
    const appStore = {
        priority: [
            { name: "Low" },
            { name: "Medium" },
            { name: "High" },
        ],
    }

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
    const [taskEndDate, setTaskEndDate] = useState<Date | null>(null);
    const toast = useRef<Toast>(null)
    const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!taskName || !taskDescription || !taskEndDate || !selectedPriority) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill in all required fields",
                life: 3000,
            })
            return;
        }
        setIsSubmitting(true);

        try {
            let task = await createTask(
                taskName,
                taskDescription,
                selectedPriority.toLowerCase(),
               taskEndDate.toISOString(),
            )
            if (task.errors) {
                toast.current?.show({
                    severity: "error",
                    summary: "Error",
                    detail: task.errors[0],
                    life: 3000,
                })
                return
            }
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Task created successfully!",
                life: 3000,
            })

            // Reset form
            setTaskName("");
            setTaskDescription("");
            setTaskEndDate(null);
            setSelectedPriority(null);

            fetchTasks()
            onClose()
        } catch (error) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to create task",
                life: 3000,
            })
        } finally {
            // setIsSubmitting(false);
        }
    };

    const headerElement = (
        <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-semibold text-[#1a40e2]">Create Task</h2>
            {/*<button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">*/}
            {/*    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"*/}
            {/*         stroke="currentColor">*/}
            {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>*/}
            {/*    </svg>*/}
            {/*</button>*/}
        </div>
    );

    return (
        <>
            <Toast ref={toast}/>
            <Dialog visible={openCreateTaskDialog} header={headerElement} onHide={onClose} modal style={{width: "45rem"}}>
                <div className="p-6 bg-white rounded-lg">
                   
                    <form onSubmit={handleCreateTask} className="space-y-6">
                        {/* Task Name */}
                        <InputContainer label="Title" required>
                            <InputText
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                className="border-gray-300 focus:border-indigo-600 focus:ring-blue-500"
                            />
                        </InputContainer>

                        {/* Task Description */}
                        <InputContainer label="Description">
                            <Editor
                                value={taskDescription}
                                onTextChange={(e) => setTaskDescription(e.htmlValue || "")}
                                style={{ height: "150px" }}
                                className="border-gray-300 focus:border-indigo-600 focus:ring-blue-500"
                            />
                        </InputContainer>

                        {/* Priority */}
                        <InputContainer label="Priority">
                            <Dropdown
                                value={selectedPriority}
                                options={appStore.priority}
                                onChange={(e) => setSelectedPriority(e.value)}
                                optionLabel="name"
                                optionValue="name"
                                placeholder="Select Priority"
                                className="w-full md:w-14rem border-gray-300 focus:border-indigo-600 focus:ring-blue-500"
                            />
                        </InputContainer>

                        {/* Deadline */}
                        <InputContainer label="Deadline">
                            <Calendar
                                value={taskEndDate}
                                onChange={(e) => setTaskEndDate(e.value as Date)}
                                className="w-full border-gray-300 focus:border-indigo-600 focus:ring-blue-500"
                            />
                        </InputContainer>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <svg className="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    "Create"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </>
    );
};

export default CreateTaskDialog