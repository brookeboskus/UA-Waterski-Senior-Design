"use client";

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
    const [phone, setPhone] = useState('');
    const [gradYear, setGradYear] = useState('Freshman');
    const [major, setMajor] = useState('');
    const [PfpImage, setProfilePicture] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) {
                alert("File size exceeds 4 MB limit. Please choose a smaller image.");
                return;
            }

            const img = new window.Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                if (img.width > 1536 || img.height > 1536) {
                    alert("Image dimensions exceed 1536 x 1536 pixels. Please choose a smaller image.");
                } else {
                    setProfilePicture(file); 
                }
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isLogin ? 'http://localhost:4000/auth/login' : 'http://localhost:4000/auth/signup';

        if (isLogin) {
            const payload = {
                email,
                password,
            };

            try {
                const response = await axios.post(endpoint, payload);
                localStorage.setItem('token', response.data.token);
                router.push('/protected-pages/protected-home-page');
            } catch (error) {
                console.error('Error:', error.response?.data?.message || error.message);
                document.getElementById('errorBox')?.setAttribute("style", "display: block;");
                document.getElementById('errorText').innerText = "Invalid email or password. Please try again.";
            }
        } else {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('fname', fname);
            formData.append('lname', lname);
            formData.append('cwid', cwid);
            formData.append('phone', phone);
            formData.append('gradYear', gradYear);
            formData.append('major', major);

            if (PfpImage) {
                formData.append('pfpimage', PfpImage);
            }

            try {
                const response = await axios.post(endpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setIsLogin(true);
            } catch (error) {
                console.error('Error:', error.response?.data?.message || error.message);
            }
        }
    };

    return (
        <div className='login-page flex items-center justify-center min-h-screen bg-[#ffffff]'>
            <div className="flex flex-row w-full max-w-6xl">
                <div className="flex flex-col justify-center items-center w-1/2 pr-8">
                    <div className="mb-8">
                        <Image src={SkiBamaLogo} alt="Ski Bama Logo" width={300} height={300} />
                    </div>

                    <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black mt-[-40px]'>

                        <div className='bg-[#ffaaaa] rounded-lg p-2 mt-2 mb-2 hidden' id="errorBox">
                            <p className='font-bold'>Error:</p><p id="errorText">DEFAULT ERROR TEXT</p>
                        </div>

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
                                pattern=".+@+(.+\.)?ua\.edu"
                                title="Email must be a valid University of Alabama address (i.e. ending in ua.edu)"
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
                                    <input
                                        type='text'
                                        placeholder='Phone Number'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
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
                                    <input
                                        type='text'
                                        placeholder='Major'
                                        value={major}
                                        onChange={(e) => setMajor(e.target.value)}
                                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                        required
                                    />
                                    <div className='flex items-center mb-4'>
                                        <label className='w-full cursor-pointer border-2 border-[#49A097] rounded-lg p-2 flex justify-between items-center'>
                                            <span className='text-gray-700'>Upload Profile Picture</span>
                                            <input
                                                type='file'
                                                accept='.png, .jpg, .jpeg, .webp'
                                                //onChange={(e) => setProfilePicture(e.target.files[0])}
                                                onChange= {handleFileChange} 
                                                className='hidden'
                                            />
                                        </label>
                                        {PfpImage && <span className='ml-2 text-gray-600'>{PfpImage.name}</span>}
                                    </div>
                                    <p className='text-xs text-gray-500'>Accepted file types: PNG, JPG, JPEG, WEBP. <br></br>Max size: 4 MB. Max dimensions: 1536 x 1536 pixels.</p>
                                </>
                            )}

                            <button type='submit' className='w-full bg-[white] text-[black] py-2 rounded-full font-bold hover:text-[#9E1B32]'>
                                {isLogin ? 'Sign In' : 'Sign Up'}
                            </button>
                        </form>

                        {isLogin && (
                            <p className='text-center mt-4 text-xs'>
                                <a href='/forgot-password' className='text-[black] hover:text-[#9E1B32] font-bold'>
                                    Forgot Password?
                                </a>
                            </p>
                        )}
                    </div>
                </div>

                <div className="w-1/2 flex justify-center items-center">
                    <Image src={WaterskiImage} alt="Water ski image" width={600} height={600} />
                </div>
            </div>
        </div>
    );
}
