import React from "react"
import '@/styles/global.css'

interface InputWrapperProps {
    label?: string
    required?: boolean
    showRequiredAsterik?: boolean
    children: React.ReactNode
}

const InputWrapper: React.FC<InputWrapperProps> = ({
                                                       label = "This is label",
                                                       required = false,
                                                       showRequiredAsterik = false,
                                                       children,
                                                   }) => {
    return (
        <div className="cic__input_wrap min-w-full">
            {label.length > 0 && required && (
                <p>
                    {label} <span className="text-red-500">*</span>
                </p>
            )}
            {label.length > 0 && !required && showRequiredAsterik && (
                <p>
                    {label} <span className="text-red-500">*</span>
                </p>
            )}
            {label.length > 0 && !required && !showRequiredAsterik && <p>{label}</p>}
            <div style={{ width: "100%" }}>{children}</div>
        </div>
    )
}

export default InputWrapper
