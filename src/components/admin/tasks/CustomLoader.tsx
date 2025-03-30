import React from "react";
import '../../../styles/global.css'

const LoadingPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="loader" />
        </div>
    )
}

export default LoadingPage