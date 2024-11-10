// "use client";
// import Image from 'next/image';  // Make sure to import Image from 'next/image'
// import ellipseImage from '../img/DefaultPFP.svg';  // Adjust the path as necessary
// import editPFP from '../img/EditPFPIcon.svg';  // Adjust the path as necessary

// export default function ContactPage() {
//     return (
//         <div className="w-[300px] h-[328px] bg-[#9e1b32]">
//              {/* Ski Bama Logo */}
//              <div className="mb-8">
//                         <Image src={ellipseImage} alt="DefaultPFP" width={300} height={300} />
//                         <Image src={editPFP} alt="Edit Icon" width={100} height={100} />
//                     </div>

//                     <div className="h-[14.34px] flex-col justify-center items-center inline-flex"></div>

//                     <div className="w-[428px] h-[926px] relative bg-white rounded-[5px]">
//     <div className="w-5 h-5 left-[200px] top-[340px] absolute"></div>
//     <div className="w-[428px] h-[328px] left-0 top-0 absolute bg-[#9e1b32]"></div>
//     <img className="w-[227px] h-[227px] left-[100px] top-[70px] absolute rounded-full shadow border-4 border-white" src={ellipseImage} />
//     <div className="w-[191px] h-[26px] left-[-8px] top-[358px] absolute text-center text-black text-xl font-bold font-['Inter']">Your Information</div>
//     <div className="w-[101px] h-3.5 left-[99px] top-[397px] absolute text-black text-[15px] font-bold font-['Inter']"> First Name</div>
//     <div className="w-[101px] h-3.5 left-[101px] top-[449px] absolute text-black text-[15px] font-bold font-['Inter']">Last Name</div>
//     <div className="w-[125px] h-[19px] left-[99px] top-[505px] absolute text-black text-[15px] font-bold font-['Inter']">Phone Number</div>
//     <div className="w-[101px] h-3.5 left-[101px] top-[557px] absolute text-black text-[15px] font-bold font-['Inter']">E-mail</div>
//     <div className="w-[220px] h-7 left-[99px] top-[418px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">Your First Name</div>
//     <div className="w-[220px] h-7 left-[99px] top-[472px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">Your Last Name</div>
//     <div className="w-[241px] h-[22px] left-[100px] top-[528px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">123-456-7890</div>
//     <div className="w-10 h-10 left-[376px] top-[15px] absolute bg-white rounded-[10px] border border-black/10 flex-col justify-center items-center inline-flex">
//         <div className="flex-col justify-center items-center flex"></div>
//     </div>
//     <div className="w-[241px] h-[22px] left-[101px] top-[578px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">youremail@email.com</div>
//     <div className="left-[20px] top-[408px] absolute flex-col justify-center items-center inline-flex"></div>
//     <div className="left-[20px] top-[460px] absolute flex-col justify-center items-center inline-flex"></div>
//     <div className="left-[20px] top-[511px] absolute flex-col justify-center items-center inline-flex"></div>
//     <div className="left-[20px] top-[564px] absolute flex-col justify-center items-center inline-flex"></div>
//     <div className="w-5 h-[26px] left-[20px] top-[615px] absolute flex-col justify-center items-center inline-flex"></div>
//     <div className="w-[101px] h-3.5 left-[100px] top-[609px] absolute text-black text-[15px] font-bold font-['Inter']">CWID</div>
//     <div className="w-[241px] h-[22px] left-[100px] top-[630px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">12345678</div>
//     <div className="left-[21px] top-[674px] absolute flex-col justify-center items-center inline-flex"></div>
//     <div className="w-[101px] left-[100px] top-[665px] absolute text-black text-[15px] font-bold font-['Inter']">Grade</div>
//     <div className="w-[241px] left-[100px] top-[686px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">Senior</div>
//     <div className="left-[20px] top-[724px] absolute flex-col justify-center items-center inline-flex"></div>
//     <div className="w-[101px] left-[101px] top-[719px] absolute text-black text-[15px] font-bold font-['Inter']">Status</div>
//     <div className="w-[241px] left-[101px] top-[740px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">Athlete/Officer</div>
// </div>
//         </div>
//     );
// }



