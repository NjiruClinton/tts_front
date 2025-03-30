import { PrimeReactProvider } from 'primereact/api'
import  AdminLayout  from '@/components/admin/layout'
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import {ReactNode} from "react"

interface AdminRootLayoutProps {
    children: ReactNode
}

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {

    return (
        <PrimeReactProvider>
            <AdminLayout>
                {children}
            </AdminLayout>
        </PrimeReactProvider>
    )
}