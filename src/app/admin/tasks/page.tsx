'use client';

import { useState, useEffect } from 'react'
import {Dropdown} from "primereact/dropdown";
import TaskBoard, {Task} from "@/components/admin/tasks/tasks";
import SearchInput from "@/components/admin/tasks/SimpleSearch";
import CreateTasks from "@/components/admin/dashboard/CreateTasks";
import CustomLoader from "@/components/admin/tasks/CustomLoader";
import '@/styles/globals.css'
import {fetchTasks, updateTask} from "@/utils/tasks";

const Tasks = () => {
    let appStore = {
        taskStatus: [
            { name: 'open' },
            { name: 'In Progress' },
            { name: 'closed' },
        ],
    }
    const [searchTask, setSearchTask] = useState('')
    const [openCreateTaskDialog, setOpenCreateTaskDialog] = useState(false)
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedTaskStatus, setSelectedTaskStatus] = useState('')

    const fetchTask = async () => {
        setLoading(true)
        setError(null)
        try {
            let final_status = selectedTaskStatus === "In Progress" ? "in_progress" : selectedTaskStatus === "closed" ? "done" : selectedTaskStatus === "open" ? "todo" : ""
            let rows_per_page = 10
            let response: any = await fetchTasks(
                rows_per_page,
                searchTask,
                final_status,
                "createdAt",
                "DESC"
            )
            if (response.error) {
                setError(response.error)
            } else {
                setTasks(response.tasks)
            }
        } catch (e: any) {
            setError(e.message || 'An error occurred while fetching tasks');
            console.error('Error fetching tasks:', e)
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateTask = async (updatedTask: Task) => {
        try {
            let final_status = updatedTask.status === "In Progress" ? "in_progress" : updatedTask.status === "closed" ? "done" : "todo"
            let updated_task = await updateTask(
                updatedTask.id,
                updatedTask.title,
                updatedTask.description,
                updatedTask.priority.toLowerCase(),
                final_status,
                new Date(updatedTask.deadline).toISOString(),
            )
            if (!updated_task.error) {
                await fetchTask()
            } else {
                console.error("Error updating task:", updated_task.error)
            }
            return updated_task
        } catch (error) {
            console.error("Error updating task:", error)
        }
    }
    
    useEffect(() => {
        fetchTask()
    }, [selectedTaskStatus, searchTask]);

    return (
        <section className="dashboard rounded-md py-3 bg-white h-full overflow-x-auto">
            <section className="flex justify-between items-end border-b-2 pb-1 px-3 mb-3">
                <h1 className="text-lg text-indigo-700 font-semibold">My Tasks</h1>
                <button
                    className="btn-primary !bg-indigo-700 border-indigo-700 hover:bg-indigo-600"
                    onClick={() => setOpenCreateTaskDialog(true)}
                >
                    <i className="pi pi-plus"></i> New Task
                </button>
            </section>

            <section className="flex gap-2 ml-[20px]">
                <SearchInput setSearchTerm={setSearchTask}
                />
                <Dropdown
                    value={selectedTaskStatus}
                    onChange={(e) => setSelectedTaskStatus(e.value)}
                    filter
                    showClear
                    options={appStore.taskStatus}
                    optionLabel="name"
                    optionValue="name"
                />
            </section>

            <section>
                <CreateTasks
                    openCreateTaskDialog={openCreateTaskDialog}
                    onClose={() => setOpenCreateTaskDialog(false)}
                    fetchTasks={fetchTask}
                />
            </section>

            <section>
                {loading ? <CustomLoader /> : <TaskBoard tasks={tasks} updateTask={handleUpdateTask} fetchTasks={fetchTask}/>}
            </section>
        </section>
    );
};

export default Tasks