"use client";
import Image from 'next/image';  
import ellipseImage from '../img/DefaultPFP.svg';  
import editPFP from '../img/EditPFPIcon.svg';  

export default function ContactPage() {
    return (
        <div className="w-[300px] h-[328px] bg-[#9e1b32]">
            {/* Ski Bama Logo */}
            <div className="mb-8">
                <Image src={ellipseImage} alt="Default Profile Picture" width={300} height={300} />
                <Image src={editPFP} alt="Edit Icon" width={100} height={100} />
            </div>

            <div className="h-[14.34px] flex-col justify-center items-center inline-flex"></div>

            <div className="w-[428px] h-[926px] relative bg-white rounded-[5px]">
                <div className="w-5 h-5 left-[200px] top-[340px] absolute"></div>
                <div className="w-[428px] h-[328px] left-0 top-0 absolute bg-[#9e1b32]"></div>
                <Image
                    src={ellipseImage}
                    alt="Profile Picture"
                    width={227}
                    height={227}
                    className="absolute left-[100px] top-[70px] rounded-full shadow border-4 border-white"
                />
                <div className="w-[191px] h-[26px] left-[-8px] top-[358px] absolute text-center text-black text-xl font-bold font-['Inter']">Your Information</div>
                <div className="w-[101px] h-3.5 left-[99px] top-[397px] absolute text-black text-[15px] font-bold font-['Inter']">First Name</div>
                <div className="w-[101px] h-3.5 left-[101px] top-[449px] absolute text-black text-[15px] font-bold font-['Inter']">Last Name</div>
                <div className="w-[125px] h-[19px] left-[99px] top-[505px] absolute text-black text-[15px] font-bold font-['Inter']">Phone Number</div>
                <div className="w-[101px] h-3.5 left-[101px] top-[557px] absolute text-black text-[15px] font-bold font-['Inter']">E-mail</div>
                <div className="w-[220px] h-7 left-[99px] top-[418px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">Your First Name</div>
                <div className="w-[220px] h-7 left-[99px] top-[472px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">Your Last Name</div>
                <div className="w-[241px] h-[22px] left-[100px] top-[528px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">123-456-7890</div>
                <div className="w-10 h-10 left-[376px] top-[15px] absolute bg-white rounded-[10px] border border-black/10 flex-col justify-center items-center inline-flex">
                    <div className="flex-col justify-center items-center flex"></div>
                </div>
                <div className="w-[241px] h-[22px] left-[101px] top-[578px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">youremail@email.com</div>
                <div className="left-[20px] top-[408px] absolute flex-col justify-center items-center inline-flex"></div>
                <div className="left-[20px] top-[460px] absolute flex-col justify-center items-center inline-flex"></div>
                <div className="left-[20px] top-[511px] absolute flex-col justify-center items-center inline-flex"></div>
                <div className="left-[20px] top-[564px] absolute flex-col justify-center items-center inline-flex"></div>
                <div className="w-5 h-[26px] left-[20px] top-[615px] absolute flex-col justify-center items-center inline-flex"></div>
                <div className="w-[101px] h-3.5 left-[100px] top-[609px] absolute text-black text-[15px] font-bold font-['Inter']">CWID</div>
                <div className="w-[241px] h-[22px] left-[100px] top-[630px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">12345678</div>
                <div className="left-[21px] top-[674px] absolute flex-col justify-center items-center inline-flex"></div>
                <div className="w-[101px] left-[100px] top-[665px] absolute text-black text-[15px] font-bold font-['Inter']">Grade</div>
                <div className="w-[241px] left-[100px] top-[686px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">Senior</div>
                <div className="left-[20px] top-[724px] absolute flex-col justify-center items-center inline-flex"></div>
                <div className="w-[101px] left-[101px] top-[719px] absolute text-black text-[15px] font-bold font-['Inter']">Status</div>
                <div className="w-[241px] left-[101px] top-[740px] absolute text-[#b9b9b9] text-[15px] font-bold font-['Inter']">Athlete/Officer</div>
            </div>
        </div>
    );
}