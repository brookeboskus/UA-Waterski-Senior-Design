
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DefaultPFP from '../../img/blankpfp.svg';
import FirstNameImage from '../../img/Text (1).svg';
import LastNameImage from '../../img/Text (2).svg';
import GradYearImage from '../../img/Text (3).svg';
import PhoneNumberImage from '../../img/Text (4).svg';
import EmailImage from '../../img/Text (5).svg';
import CWIDImage from '../../img/Text (6).svg';
import MajorImage from '../../img/Text (7).svg';
import StatusImage from '../../img/Text (8).svg';
import BoatImage from '../../img/boat.svg';
import EditPage from '../protected-profile-edit-page/page';
import axios from 'axios';
import Link from 'next/link';
import EditIcon from '../../img/EditPFPIcon.svg';

let APP_URL = process.env.NEXT_PUBLIC_APP_URL;


interface TeamMember {
    Fname: string;
    Lname: string;
    GradYear: string;
    MemberType: string;
    Major: string;
    Phone: string;
    Email: string;
    CWID: string;
    Status: string;
    SlalomDriver: string;
    TrickDriver: string;
    JumpDriver: string;
    PfpImage: string;
}

export default function ProfilePage() {
    const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
 // state to manage edit page visibility
  


    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            // const response = await axios.get<TeamMember>('http://localhost:4000/auth/profile', {
            //     headers: {
            //         Authorization: `Bearer ${token}` // send the token in the request headers to authenticate
            //     }
            // });

            if (
                window.location.host.includes("brian") ||
                window.location.host.includes("lilly") ||
                window.location.host.includes("brooke") ||
                window.location.host.includes("anastasia")
            ) {
                const host = window.location.host;
                const baseDomain = "uawaterski.com";
    
                if (host !== `www.${baseDomain}` && host.endsWith(baseDomain)) {
                    APP_URL = `https://${host}/`;
                }
    
                console.log("Current APP_URL:", APP_URL);
            } else {
                console.log("oops you coded wrong, what a dummy");
            }
            const response = await axios.get<TeamMember>(`${APP_URL}api/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // console.log('Profile data:', response.data);

            setTeamMember(response.data); // store profile data in state
        } catch (error) {
            console.error('Failed to fetch team roster:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

   

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!teamMember) {
        return <div>No team member data available.</div>;
    } else {

        return (
            <div className="relative w-[417px] max-h-full h-[787px] bg-white  z-40 overflow-y-auto" style={{ top: '0px', right: '5px', borderLeft: '3px solid black' }}>
                <div className="relative w-full h-full overflow-y-auto">
                    {/* red header section */}
                    <div className="absolute left-0 top-0 w-full h-[320px] bg-[#9e1b32] z-10"></div>

                    {/* user profile image */}
                    <div className="absolute left-[50%] top-[5%] w-[230px] h-[230px] rounded-full z-20 transform -translate-x-[50%] overflow-hidden">
                        <Image
                            src={teamMember.PfpImage ? teamMember.PfpImage : DefaultPFP}
                            alt={`${teamMember.Fname} ${teamMember.Lname}'s profile image`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                        />
                    </div>
                </div>



                


                {/* conditionally render the team member info only if teamMember is defined */}
                {teamMember ? (
                    <>
                    

                        <div className="w-[101px] h-[15px] left-[99px] top-[360px] absolute text-black text-[13px] font-bold">First Name</div>
                        <div className="absolute left-[50px] top-[365px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                            <Image
                                src={FirstNameImage}
                                alt="First Name Icon"
                                layout="fill"
                                objectFit="contain"
                                className="rounded"
                            />
                        </div>
                        <div className="w-[220px] h-[20px] left-[99px] top-[380px] absolute text-[#b9b9b9] text-[13px] font-bold">
                            {teamMember.Fname}
                        </div>

                        <div className="w-[101px] h-[15px] left-[99px] top-[410px] absolute text-black text-[13px] font-bold">Last Name</div>
                        <div className="absolute left-[50px] top-[415px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                            <Image
                                src={LastNameImage}
                                alt="Last Name Icon"
                                layout="fill"
                                objectFit="contain"
                                className="rounded"
                            />
                        </div>
                        <div className="w-[220px] h-[20px] left-[99px] top-[430px] absolute text-[#b9b9b9] text-[13px] font-bold">
                            {teamMember.Lname}
                        </div>

                        <div className="w-[125px] h-[15px] left-[99px] top-[460px] absolute text-black text-[13px] font-bold">Grade</div>
                        <div className="absolute left-[50px] top-[465px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                            <Image
                                src={GradYearImage}
                                alt="Graduation Year Icon"
                                layout="fill"
                                objectFit="contain"
                                className="rounded"
                            />
                        </div>
                        <div className="w-[220px] h-[20px] left-[99px] top-[480px] absolute text-[#b9b9b9] text-[13px] font-bold">
                            {teamMember.GradYear}
                        </div>

                        <div className="w-[101px] h-[15px] left-[99px] top-[510px] absolute text-black text-[13px] font-bold">Major</div>
                        <div className="absolute left-[50px] top-[515px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                            <Image
                                src={MajorImage}
                                alt="Major Icon"
                                layout="fill"
                                objectFit="contain"
                                className="rounded"
                            />
                        </div>
                        <div className="w-[220px] h-[20px] left-[99px] top-[530px] absolute text-[#b9b9b9] text-[13px] font-bold">
                            {teamMember.Major}
                        </div>

                        <div className="w-[125px] h-[15px] left-[99px] top-[560px] absolute text-black text-[13px] font-bold">Phone Number</div>
                        <div className="absolute left-[50px] top-[565px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                            <Image
                                src={PhoneNumberImage}
                                alt="Phone Number Icon"
                                layout="fill"
                                objectFit="contain"
                                className="rounded"
                            />
                        </div>
                        <div className="w-[220px] h-[20px] left-[99px] top-[580px] absolute text-[#b9b9b9] text-[13px] font-bold">
                            {teamMember.Phone}
                        </div>

                        <div className="w-[101px] h-[15px] left-[99px] top-[610px] absolute text-black text-[13px] font-bold">E-mail</div>
                        <div className="absolute left-[50px] top-[615px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                            <Image
                                src={EmailImage}
                                alt="Email Icon"
                                layout="fill"
                                objectFit="contain"
                                className="rounded"
                            />
                        </div>
                        <div className="w-[220px] h-[20px] left-[99px] top-[630px] absolute text-[#b9b9b9] text-[13px] font-bold">
                            {teamMember.Email}
                        </div>

                        <div className="w-[101px] h-[15px] left-[99px] top-[660px] absolute text-black text-[13px] font-bold">CWID</div>
                        <div className="absolute left-[50px] top-[665px] w-[12px] h-[30px] z-20 transform -translate-x-[50%]">
                            <Image
                                src={CWIDImage}
                                alt="CWID Icon"
                                layout="fill"
                                objectFit="contain"
                                className="rounded"
                            />
                        </div>
                        <div className="w-[220px] h-[20px] left-[99px] top-[680px] absolute text-[#b9b9b9] text-[13px] font-bold">
                            {teamMember.CWID}
                        </div>

                        <div className="w-[101px] h-[15px] left-[99px] top-[710px] absolute text-black text-[13px] font-bold">Status</div>
                        <div className="absolute left-[50px] top-[715px] w-[15px] h-[30px] z-20 transform -translate-x-[50%]">
                            <Image
                                src={StatusImage}
                                alt="Status Icon"
                                layout="fill"
                                objectFit="contain"
                                className="rounded"
                            />
                        </div>
                        <div className="w-[220px] h-[20px] left-[99px] top-[730px] absolute text-[#b9b9b9] text-[13px] font-bold">
                            {teamMember.MemberType}
                        </div>

                        <div className="w-[101px] h-[15px] left-[99px] top-[760px] absolute text-black text-[13px] font-bold">Slalom Driver</div>
                        <div className="absolute left-[50px] top-[765px] w-[25px] h-[30px] z-20 transform -translate-x-[50%]">
                            <Image
                                src={BoatImage}
                                alt="Status Icon"
                                layout="fill"
                                objectFit="contain"
                                className="rounded"
                            />
                        </div>
                        <div className="w-[220px] h-[20px] left-[99px] top-[780px] absolute text-[#b9b9b9] text-[13px] font-bold">
                            {teamMember.SlalomDriver}
                        </div>

                        <div className="w-[101px] h-[15px] left-[99px] top-[810px] absolute text-black text-[13px] font-bold">Trick Driver</div>
                        <div className="absolute left-[50px] top-[815px] w-[25px] h-[30px] z-20 transform -translate-x-[50%]">
                            <Image
                                src={BoatImage}
                                alt="Status Icon"
                                layout="fill"
                                objectFit="contain"
                                className="rounded"
                            />
                        </div>
                        <div className="w-[220px] h-[20px] left-[99px] top-[830px] absolute text-[#b9b9b9] text-[13px] font-bold">
                            {teamMember.TrickDriver}
                        </div>

                        <div className="w-[101px] h-[15px] left-[99px] top-[860px] absolute text-black text-[13px] font-bold">Jump Driver</div>
                        <div className="absolute left-[50px] top-[865px] w-[25px] h-[30px] z-20 transform -translate-x-[50%]">
                            <Image
                                src={BoatImage}
                                alt="Status Icon"
                                layout="fill"
                                objectFit="contain"
                                className="rounded"
                            />
                        </div>
                        <div className="w-[220px] h-[20px] left-[99px] top-[880px] absolute text-[#b9b9b9] text-[13px] font-bold">
                            {teamMember.JumpDriver}
                        </div>

                        <br>
                        </br>
                        <br>
                        </br>
                       
                        <br>
                        </br>
                        <br>
                        </br>
                        <br>
                        </br>
                        <br>
                        </br>
                       
                        <br>
                        </br>
                        <br>
                        </br>
                       
                       
                   
                    </>
                 
                ) : (
                    <div>No team member data available.</div>
                )}
            </div>

        );
    }
}