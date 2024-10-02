"use client";
//9e1b32 9E1B32
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import WaterskiImage from '../img/loginSkiIMG.svg';
import SkiBamaLogo from '../img/skibamalogo.svg';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [cwid, setCwid] = useState('');
    const [gradYear, setGradYear] = useState('Freshman');
    const [memberType, setMemberType] = useState('Athlete');
    const [major, setMajor] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isLogin ? 'http://localhost:4000/auth/login' : 'http://localhost:4000/auth/signup';

        const payload = isLogin
            ? { email, password }
            : { email, password, fname, lname, cwid, gradYear, memberType, major };

        try {
            const response = await axios.post(endpoint, payload);
            if (isLogin) {
                localStorage.setItem('token', response.data.token);
                router.push('/protected-pages/protected-home-page');
            } else {
                setIsLogin(true);
            }
        } catch (error) {
            console.error('Error:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className='login-page flex items-center justify-center min-h-screen bg-[#ffffff]'> {/* bg-[#f4f4f9] */}
            <div className="flex flex-row w-full max-w-6xl">
                <div className="flex flex-col justify-center items-center w-1/2 pr-8">
                    {/* Ski Bama Logo */}
                    <div className="mb-8">
                        <Image src={SkiBamaLogo} alt="Ski Bama Logo" width={300} height={300} />
                    </div>

                    {/* Login Form */}
                    <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black mt-[-40px]'>
                        <div className='flex justify-between mb-4'>
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`w-1/2 mr-1 py-2 rounded-l-full font-bold ${isLogin ? 'bg-[#9E1B32] text-white' : 'bg-gray-200 text-[#9E1B32]'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`w-1/2 ml-1 py-2 rounded-r-full font-bold ${!isLogin ? 'bg-[#9E1B32] text-white' : 'bg-gray-200 text-[#9E1B32]'}`}
                            >
                                Sign Up
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <input
                                type='email'
                                placeholder='Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                required
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                required
                            />

                            {!isLogin && (
                                <>
                                    <input
                                        type='text'
                                        placeholder='First Name'
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)}
                                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                        required
                                    />
                                    <input
                                        type='text'
                                        placeholder='Last Name'
                                        value={lname}
                                        onChange={(e) => setLname(e.target.value)}
                                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                        required
                                    />
                                    <input
                                        type='text'
                                        placeholder='CWID'
                                        value={cwid}
                                        onChange={(e) => setCwid(e.target.value)}
                                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                        required
                                    />
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
                                    <select
                                        value={memberType}
                                        onChange={(e) => setMemberType(e.target.value)}
                                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                        required
                                    >
                                        <option value='Athlete'>Athlete</option>
                                        <option value='Officer'>Officer</option>
                                    </select>
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

                            <button type='submit' className='w-full bg-[white] text-[black] py-2 rounded-full font-bold'>
                                {isLogin ? 'Sign In' : 'Sign Up'}
                            </button>
                        </form>

                        {isLogin && (
                            <p className='text-center mt-4'>
                                <a href='/forgot-password' className='text-[black] hover:underline font-bold'>
                                    Forgot Password?
                                </a>
                            </p>
                        )}
                    </div>
                </div>

                {/* Right side for the team/lake picture */}
                <div className="w-1/2 flex justify-center items-center">
                    <Image src={WaterskiImage} alt="Water ski image" width={600} height={600} />
                </div>
            </div>
        </div>
    );
}
