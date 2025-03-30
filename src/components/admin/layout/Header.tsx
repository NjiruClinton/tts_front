"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {useUser} from "@/context/UserContext";

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
}

export default function Header() {

    const getInitials = (email: string) => {
        if (!email) return ""
        return email.charAt(0).toUpperCase()
    }
    
        const user = useUser().user
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
            // if (user) {
                const storedProfile = JSON.parse(sessionStorage.getItem('user') || '{}')
        if (storedProfile) {
                setUserProfile(storedProfile)
            }
        }, [])

    return (
        <header className="bg-white shadow-sm flex items-center justify-between px-4 h-[65px]">
            <div>
                {userProfile ? (
                    <p className="text-sm font-medium text-gray-700">
                        Welcome back,{" "}
                        <span className="text-indigo-600 font-bold">
              {userProfile?.firstName}{" "}
                            {userProfile?.lastName}
            </span>
                        !
                    </p>
                ) : (
                    <p className="text-sm font-medium text-gray-500 italic">
                        No user logged in.
                    </p>
                )}
            </div>

            {userProfile && (
                <div className="flex justify-end">
                    <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-medium">
              {getInitials(userProfile?.email)}
            </span>
                    </div>
                </div>
            )}
        </header>
    );
}