'use client';

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Navbar from "@/components/Navbar"
import styles from '@/styles/Hero.module.css'
import {login} from "@/utils/auth"
import {useUser} from "@/context/UserContext"

function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (searchParams.get('autoLogin') === 'true') {
            const credentials = sessionStorage.getItem('tempLoginCredentials');
            if (credentials) {
                const { email: storedEmail, password: storedPassword } = JSON.parse(credentials);
                setEmail(storedEmail);
                setPassword(storedPassword);
            }
            router.replace('/login');
        }
    }, [searchParams, router]);

    useEffect(() => {
        if (email && password && searchParams.get('autoLogin') === 'true') {
            handleLogin({ preventDefault: () => {} } as any).then(() => {
                sessionStorage.removeItem('tempLoginCredentials')
            })
        }
    }, [email, password])
    const { setUser } = useUser()
    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setErrorMessage('');
            
            const response = await login(email, password)
            if (response.error) {
                handleLoginError(response.error)
                return
            }
            sessionStorage.setItem('token', response.token)
            let finalUser = {
                ...response.user,
                last_sign_in_at: new Date().toISOString()
            }
            sessionStorage.setItem('user', JSON.stringify(finalUser))
            
            
            setUser(response.user)
            router.push('/admin')
        } catch (error: any) {
            setErrorMessage('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginError = (error: { message: string | string[]; }) => {
        if (error.message.includes('Invalid login credentials')) {
            setErrorMessage('Incorrect email or password. Please try again.');
        } else if (error.message.includes('Email not confirmed')) {
            setErrorMessage('Please verify your email before logging in.');
        } else if (error.message.includes('Too many requests')) {
            setErrorMessage('Too many login attempts. Please try again later.');
        } else {
            setErrorMessage('An error occurred during login.');
        }
    };

    return (
        <>
            <Navbar />
        <section className="min-h-screen bg-white flex justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-7xl">
                <div className="hidden lg:flex justify-center items-center">
                    <Image src="/LoginBG.png" alt="Hero Image" className={styles['hero-img']}
                        width={400} height={400} />
                </div>
                <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-10 px-6 shadow-lg rounded-lg sm:px-10">
                        <h2 className="text-4xl font-extrabold text-gray-900 text-center">Welcome Back</h2>
                        <p className="text-sm text-gray-600 text-center">Please log in to your account</p>
                        {errorMessage && (
                            <div className="mt-4 bg-red-50 p-4 rounded-md">
                                <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                            </div>
                        )}
                        <form className="space-y-6 mt-10" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg shadow-sm bg-background"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm bg-background"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full py-2 bg-indigo-600 text-white rounded-lg">
                                {isLoading ? 'Logging in...' : 'Log in'}
                            </button>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account? <a href="/signup" className="text-indigo-600">Sign up</a>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </section>
        </>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
        </Suspense>
    );
}