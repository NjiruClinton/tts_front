"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {deleteUser, updateUser} from "@/utils/auth";


interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    createdAt: number;
    last_sign_in_at: string;
}

const Page = () => {

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const getInitials = (firstName: string, lastName: string) => {
        const firstInitial = firstName?.charAt(0) || ''
        const lastInitial = lastName?.charAt(0) || ''
        return `${firstInitial}${lastInitial}`.toUpperCase()
    }
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', options)
    }
    
    const formatDatetimestamp = (timestamp: number) => {
        const date = new Date(Number(timestamp))
        return date.toLocaleDateString('en-US', options)
    }
    
    useEffect(() => {
        const storedProfile = JSON.parse(sessionStorage.getItem('user') || '{}')
        if (storedProfile) {
            setUserProfile(storedProfile)
            setFirstName(storedProfile.firstName)
            setLastName(storedProfile.lastName)
        }
    }, [])

    const profile = {
        firstName: {
            value: userProfile ? userProfile.firstName : '',
            loading: { value: false }
        },
        lastName: {
            value: userProfile ? userProfile.lastName : '',
            loading: { value: false }
        },
        email: {
            value: userProfile ? userProfile.email : '',
            loading: { value: false }
        }
    }
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);
    const [firstName, setFirstName] = useState(profile.firstName.value)
    const [lastName, setLastName] = useState(profile.lastName.value)

    const handleEdit = () => setIsEditing(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await updateUser(firstName, lastName, profile.email.value)
        if (result.error) {
            setError(result.error)
            return
        } else {
            setUserProfile({
                firstName: firstName,
                lastName: lastName,
                email: profile.email.value,
                createdAt: userProfile ? userProfile.createdAt : 0,
                last_sign_in_at: userProfile ? userProfile.last_sign_in_at : ''
            })
            sessionStorage.setItem('user', JSON.stringify({
                ...userProfile,
                firstName: firstName,
                lastName: lastName
            }))
            setIsEditing(false)
        }
        
    }

    const deleteAccount = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await deleteUser()
            if (response.error) {
                setError(response.error)
                return
            }
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('user')
            setUserProfile(null)
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            <section className="bg-white flex flex-col md:flex-row justify-center md:justify-between items-center shadow-sm px-4 py-4">
                
                <div className="md:w-1/3">

                    <section className="h-[800px] bg-gray-50 rounded-lg shadow-lg p-6">
                        <section className="flex flex-col items-center text-center py-6 space-y-6">

                            <div className="relative">
                                <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
                          <span className="text-white font-semibold text-3xl">
                            {userProfile ? getInitials(userProfile.firstName, userProfile.lastName) : ''}
                          </span>
                                </div>
                                
                                <div
                                     className="absolute -right-2 -bottom-2 bg-green-500 rounded-full p-1 shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-3">

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {userProfile ? userProfile.firstName + ' ' + userProfile.lastName : ''}
                                    </h2>
                                </div>
                                
                                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    {userProfile ? userProfile.email : ''}
                                </p>




                                <div className="text-sm text-gray-600">
                                    <p>Member since: <span className="font-medium">
                                        {userProfile ? formatDatetimestamp(userProfile.createdAt) : ''}
                                    </span></p>
                                    <p>Last login: <span className="font-medium">
                                        {userProfile ? formatDate(userProfile.last_sign_in_at) : ''}
                                    </span></p>
                                </div>


                                <div className="flex items-center justify-center gap-4 text-sm mt-4">
                                    <span className="text-green-600 font-medium">
                                    Email Verified
                                </span>
                                <span className="text-gray-300">|</span>
                                <span
                                className="text-yellow-600">
                                Phone Unverified
                            </span>
                </div>
        </div>
</section>
</section>
</div>

                
                <div className="md:w-2/3">
                    <section className=" bg-white p-3 overflow-y-auto">
                        {/* Account Information Section */}
                        <section className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex justify-between items-center border-b pb-3">
                                <h2 className="text-3xl font-semibold text-gray-800">Account Information</h2>
                                {!isEditing && (
                                    <button
                                        onClick={handleEdit}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>

                            <div className="mt-6 space-y-4">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* First Name */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            value={firstName}
                                            disabled={!isEditing}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            placeholder="Enter your first name"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            value={lastName}
                                            disabled={!isEditing}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            placeholder="Enter your last name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            value={profile.email.value}
                                            disabled
                                            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    {isEditing && (
                                        <div className="flex gap-4">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                                            >
                                                {loading ? "Saving..." : "Save Changes"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </section>

                        {/* Delete Account Section */}
                        <section className="mt-12 bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-semibold text-red-600 border-b pb-3">Delete Account</h2>
                            <p className="mt-4 text-gray-700">Once you delete your account, there is no going back.
                                Please be certain.</p>
                            <button
                                onClick={() => setVisible(true)}
                                disabled={loading}
                                className="w-full py-3 mt-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                            >
                                {loading ? "Deleting..." : "Delete Account"}
                            </button>

                            {/* Confirmation Dialog */}
                            {visible && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                        <h3 className="text-xl font-semibold">Delete Account</h3>
                                        <p className="mt-4 text-gray-700">Are you sure you want to delete this
                                            account?</p>
                                        <div className="flex justify-end gap-2 mt-6">
                                            <button
                                                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                                                onClick={() => setVisible(false)}
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={deleteAccount}
                                                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>
                    </section>
                </div>
            </section>
        </div>
    )
}

export default Page;