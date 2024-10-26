"use client";

import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import WaterskiImage from '../img/loginSkiIMG.svg';
import SkiBamaLogo from '../img/skibamalogo.svg';

// list of majors offered by UA, think we should take out minors for now. our database only holds one major, but ppl can have multiple as well.
const majors = [
    { value: 'Accounting, BS', label: 'Accounting, BS' },
    { value: 'Accounting, MMA', label: 'Accounting, MMA' },
    { value: 'Accounting, Ph.D.', label: 'Accounting, Ph.D.' },
    { value: 'Addiction and Recovery, BS', label: 'Addiction and Recovery, BS' },
    { value: 'Advertising and Public Relations, MA', label: 'Advertising and Public Relations, MA' },
    { value: 'Advertising, BA', label: 'Advertising, BA' },
    { value: 'Aerospace Engineering and Mechanics, MS', label: 'Aerospace Engineering and Mechanics, MS' },
    { value: 'Aerospace Engineering and Mechanics, Ph.D.', label: 'Aerospace Engineering and Mechanics, Ph.D.' },
    { value: 'Aerospace Engineering, BS', label: 'Aerospace Engineering, BS' },
    { value: 'African American Studies, BA', label: 'African American Studies, BA' },
    { value: 'American Studies, BA', label: 'American Studies, BA' },
    { value: 'American Studies, MA', label: 'American Studies, MA' },
    { value: 'Anthropology, BA', label: 'Anthropology, BA' },
    { value: 'Anthropology, MA', label: 'Anthropology, MA' },
    { value: 'Apparel and Textiles, BS', label: 'Apparel and Textiles, BS' },
    { value: 'Applied Liberal Arts and Sciences, BA', label: 'Applied Liberal Arts and Sciences, BA' },
    { value: 'Applied Mathematics, PhD', label: 'Applied Mathematics, PhD' },
    { value: 'Applied Statistics, MS', label: 'Applied Statistics, MS' },
    { value: 'Applied Statistics, Ph.D.', label: 'Applied Statistics, Ph.D.' },
    { value: 'Architectural Engineering, BS', label: 'Architectural Engineering, BS' },
    { value: 'Art History, BA', label: 'Art History, BA' },
    { value: 'Art History, MA', label: 'Art History, MA' },
    { value: 'Athletic Training, MS', label: 'Athletic Training, MS' },
    { value: 'Biology, BS', label: 'Biology, BS' },
    { value: 'Biological Sciences, MA', label: 'Biological Sciences, MA' },
    { value: 'Biology, MS', label: 'Biology, MS' },
    { value: 'Biology, Ph.D.', label: 'Biology, Ph.D.' },
    { value: 'Business Administration, MBA', label: 'Business Administration, MBA' },
    { value: 'Business Analytics, MSBA', label: 'Business Analytics, MSBA' },
    { value: 'Business Cyber Security, BS', label: 'Business Cyber Security, BS' },
    { value: 'Chemical Engineering, BSChE', label: 'Chemical Engineering, BSChE' },
    { value: 'Chemical Engineering, MS', label: 'Chemical Engineering, MS' },
    { value: 'Chemical Engineering, Ph.D.', label: 'Chemical Engineering, Ph.D.' },
    { value: 'Chemistry, BCH', label: 'Chemistry, BCH' },
    { value: 'Chemistry, BS', label: 'Chemistry, BS' },
    { value: 'Chemistry, MSC', label: 'Chemistry, MSC' },
    { value: 'Chemistry, Ph.D.', label: 'Chemistry, Ph.D.' },
    { value: 'Civil Engineering, BS', label: 'Civil Engineering, BS' },
    { value: 'Civil Engineering, MS', label: 'Civil Engineering, MS' },
    { value: 'Civil Engineering, Ph.D.', label: 'Civil Engineering, Ph.D.' },
    { value: 'Communication & Information Sciences (CIS), PhD', label: 'Communication & Information Sciences (CIS), PhD' },
    { value: 'Communication Studies, BAC', label: 'Communication Studies, BAC' },
    { value: 'Communication Studies, MA', label: 'Communication Studies, MA' },
    { value: 'Computer Engineering, BS', label: 'Computer Engineering, BS' },
    { value: 'Computer Science, BS', label: 'Computer Science, BS' },
    { value: 'Computer Science, MS', label: 'Computer Science, MS' },
    { value: 'Computer Science, Ph.D.', label: 'Computer Science, Ph.D.' },
    { value: 'Cyber Security, BS', label: 'Cyber Security, BS' },
    { value: 'Dance, BA', label: 'Dance, BA' },
    { value: 'Dance, MFA', label: 'Dance, MFA' },
    { value: 'Data Science, BS', label: 'Data Science, BS' },
    { value: 'Doctor of Nursing Practice (DNP)', label: 'Doctor of Nursing Practice (DNP)' },
    { value: 'Early Childhood Education, BS', label: 'Early Childhood Education, BS' },
    { value: 'Economics, BA', label: 'Economics, BA' },
    { value: 'Economics, BS', label: 'Economics, BS' },
    { value: 'Educational Leadership, Ed.D.', label: 'Educational Leadership, Ed.D.' },
    { value: 'Electrical Engineering, BS', label: 'Electrical Engineering, BS' },
    { value: 'Electrical Engineering, MS', label: 'Electrical Engineering, MS' },
    { value: 'Electrical Engineering, Ph.D.', label: 'Electrical Engineering, Ph.D.' },
    { value: 'Elementary Education, BSE', label: 'Elementary Education, BSE' },
    { value: 'English, BA', label: 'English, BA' },
    { value: 'English, MA', label: 'English, MA' },
    { value: 'Environmental Engineering, BS', label: 'Environmental Engineering, BS' },
    { value: 'Environmental Science, BS', label: 'Environmental Science, BS' },
    { value: 'Finance, BS', label: 'Finance, BS' },
    { value: 'Finance, MS', label: 'Finance, MS' },
    { value: 'Finance, Ph.D.', label: 'Finance, Ph.D.' },
    { value: 'Food and Nutrition, BS', label: 'Food and Nutrition, BS' },
    { value: 'Foreign Languages and Literature, BA', label: 'Foreign Languages and Literature, BA' },
    { value: 'General Business, BS', label: 'General Business, BS' },
    { value: 'Geography, BA', label: 'Geography, BA' },
    { value: 'Geography, BS', label: 'Geography, BS' },
    { value: 'Geology, BA', label: 'Geology, BA' },
    { value: 'Geology, BS', label: 'Geology, BS' },
    { value: 'History, BA', label: 'History, BA' },
    { value: 'History, MA', label: 'History, MA' },
    { value: 'Hospitality Management, BS', label: 'Hospitality Management, BS' },
    { value: 'Human Development and Family Studies, BS', label: 'Human Development and Family Studies, BS' },
    { value: 'Human Nutrition, MS', label: 'Human Nutrition, MS' },
    { value: 'Kinesiology, BS', label: 'Kinesiology, BS' },
    { value: 'Marine Science, BS', label: 'Marine Science, BS' },
    { value: 'Marketing, BS', label: 'Marketing, BS' },
    { value: 'Mathematics, BS', label: 'Mathematics, BS' },
    { value: 'Mechanical Engineering, BS', label: 'Mechanical Engineering, BS' },
    { value: 'Nursing, BSN', label: 'Nursing, BSN' },
    { value: 'Philosophy, BA', label: 'Philosophy, BA' },
    { value: 'Physics, BS', label: 'Physics, BS' },
    { value: 'Political Science, BA', label: 'Political Science, BA' },
    { value: 'Psychology, BA', label: 'Psychology, BA' },
    { value: 'Public Health, BS', label: 'Public Health, BS' },
    { value: 'Social Work, BSW', label: 'Social Work, BSW' },
    { value: 'Sociology, BA', label: 'Sociology, BA' },
    { value: 'Spanish, BA', label: 'Spanish, BA' },
    { value: 'Theatre, BA', label: 'Theatre, BA' },
    { value: 'Women\'s Studies, BA', label: 'Women\'s Studies, BA' },
];

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [cwid, setCwid] = useState('');
    const [phone, setPhone] = useState('');
    const [gradYear, setGradYear] = useState('Freshman');
    const [selectedMajor, setSelectedMajor] = useState(null);
    // const [major, setMajor] = useState('');
    const [PfpImage, setProfilePicture] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    // Set page title
    useEffect(() => {
        document.title = 'UA Waterski - Login/Sign Up';
    }, []);

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
            formData.append('major', selectedMajor.value);

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
            <div className="flex flex-row w-full h-full"> {/* Full height for both sides */}
                <div className="flex flex-col justify-center items-center w-1/2 pr-0">
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
                                    {/* <input
                                        type='text'
                                        placeholder='Major'
                                        value={major}
                                        onChange={(e) => setMajor(e.target.value)}
                                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                                        required
                                    /> */}
                                    <Select
                                        placeholder="Select your Major"
                                        value={selectedMajor}
                                        onChange={setSelectedMajor}
                                        options={majors}
                                        className="w-full"
                                        required
                                    />
                                    <div className='flex items-center mb-4'>
                                        <label className='w-full cursor-pointer border-2 border-[#49A097] rounded-lg p-2 flex justify-between items-center'>
                                            <span className='text-gray-700'>Upload Profile Picture</span>
                                            <input
                                                type='file'
                                                accept='.png, .jpg, .jpeg, .webp'
                                                //onChange={(e) => setProfilePicture(e.target.files[0])}
                                                onChange={handleFileChange}
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

               {/* Right side containing the image */}
        <div className=" rounded-tl-[55px] rounded-bl-[55px]  "> {/* Right side */}
            <Image 
                src={WaterskiImage} 
                alt="Water ski image" 
                width={800}
                height={8000}
                //className="object-cover  rounded-tl-[55px] rounded-bl-[55px]" // Ensure image covers full div
            />
        </div>



            </div>
        </div>
    );
}
