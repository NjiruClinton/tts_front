"use client";

import {useEffect, useState, useMemo} from "react";
import {useRouter} from "next/navigation";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import '@/styles/globals.css';
import CreateTaskDialog from "@/components/admin/dashboard/CreateTasks";
import {fetchTasks} from "@/utils/tasks";


export default function AllTasks() {
    const [openCreateTaskDialog, setOpenCreateTaskDialog] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [loading, setLoading] = useState(true)

    const [tasks, setTasks] = useState([])
    const allTasks = async () => {
        setLoading(true)
        let rows_per_page = 5
        fetchTasks(
            rows_per_page,
            searchQuery,
            statusFilter,
            "createdAt",
            "DESC"
        ).then(r => {
            setTasks(r.tasks)
            setLoading(false)
        })
    }

    useEffect(() => {
        allTasks()
        setLoading(false)
    }, [searchQuery, statusFilter])

    const handleCreateTask = async () => {
        setOpenCreateTaskDialog(false);
        // await allTasks()
    };

    return (
        <section className="border rounded-md p-3 h-[450px] all-tasks">
            {/* Task Hero Section */}
            <div className="d-card-header flex justify-between items-center">
                <h1 className="d-card-title !text-indigo-700">
                    All Tasks ({tasks?.length})
                </h1>
                <button
                    className="btn-primary !bg-indigo-700 border-indigo-700 hover:bg-indigo-600"
                    onClick={() => setOpenCreateTaskDialog(true)}
                >
                    <i className="pi pi-plus"></i> Create Task
                </button>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading">Loading tasks...</span>
                </div>
            ) : (
                <DataTable
                    value={tasks}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    scrollable
                    scrollHeight="310px"
                    style={{minWidth: "20rem"}}
                    emptyMessage={<span>No tasks available</span>}
                >
                    {/* Task Name */}
                    <Column field="title" header="Task Name"/>

                    {/* Task Description */}
                    <Column
                        field="description"
                        header="Task Description"
                        body={(rowData) => <span dangerouslySetInnerHTML={{__html: rowData.description}}/>}
                    />

                    {/* Deadline */}
                    <Column field="deadline" header="Deadline"/>

                    {/* Priority */}
                    <Column field="priority" header="Priority"/>
                </DataTable>
            )}

            {/* Create Task Dialog */}
            {openCreateTaskDialog && (
                <section>
                    <CreateTaskDialog openCreateTaskDialog={
                        openCreateTaskDialog
                    } onClose={
                        () => setOpenCreateTaskDialog(false)
                    } fetchTasks={allTasks} />
                </section>
            )}
        </section>
    );
}
