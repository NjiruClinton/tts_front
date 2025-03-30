'use client';
import '@/styles/globals.css';
import styles from '@/styles/Hero.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import {signup} from "@/utils/auth";

export default function Page() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const router = useRouter();

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password: string | any[]) => password.length >= 6;

    const validateForm = () => {
        if (!firstName || !lastName) {
            setErrorMessage('Please enter your full name.');
            return false;
        }
        if (!email || !validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            return false;
        }
        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 6 characters long.');
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return false;
        }
        if (!agreeToTerms) {
            setErrorMessage('Please agree to the Terms and Conditions.');
            return false;
        }
        return true;
    };

    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setIsLoading(true);
            setErrorMessage('');
            setSuccessMessage('');

            const response = await signup(firstName, lastName, email, password)
            if (response.error) {
                setErrorMessage(response.error);
                return;
            }
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user))
            sessionStorage.setItem('tempLoginCredentials', JSON.stringify({ email, password }))
            setSuccessMessage('User Created Successfully')
            setTimeout(() => router.push('/login?autoLogin=true'), 1000)

        } catch (error: any) {
            setErrorMessage(error.message.includes('already registered') ?
                'This email is already registered. Please login instead.' :
                'An error occurred during sign up')
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
        <section className="min-h-screen bg-white flex justify-center items-center py-12 sm:px-6 lg:px-8">
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-7xl">
                <section className="hidden lg:flex justify-center items-center">
                    <div className="hero-container">
                        <img src="/SignUpBG.png" alt="Hero Image" className={styles['hero-img']}
                        />
                    </div>
                </section>
                <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already have an account? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login</a>
                        </p>
                        <form className="space-y-6 mt-8" onSubmit={handleSignup}>
                            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-field" />
                            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field" />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
                            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
                            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" />
                            <div className="flex items-center">
                                <input type="checkbox" checked={agreeToTerms} onChange={() => setAgreeToTerms(!agreeToTerms)} className="h-4 w-4 text-indigo-600" />
                                <label className="ml-2 block text-sm text-gray-900">I agree to the <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Terms and Conditions</a></label>
                            </div>
                            {errorMessage && <p className="text-sm text-red-600 mt-2">{errorMessage}</p>}
                            {successMessage && <p className="text-sm text-green-600 mt-2">{successMessage}</p>}
                            <button type="submit" disabled={isLoading} className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500">
                                {isLoading ? 'Processing' : 'Sign Up'}
                            </button>
                        </form>
                    </div>
                </section>
            </section>
        </section>
        </>
    );
}
