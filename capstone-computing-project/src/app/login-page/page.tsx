// This will be for login page

// they wanted team picture or lake picture on login page
"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import WaterskiImage from '../img/loginSkiIMG.svg';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [cwid, setCwid] = useState('');
    const [gradYear, setGradYear] = useState('Freshman');  // defaulted to freshman. should be removed later, it was just in the database so i copied it over
    const [memberType, setMemberType] = useState('Athlete');   // default as athlete
    const [major, setMajor] = useState('');
    const [isLogin, setIsLogin] = useState(true);  // toggle between login and sign-up
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isLogin ? 'http://localhost:4000/auth/login' : 'http://localhost:4000/auth/signup';

        // create the payload for the API call
        const payload = isLogin
            ? { email, password }  // for login
            : { email, password, fname, lname, cwid, gradYear, memberType, major };

        try {
            const response = await axios.post(endpoint, payload);
            if (isLogin) {
                localStorage.setItem('token', response.data.token);  // stores token if login is successful
                console.log('Login successful:', response.data.token);
                router.push('/protected-pages/protected-home-page'); // protected pages so we can remove certain elements from this page than on homepage, etc (login button can become either Photo they upload for the team to see or their Initials)
            } else {
                console.log('Signup successful:', response.data.message);
            }
        } catch (error) {
            console.error('Error:', error.response?.data?.message || error.message); // debugging
        }
    };

    return (
        <div className='login-page flex items-center justify-center min-h-screen bg-[#f4f4f9]'>

            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black'>
                <h2 className='text-2xl font-bold text-center mb-8 text-black'>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <div className='flex justify-between mb-4'>
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`w-1/2 mr-1 py-2 rounded-l-full font-bold ${isLogin ? 'bg-[#F96868] text-white' : 'bg-gray-200 text-[#F96868]'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`w-1/2 ml-1 py-2 rounded-r-full font-bold ${!isLogin ? 'bg-[#F96868] text-white' : 'bg-gray-200 text-[#F96868]'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Email Input */}
                    <input
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                        required
                    />

                    {/* Password Input */}
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                        required
                    />

                    {/* following only shows up in Sign Up option in login page */}
                    {!isLogin && (
                        <>
                            {/* First Name Input */}
                            <input
                                type='text'
                                placeholder='First Name'
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                required
                            />

                            {/* Last Name Input */}
                            <input
                                type='text'
                                placeholder='Last Name'
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                required
                            />

                            {/* CWID Input */}
                            <input
                                type='text'
                                placeholder='CWID'
                                value={cwid}
                                onChange={(e) => setCwid(e.target.value)}
                                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                required
                            />

                            {/* Graduation Year Input */}
                            <select
                                value={gradYear}
                                onChange={(e) => setGradYear(e.target.value)}
                                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                required
                            >
                                <option value='Freshman'>Freshman</option>
                                <option value='Sophomore'>Sophomore</option>
                                <option value='Junior'>Junior</option>
                                <option value='Senior'>Senior</option>
                            </select>

                            {/* Member Type Input */}
                            <select
                                value={memberType}
                                onChange={(e) => setMemberType(e.target.value)}
                                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                required
                            >
                                <option value='Athlete'>Athlete</option>
                                <option value='Officer'>Officer</option>
                            </select>

                            {/* Major Input */}
                            <input
                                type='text'
                                placeholder='Major'
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                required
                            />
                        </>
                    )}

                    {/* Submit Button */}
                    <button type='submit' className='w-full bg-[#F96868] text-white py-2 rounded-full font-bold'>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                {/* Forgot Password link can be deleted */}
                {isLogin && (
                    <p className='text-center mt-4'>
                        <a href='/forgot-password' className='text-[#49A097] hover:underline'>
                            Forgot Password?
                        </a>
                    </p>
                )}
            </div>
            {/* <div className='w-1/2 relative'>
                <Image 
                    src="/img/loginSkiIMG.jpeg"
                    alt="Login Waterski Image"
                    layout="fill"
                    objectFit="cover"
                />
            </div> */}

            <div className="flex justify-center mb-12">
                    <Image src={WaterskiImage} alt="Water ski image" width={600} height={600} />
                </div>
        </div>
    );
}
