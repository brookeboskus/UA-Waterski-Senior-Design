"use client"
import Image from 'next/image';  // Make sure to import Image from 'next/image'
import ellipseImage from '../../img/DefaultPFP.svg';  // Adjust the path as necessary
import Link from 'next/link';
import { useState } from 'react';
import ProtectedProfilePage from '../protected-profile-page/page'; 

export default function EditProfile() {
   

    return (
    <div className="w-[433px] h-[866px] relative">
    <div className="w-5 h-5 left-[200px] top-[339px] absolute"></div>
    <div className="w-[428px] h-[328px] left-[5px] top-0 absolute bg-[#9e1b32]"></div>
    <img className="w-[227px] h-[227px] left-[100px] top-[69px] absolute rounded-full shadow border-4 border-white" src="https://via.placeholder.com/227x227" />
    <div className="w-[191px] h-[26px] left-[9px] top-[355px] absolute text-center text-black text-xl font-bold font-['Inter']">Your Information</div>
    <div className="w-[198px] h-[26px] left-[115px] top-[21px] absolute text-center text-white text-xl font-bold font-['Inter']">Edit Profile</div>
    <div className="w-[401px] h-[68px] left-[15px] top-[402px] absolute bg-white rounded-[20px] border-2 border-[#9e1b32]"></div>
    <div className="w-[401px] h-[68px] left-[15px] top-[506px] absolute bg-white rounded-[20px] border-2 border-[#9e1b32]"></div>
    <div className="w-[401px] h-[68px] left-[15px] top-[609px] absolute bg-white rounded-[20px] border-2 border-[#9e1b32]"></div>
    <div className="w-[401px] h-[68px] left-[15px] top-[714px] absolute bg-white rounded-[20px] border-2 border-[#9e1b32]"></div>
    <div className="w-[54px] h-[53px] left-[273px] top-[243px] absolute bg-[#9e1b32] rounded-full border-2 border-white"></div>
    <div className="w-7 h-[31px] left-[286px] top-[254px] absolute"></div>
    <div className="w-[101px] h-3.5 left-[23px] top-[412px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']"> First Name</div>
    <div className="w-[101px] h-3.5 left-[15px] top-[512px] absolute text-center text-[#b9b9b9] text-[15px] font-bold font-['Inter']">Last Name</div>
    <div className="w-[161px] h-3.5 left-0 top-[616px] absolute text-center text-[#b9b9b9] text-[15px] font-bold font-['Inter']">Phone Number<br/></div>
    <div className="w-[101px] h-3.5 left-[3px] top-[722px] absolute text-center text-[#b9b9b9] text-[15px] font-bold font-['Inter']">E-mail</div>
    <div className="w-[220px] h-7 left-[40px] top-[434px] absolute text-black text-[15px] font-bold font-['Inter']">Your First Name</div>
    <div className="w-[220px] h-7 left-[32px] top-[538px] absolute text-black text-[15px] font-bold font-['Inter']">Your Last Name</div>
    <div className="w-[38px] h-[38px] left-[378px] top-[14px] absolute"></div>
    <div className="w-[220px] h-7 left-[31px] top-[641px] absolute text-black text-[15px] font-bold font-['Inter']">123-456-789</div>
    <div className="w-[220px] h-7 left-[31px] top-[741px] absolute text-black text-[15px] font-bold font-['Inter']">youremail@email.com</div>
    <div className="w-[397px] h-[57px] left-[15px] top-[809px] absolute">
    <div className="w-[397px] h-[57px] left-0 top-0 absolute bg-[#9e1b32] rounded-[30px]"></div>
    <div className="w-[333.31px] h-[32.41px] left-[31.84px] top-[12.29px] absolute text-center text-[#f7f7f7] text-xl font-bold font-['Inter']">Save</div>
    </div>
</div>
    );
}
