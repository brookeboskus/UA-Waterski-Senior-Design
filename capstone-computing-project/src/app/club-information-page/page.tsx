//a. officer roles b. Bi-laws c. team history d. team drivers e. team judges


"use client";
import { useState } from "react";
import Image from 'next/image';
import waterskiClubInfoPhoto1 from '../../components/img/waterski-club-info-1 1.svg';

export default function ClubInfo() {
    const [activeSection, setActiveSection] = useState<string>('roles');
    const [isBylawsExpanded, setIsBylawsExpanded] = useState<boolean>(false);

    const toggleBylaws = () => {
        setIsBylawsExpanded(!isBylawsExpanded);
    };

    const sections = {
        roles: (
            <div>
                <h2 className="text-3xl font-bold text-[#9E1B32] mb-4">Officer Roles</h2>
                <p className="text-gray-700 leading-relaxed">
                    The executive body consists of a President, Vice-President, Secretary, Treasurer, and Team Captain. Each role holds specific responsibilities critical to the team’s success.
                </p>
                <br></br>
                <br></br>
                <p className="pl-4"><span style={{ color: '#F11C1C' }}>The President </span>will be appointed by a majority vote of the Water Ski Team members. The President must have held a previous leadership position. They shall preside at all team meetings. He/she is responsible for calling all team meetings and may call unscheduled meetings at their discretion. They are the mediator between the Water Ski Team and Sports Clubs and SGA and are expected to abide by all rules and attend mandatory meetings and trainings. President is responsible for being in communication with Lyman about what needs to be done out at the lake and delegating to team members. </p>
                <br></br>
                <p className="pl-4"><span style={{ color: '#F11C1C' }}>Vice President </span>, during the absence and/or inability of the President to render and perform his duties or exercise his powers, the same will be performed and exercised by the Vice President, and when so acting, he shall have all the powers and be subject to all the responsibilities hereby given to or imposed upon the President. </p>
                <br></br>
                <p className="pl-4"><span style={{ color: '#F11C1C' }}>Secretary </span>shall keep all records of absences, excused, points and meeting minutes. The Secretary will send the meeting overview to members who missed the meeting with an excused absence. The Secretary maintains a Google document with each member’s points for the semester.  The secretary will promote the Water Ski Team via social media and community outreach and volunteer opportunities as well as t-shirts and stickers. </p>
                <br></br>
                <p className="pl-4"><span style={{ color: '#F11C1C' }}>Treasurer </span>is the chief financial officer of the team and shall be responsible for the control of funds. The treasurer shall present and maintain a budget each year for the finances of the team and its operations. The treasurer is responsible for collecting team dues at the first meeting of every new season/semester. In addition, the treasurer will seek out fund raising opportunities for the team. </p>
                <br></br>
                <p className="pl-4"><span style={{ color: '#F11C1C' }}>Team Captain </span>is in charge of representing the team at all tournaments and events and coordinating with the officials before each tournament. If any tournament decisions or changes must be made the Captain will vote and represent the team in its entirety. The Team Captain must confirm the ski team roster before each tournament. Team captain must keep track of practice records during tournament season.</p>
                <br></br>
                <div className="border-t border-[#9E1B32] border-2 my-2"></div>
                <br></br>
                <p className="pl-4">In the event of a vacancy within the Executive Body, a new member will be elected, by popular vote, at the next scheduled team meeting.</p>
            </div>
        ),
        bilaws: (
            <div>
                <h2 className="text-3xl font-bold text-[#9E1B32] mb-4">Bi-Laws</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    The Constitution and Bi-Laws of the University of Alabama Waterski Team outline the rules and regulations that govern the team’s operations and activities.
                </p>

                <button
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-400 mb-6"
                    onClick={toggleBylaws}
                >
                    {isBylawsExpanded ? "Collapse Bi-Laws" : "Expand Bi-Laws"}
                </button>
                <div className="border-t border-gray-700 my-2"></div>
                <br></br>

                {isBylawsExpanded && (
                    <div className="text-gray-700 leading-relaxed space-y-8">
                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE I—Name</h3>
                            <p className="pl-4">For all intents and purposes, this sport club of The University of Alabama shall be called The University of Alabama Waterski Team.</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE II—Purpose</h3>
                            <p className="pl-4">The purpose of the University of Alabama Waterski Team shall be to organize, promote, and direct intercollegiate waterskiing events at the University of Alabama and its competitors as a sports discipline of the National Collegiate Water Ski Association (NCWSA).</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE III—Membership</h3>
                            <div className="pl-4">
                                <p><span style={{ color: '#F11C1C' }}>A.</span> Any enrolled undergraduate or graduate student at the University of Alabama who maintains a 2.0 grade point average shall be eligible for membership.</p>
                                <p><span style={{ color: '#F11C1C' }}>B.</span> Membership in registered student organizations shall be open to all students of The University of Alabama, without regard to race, religion, sex, ability status, national origin, color, age, gender identity, gender expression, sexual identity, or veteran status except in cases of designated fraternal organizations exempted by federal law from Title IX regulations concerning discrimination on the basis of sex.</p>
                                <p><span style={{ color: '#F11C1C' }}>C.</span> Members must pay dues of $500. Active members must also be members of USA Waterski for insurance and liability purposes. (State provisions for allocation of any bank account funds held in the name of the organization in the event that the organization goes defunct or is terminated with The SOURCE.)</p>
                                <p><span style={{ color: '#F11C1C' }}>D.</span> Active members in good standing have access to the team’s practice facility (Lymanland USA), team equipment, team boat* (see article XII, section B), and the use of team gas.</p>
                                <p><span style={{ color: '#F11C1C' }}>E.</span> In addition to paying dues, active members must sign up for and complete tasks to be done at Lymanland and for tournaments hosted by the University of Alabama. A google document will be kept with jobs that need to be done, it is each skier's responsibility to check the document, sign up for tasks, and complete them in a timely fashion.</p>
                                <p><span style={{ color: '#F11C1C' }}>F.</span> There are two types of membership, “A-team” skiers and “B-team” skiers, defined as follows:</p>
                            </div>

                            {/* A-Team Skiers Section */}
                            <div className="pl-10 space-y-6">
                                <div>
                                    <span className="text-[#9E1B32] font-bold">A-team skiers: </span>
                                    <span className="text-gray-700">
                                        are the top five skiers in each discipline of slalom, trick, and jump, including both the male and female teams. This results in a possible maximum of 30 A-team members. A-team skiers are only eligible if they are a full-time student taking at least twelve credit hours while maintaining a GPA of 2.0. Eligibility lasts for four fall and four spring seasons (which can be non-consecutive). Graduate students can be considered for A-team if they still have eligibility.
                                    </span>
                                </div>

                                {/* B-Team Skiers Section */}
                                <div>
                                    <span className="text-[#9E1B32] font-bold">B-team skiers: </span>
                                    <span className="text-gray-700">
                                        The B-team skiers will consist of all skiers seeking membership who do not qualify for the A-team.
                                    </span>
                                </div>

                                {/* A-Team Qualification */}
                                <div>
                                    <span className="text-[#9E1B32] font-bold">A-Team qualification: </span>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li>80% of the qualification is based on the average of 3 collegiate tournament scores.</li>
                                        <li>20% is based on the team trial score.</li>
                                    </ul>

                                    <table className="w-full mt-4 text-gray-700 border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-400">
                                                <th className="py-2 px-4 text-left">Discipline</th>
                                                <th className="py-2 px-4 text-left">Special Conditions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-400">
                                                <td className="py-2 px-4">Slalom</td>
                                                <td className="py-2 px-4">If AWSA score exceeds one of three collegiate scores, it may replace the collegiate score.</td>
                                            </tr>
                                            <tr className="border-b border-gray-400">
                                                <td className="py-2 px-4">Trick</td>
                                                <td className="py-2 px-4">If skier presents one pass AWSA score that exceeds one of three collegiate scores, it may replace the collegiate score.</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-4">Jump</td>
                                                <td className="py-2 px-4">
                                                    If AWSA score exceeds one of three collegiate scores, it may replace the collegiate score. For each ramp height/speed increase, the score will be reduced by 5%.
                                                    <br />
                                                    Example: AWSA score of 205 feet (35 MPH, 5.5 ramp) is equivalent to 174.25 feet.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Team Trial Information */}
                                <div>
                                    <span className="text-[#9E1B32] font-bold">Team Trial: </span>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li>The team trial score is optional. Skiers can choose to participate in the trial to improve their average.</li>
                                        <li>If a skier participates, they can choose whether or not to keep their score.</li>
                                        <li>If a skier cannot attend the agreed-upon team trial, a make-up date will be determined by the officers.</li>
                                        <li>Skiers must declare their intention to participate in the make-up trial before the first trial begins.</li>
                                    </ul>
                                </div>

                                {/* No Team Trial Participation */}
                                <div>
                                    <span className="text-[#9E1B32] font-bold">If the skier does not participate in the team trial: </span>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li>100% of the skier’s score will be based on the average of their 3 collegiate scores.</li>
                                        <li>If a skier has 3 NCWSA tournament scores, they may drop their lowest score if doing so raises their average.</li>
                                        <li>If a skier has only 2 NCWSA scores, no scores may be dropped.</li>
                                    </ul>
                                </div>

                                {/* Special Circumstances */}
                                <div>
                                    <span className="text-[#9E1B32] font-bold">Special Circumstances: </span>
                                    <p className="text-gray-700">
                                        If a skier cannot compete in NCWSA tournaments due to extreme circumstances:
                                    </p>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li>60% of the score will be based on the AWSA average score.</li>
                                        <li>40% of the score will be based on the team trials score.</li>
                                    </ul>
                                    <p className="text-gray-700 mt-2">
                                        Last year's NCWSA average may be used if the skier is not a new member. This is subject to officer/advisor discretion.
                                    </p>
                                </div>
                            </div>
                            <p className="pl-4">If any skier chooses to challenge another skier for their A team spot, A challenge is a head-to-head for the 5th spot only. Winner takes the spot. A challenge must be approved by the officers. (If 4,5th spot are tied, Three way run off will be granted.) </p>

                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE IV—Meetings</h3>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>A. </span>The team meets every Monday evening during the fall and on occasional Monday evenings during the spring. Time and location to be determined by the president and advisor and will be set at the beginning of the semester. All meetings are mandatory for all members. </p>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>B. </span>A skiers receive two absence for the fall/ spring semesters. Unless provided documentation of excuse. If a skier receives a third absence for the fall or spring semester, they will be subject to fines. 3rd missed meeting $20, 4th Missed $30, 5th or more $50. If unpaid fines you will be ineligible to ski A team. For an absence to be considered excused the member must notify an officer by email or other written notification before the meeting with an acceptable reason.</p>

                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE V—Executive Body</h3>
                            <p className="pl-4">The executive body consists of a President, Vice-President, Secretary, Treasurer, and Team Captain.</p>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>The President </span>will be appointed by a majority vote of the Water Ski Team members. The President must have held a previous leadership position. They shall preside at all team meetings. He/she is responsible for calling all team meetings and may call unscheduled meetings at their discretion. They are the mediator between the Water Ski Team and Sports Clubs and SGA and are expected to abide by all rules and attend mandatory meetings and trainings. President is responsible for being in communication with Lyman about what needs to be done out at the lake and delegating to team members. </p>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>Vice President </span>, during the absence and/or inability of the President to render and perform his duties or exercise his powers, the same will be performed and exercised by the Vice President, and when so acting, he shall have all the powers and be subject to all the responsibilities hereby given to or imposed upon the President. </p>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>Secretary </span>shall keep all records of absences, excused, points and meeting minutes. The Secretary will send the meeting overview to members who missed the meeting with an excused absence. The Secretary maintains a Google document with each member’s points for the semester.  The secretary will promote the Water Ski Team via social media and community outreach and volunteer opportunities as well as t-shirts and stickers. </p>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>Treasurer </span>is the chief financial officer of the team and shall be responsible for the control of funds. The treasurer shall present and maintain a budget each year for the finances of the team and its operations. The treasurer is responsible for collecting team dues at the first meeting of every new season/semester. In addition, the treasurer will seek out fund raising opportunities for the team. </p>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>Team Captain </span>is in charge of representing the team at all tournaments and events and coordinating with the officials before each tournament. If any tournament decisions or changes must be made the Captain will vote and represent the team in its entirety. The Team Captain must confirm the ski team roster before each tournament. Team captain must keep track of practice records during tournament season.</p>
                            <br></br>
                            <div className="border-t border-gray-700 my-2"></div>
                            <br></br>
                            <p className="pl-4">In the event of a vacancy within the Executive Body, a new member will be elected, by popular vote, at the next scheduled team meeting.</p>

                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE VI—Elections</h3>
                            <p><span style={{ color: '#F11C1C' }}>A.</span> All officials are elected on a yearly basis by popular vote at a designated team meeting. Each term consists of one spring semester and one fall semester. The maximum amount of terms served by one person is limited to three. The President may only hold a maximum of two terms in that office. </p>
                            <p><span style={{ color: '#F11C1C' }}>B.</span> New officers are to be elected each year after nationals in November. Prospective candidates may put their name in for consideration on the ballet after January 1st of the new year, before the mid-winter meeting. The officers to be nominated include president, vice president, treasurer and team captain. Members wishing to run for office shall volunteer or be nominated by another team member. Presidential candidates must have held a previous office or be elected by a unanimous vote.
                            </p>
                            <p><span style={{ color: '#F11C1C' }}>C.</span> After the candidates have been nominated to run for office, the team will select the new officers by popular vote. In case of a tie for any office, the advisor will decide who will be the officer.
                            </p>
                            <p><span style={{ color: '#F11C1C' }}>D.</span> If a presidential candidate will be an enrolled student who is not in Tuscaloosa for the Spring Semester for academic reasons (studying abroad, coop, internship, etc.) the Vice President can act as governing President for that semester. The President must be on campus for the fall semester. </p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE VII—Funds</h3>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>A. </span>Travel budgets and specific purchase requests are paid by individual ski team members as needed. Other club expenditures such as lake rental, boat storage, electricity, team boat, tournament entry fees, and hotel rooms are paid with collected money from semester dues, FAC and SGA allocations, and received donations.</p>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>B. </span>State provisions for allocation of any bank account funds held in the name of the organization in the event that the organization goes defunct or is terminated with The SOURCE.</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE VIII—Affiliations</h3>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>A. </span>The University of Alabama Waterski Team is a member of the National Collegiate Waterski Association (NCWSA). The team is also affiliated with USA Waterski, requiring all ski team members to be paying members of USA Waterski for insurance and liability purposes.</p>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>B. </span>The team must renew membership with the NCWSA each year by paying the annual dues. Members must individually renew their USA Waterski membership by paying the annual dues.</p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE IX-Advisors and Coaches</h3>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>A. </span>In addition to the club president, the team may solicit the services of volunteer coaches to assist with the coaching and coordination of team travel, events, and practices. The coach need not be affiliated with the University of Alabama, but they will be required to abide by all University of Alabama policies. The coach must adhere to the policies and recommendations of University Recreation regarding Sport Clubs. </p>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>B. </span>If deemed necessary, a volunteer advisor may be selected as a resource for the team. The advisor’s responsibilities include, but are not limited to, assisting the team during meetings, travel, events, and practices. </p>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>B. </span>If there are multiple advisors for the team, members will vote on who will be the head advisor.  </p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">Article X—Ratification</h3>
                            <p className="pl-4">This constitution shall be ratified and put into effect immediately after the approval advisor and officers.
                            </p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">Article XI—Amendments</h3>
                            <p className="pl-4">An amendment to this constitution may be presented by any member of the team. The amendment shall be presented by distributing a copy of said amendment to each member of the team. An amendment can be ratified if 2/3 of the team approves the amendment by popular vote, after at least one week’s time is left for consideration.

                            </p>
                        </div>

                        <div className="space-y-2 bg-white shadow-md p-4 rounded-lg border-l-4 border-[#9E1B32] hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-[#EA3131]">ARTICLE XII—Bylaws</h3>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>A. </span>Active members may drive the team boat only after the member’s driving and safety skills are assessed and approved by one officer.</p>
                            <p className="pl-4"><span style={{ color: '#F11C1C' }}>B. </span>Bylaws must be reviewed as a team annually and signed by each member of the Alabama Water Ski Team.</p>
                        </div>
                    </div>
                )}
            </div>
        ),
        drivers: (
            <div>
                <h2 className="text-3xl font-bold text-[#9E1B32] mb-4">Team Drivers</h2>
                <p className="text-gray-700 leading-relaxed">
                    Only team members who have been assessed and approved by an officer are allowed to drive the team boat.
                </p>
            </div>
        ),
        judges: (
            <div>
                <h2 className="text-3xl font-bold text-[#9E1B32] mb-4">Team Judges</h2>
                <p className="text-gray-700 leading-relaxed">
                    Judges oversee competitions and ensure that all participants adhere to the rules of the sport.
                </p>
            </div>
        ),
    };

    return (
        <div className="min-h-screen flex flex-col text-gray-800 overflow-hidden">
            {/* Club Info Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-[#9E1B32] mb-6">Club Info</h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        The University of Alabama's Water Ski Team has a proud tradition of over 30 years, bringing together passionate athletes from across the country. Our team offers a supportive environment for skiers of all skill levels, from beginners to world champions, allowing them to excel both on and off the water. As one of the top teams in the country, we focus on fostering a strong sense of community and helping our athletes grow both personally and competitively.
                    </p>
                </div>

                {/* Image Section */}
                <div className="flex justify-center mb-12">
                    <Image
                        src={waterskiClubInfoPhoto1}
                        alt="Water Ski Club Info Photo 1"
                        width={800}
                        height={500}
                    />
                </div>

                <div className="border-t border-[#9E1B32] my-12"></div>

                <div className="flex flex-col items-center mb-12">
                    {/* Section Toggle Buttons */}
                    <div className="mb-6">
                        <button
                            className={`px-4 py-2 mx-2 ${activeSection === 'roles' ? 'bg-[#9E1B32] text-white' : 'bg-white text-[#9E1B32] border border-[#9E1B32]'}`}
                            onClick={() => setActiveSection('roles')}
                        >
                            Officer Roles
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 ${activeSection === 'bilaws' ? 'bg-[#9E1B32] text-white' : 'bg-white text-[#9E1B32] border border-[#9E1B32]'}`}
                            onClick={() => setActiveSection('bilaws')}
                        >
                            Bi-Laws
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 ${activeSection === 'drivers' ? 'bg-[#9E1B32] text-white' : 'bg-white text-[#9E1B32] border border-[#9E1B32]'}`}
                            onClick={() => setActiveSection('drivers')}
                        >
                            Team Drivers
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 ${activeSection === 'judges' ? 'bg-[#9E1B32] text-white' : 'bg-white text-[#9E1B32] border border-[#9E1B32]'}`}
                            onClick={() => setActiveSection('judges')}
                        >
                            Team Judges
                        </button>
                    </div>

                    {/* Active Section Content */}
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
                        {sections[activeSection]}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 text-black py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold text-[#9E1B32] mb-8">Our Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl text-[#9E1B32] font-bold mb-2">Teamwork</h3>
                            <p className="text-gray-700">Collaboration and mutual support are the backbone of our team.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl text-[#9E1B32] font-bold mb-2">Discipline</h3>
                            <p className="text-gray-700">We believe that consistent training and discipline are the keys to success.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl text-[#9E1B32] font-bold mb-2">Excellence</h3>
                            <p className="text-gray-700">With a commitment to excellence, our team continually strives to reach new levels of achievement.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
