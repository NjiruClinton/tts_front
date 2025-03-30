'use client'

import {usePathname, useRouter} from 'next/navigation'
import Header from './Header'
import Sidebar from './Sidebar'
import {ReactNode, useEffect} from "react";
import {verifyToken} from "@/utils/auth";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const pathname = usePathname()
    const isLoginPage = pathname === '/admin/login'
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const token: string | null = sessionStorage.getItem('token')
            let isTokenValid = await verifyToken(token)
            if (!isTokenValid) {
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('user')
                sessionStorage.removeItem('tempLoginCredentials')
                router.push('/login')
            }
        })();
    }, [])
    // Show loading spinner while checking authentication
    // if (status === 'loading') {
    //     return (
    //         <div className="flex items-center justify-center h-screen">
    //             <Loader />
    //         </div>
    //     )
    // }

    // If not authenticated and not on login page, show login form
    // if (!session && !isLoginPage) {
    //     return (
    //         <div className="min-h-screen bg-gray-50">
    //             {/*<LoginForm />*/}
    //         </div>
    //     )
    // }

    // If on login page and authenticated, the middleware will handle redirect to /admin
    if (isLoginPage) {
        // return <LoginForm />
    }

    // Show admin dashboard layout for authenticated users
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 lg:ml-0">
                <Header />
                <main className="p-4 bg-gray-100 h-[95vh] max-h-[95vh] overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout