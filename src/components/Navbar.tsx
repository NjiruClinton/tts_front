// "use client"
// import Image from "next/image"
// import { useState } from 'react'
//
// export const Navbar = () => {
//     const links :string[] = ["Dashboard", "My tasks", "Teams", "Resources"]
//     const [isOpen, setIsOpen] = useState(false)
//     const [activeLink, setActiveLink] = useState("Dashboard")
//
//     return (
//         <>
//             <nav className="sticky bg-gray-500  top-0 z-50 shadow-md flex flex-row justify-between w-full p-4">
//                 <div className="flex flex-row justify-between items-center w-3/4 mx-auto space-x-5">
//                     <Image
//                         aria-hidden
//                         src="/elementary.svg"
//                         alt="Logo"
//                         width={30}
//                         height={30}
//                     />
//                     <ul className="hidden md:flex flex-row space-x-5 font-light text-xl justify-between">
//                         {links.map((link) => (
//                             <li key={link}>
//                                 <a
//                                     href="#"
//                                     className={`hover:text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-md  ${
//                                         activeLink === link ? "bg-gray-50 text-foreground font-bold" : ""
//                                     }`}
//                                     onClick={() => setActiveLink(link)}
//                                 >
//                                     {link}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//
//                 <button className="md:hidden text-background" onClick={() => setIsOpen(!isOpen)}>
//                     {isOpen ?
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
//                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//                              className="lucide lucide-x text-foreground">
//                             <path d="M18 6 6 18"/>
//                             <path d="m6 6 12 12"/>
//                         </svg> :
//                         <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"
//                              xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                                   d="M4 6h16M4 12h16M4 18h16"></path>
//                         </svg>}
//                 </button>
//                 {isOpen && (
//                     <div
//                         className="fixed top-16 bg-gray-500 left-0 w-full flex flex-col items-center space-y-4 py-6 md:hidden border-b">
//                         <ul className="font-normal">
//                             {links.map((link) => (
//                                 <li key={link} className="mb-3">
//                                     <a
//                                         href="#"
//                                         className={`hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md ${
//                                             activeLink === link ? "bg-gray-50 text-foreground font-bold" : ""
//                                         }`}
//                                         onClick={() => {
//                                             setActiveLink(link)
//                                             setIsOpen(false)
//                                         }}
//                                     >
//                                         {link}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </nav>
//         </>
//     )
// }

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // const checkUser = async () => {
        //     const { data: { user } } = await supabase.auth.getUser();
        //     setIsLoggedIn(!!user);
        // };
        // checkUser();
        const token = sessionStorage.getItem('token')
        const user = sessionStorage.getItem('user')
        
    }, []);

    // const handleLogout = async () => {
    //     const { error } = await supabase.auth.signOut();
    //     if (!error) {
    //         router.push('/');
    //         setIsOpen(false);
    //         setIsLoggedIn(false);
    //     } else {
    //         console.error('Error during logout:', error);
    //     }
    // };

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Overview', path: '/' },
        { name: 'FAQ', path: '/faq' },
    ];

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-18">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <img alt="logo" src="/BORCELLE STUDIO.png" className="w-[90px] h-auto" />
                        </Link>
                    </div>

                    <div className="hidden md:flex flex-1 justify-center space-x-4">
                        {navLinks.map((link) => (
                            <Link key={link.path} href={link.path} className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex space-x-4">
                        {!isLoggedIn ? (
                            <>
                                <Link href="/login" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link href="/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <button className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                Logout
                            </button>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            {isOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full" onClick={toggleMenu}>
                    <div className="bg-white w-full max-w-sm p-6 overflow-y-auto h-full transition-all duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
                            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <nav className="mb-8">
                            {navLinks.map((link) => (
                                <Link key={link.path} href={link.path} onClick={toggleMenu} className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out">
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="border-t border-gray-200 pt-6">
                            {!isLoggedIn ? (
                                <>
                                    <Link href="/login" onClick={toggleMenu} className="block w-full text-center py-2 px-4 mb-3 text-gray-800 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out">
                                        Login
                                    </Link>
                                    <Link href="/signup" onClick={toggleMenu} className="block w-full text-center py-2 px-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md transition duration-150 ease-in-out">
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <button className="block w-full text-center py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out">
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar