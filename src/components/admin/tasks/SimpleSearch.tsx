import React, {useState} from "react";
import {Search} from "lucide-react";

type SearchInputProps = {
    placeholder?: string,
    width?: string,
    setSearchTerm?: (value: (((prevState: string) => string) | string)) => void
}

const SearchInput: React.FC<SearchInputProps> = ({
                                                     placeholder = "Search",
                                                     width = "300px",
                                                     setSearchTerm
                                                 }) => {
    const [value, setValue] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        if (setSearchTerm) {
            setSearchTerm(e.target.value)
        }
    }

    return (
        <div
            className="bg-white border border-[#CED6E3] rounded-lg flex items-center gap-x-1"
        >
            <Search className="text-[#8D98A9] text-base ml-3" size={16}/>
            <input
                className="bg-transparent w-full outline-none text-sm p-2 text-[#333333]"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default SearchInput