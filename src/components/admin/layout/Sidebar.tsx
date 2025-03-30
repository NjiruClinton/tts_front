"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("user")
            sessionStorage.removeItem("tempLoginCredentials")

            router.push("/")
        } catch (error) {
            console.error("Error during logout:", error)
            alert("Failed to log out. Please try again.")
        }
    };

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <div>
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-0 right-0 m-4 z-20 flex-shrink-0">
                <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
                    {isOpen ? (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    )}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`bg-white text-black w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          fixed lg:static z-10`}
            >
                <div className="p-4">
                    <Link href="/admin" className="flex items-center space-x-2">
                        <div className="flex-shrink-0">
                                <img alt="logo" src="/BORCELLE STUDIO.png" className="w-[90px] h-auto"
                                />
                        </div>
                        <span className="text-2xl font-bold">Task Panel</span>
                    </Link>
                </div>

                <nav className="flex-1 px-2 py-4 space-y-2">
                    <Link href="/admin" className="flex items-center space-x-2 px-4 py-3 rounded transition duration-200 hover:bg-gray-100 hover:text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="#4CAF50">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/admin/tasks"
                          className="flex items-center space-x-2 px-4 py-3 rounded transition duration-200 hover:bg-gray-100 hover:text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="#FF5733">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        <span>Tasks</span>
                    </Link>
                    <Link href="/admin/calendar"
                          className="flex items-center space-x-2 px-4 py-3 rounded transition duration-200 hover:bg-gray-100 hover:text-indigo-400">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                                fill="#E3F2FD"/>
                            <path
                                d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                                stroke="#1976D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 2V6" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M8 2V6" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M3 10H21" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <rect x="7" y="13" width="2" height="2" rx="0.5" fill="#1976D2"/>
                            <rect x="11" y="13" width="2" height="2" rx="0.5" fill="#1976D2"/>
                            <rect x="15" y="13" width="2" height="2" rx="0.5" fill="#1976D2"/>
                            <rect x="7" y="17" width="2" height="2" rx="0.5" fill="#1976D2"/>
                            <rect x="11" y="17" width="2" height="2" rx="0.5" fill="#1976D2"/>
                            <rect x="15" y="17" width="2" height="2" rx="0.5" fill="#1976D2"/>
                        </svg>
                        <span className="ml-2">Calendar</span>
                    </Link>
                    <Link href="/admin/settings"
                          className="flex items-center space-x-2 px-4 py-3 rounded transition duration-200 hover:bg-gray-100 hover:text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="#FFC300">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span>Settings</span>
                    </Link>
                </nav>
                
                <div className="p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white text-indigo-600 rounded transition duration-200 border-indigo-600 border"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            
            {isOpen && <div onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"></div>}
        </div>
    )
}

export default Sidebar