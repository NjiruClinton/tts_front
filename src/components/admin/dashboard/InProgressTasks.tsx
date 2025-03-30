"use client";

import { useEffect, useState, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import '@/styles/global.css';
import {fetchTasks} from "@/utils/tasks";

// Function to format AssignedTo Name (Replace with actual function)
const formatAssignedToName = (name: string) => `@${name.split(" ")[0].toLowerCase()}`;

export default function InProgressTasks() {
    const [tasks, setTasks] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const allTasks = async () => {
        let rows_per_page = 5
        fetchTasks(
            rows_per_page,
            searchQuery,
            "in_progress",
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
        <section className="border rounded-md p-3 h-[450px] in-progress-tasks">
            {/* Task Hero */}
            <div className="d-card-header">
                <h1 className="d-card-title !text-indigo-700">
                    In-Progress Tasks ({tasks.length})
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
                emptyMessage={<span>No in-progress tasks available</span>} // Replacing empty slot
            >
                {/* Assigned To */}
                {/*<Column*/}
                {/*    field="assignedTo"*/}
                {/*    header="Assigned To"*/}
                {/*    body={(rowData) => <span>{formatAssignedToName(rowData.assignedTo)}</span>}*/}
                {/*/>*/}

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
