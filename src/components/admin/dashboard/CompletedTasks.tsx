"use client";

import { useEffect, useState, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import '@/styles/global.css';
import {fetchTasks} from "@/utils/tasks";

export default function CompletedTasks() {
    const [tasks, setTasks] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const allTasks = async () => {
        let rows_per_page = 5
        fetchTasks(
            rows_per_page,
            searchQuery,
            "done",
            "createdAt",
            "DESC"
        ).then(r => {
            setTasks(r.tasks)
        })
    }
    useEffect(() => {
        allTasks()
    }, [searchQuery])
    return (
        <section className="border rounded-md p-3 h-[450px] completed-tasks">
            {/* Task Hero */}
            <div className="d-card-header">
                <h1 className="d-card-title !text-indigo-700">
                    Completed Tasks ({tasks.length})
                </h1>
            </div>

            {/* Tasks Table */}
            <DataTable
                value={tasks}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 20, 50]}
                scrollable
                scrollHeight="310px"
                style={{ minWidth: "20rem" }}
                emptyMessage={<span>No completed tasks available</span>} // Handling empty state
            >
                {/* Task Name */}
                <Column field="title" header="Task Name" />

                {/* Task Description */}
                <Column
                    field="description"
                    header="Task Description"
                    body={(rowData) => <span dangerouslySetInnerHTML={{ __html: rowData.description }} />}
                />

                {/* Deadline */}
                <Column field="deadline" header="Deadline" />

                {/* Priority */}
                <Column field="priority" header="Priority" />
            </DataTable>
        </section>
    );
}
