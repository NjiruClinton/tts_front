import React from "react";
import { CheckCircle } from "lucide-react";

type NoTaskCardProps = {
    selectedTaskStatus?: string;
};

const NoTaskCard: React.FC<NoTaskCardProps> = ({ selectedTaskStatus }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[760px] rounded-lg shadow-inner">
            {/* Task SVG Start */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-checklist"
                width="88"
                height="88"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#183fe2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
                <path d="M14 19l2 2l4 -4" />
                <path d="M9 8h4" />
                <path d="M9 12h2" />
            </svg>
            {/* Task SVG End */}
            {selectedTaskStatus === "open" && (
                <p className="text-xl font-semibold text-gray-600">No Open Tasks</p>
            )}
            {selectedTaskStatus === "submitted-for-approval" && (
                <p className="text-xl font-semibold text-gray-600">
                    No Tasks Submitted for Approval
                </p>
            )}
            {selectedTaskStatus === "closed" && (
                <p className="text-xl font-semibold text-gray-600">No Closed Tasks</p>
            )}
            {!["open", "submitted-for-approval", "closed"].includes(
                selectedTaskStatus || ""
            ) && <p className="text-gray-500 mt-2">Task Not Found</p>}
        </div>
    )
}

export default NoTaskCard