import Marquee from "react-fast-marquee";

function MarqueeSection() {
    return (
        <div className="bg-white pb-6 pt-6 -mt-2">
            {/* <div className="w-full h-12 bg-white -mb-6"></div> */}
            <div className='border-t border-b border-gray-200 bg-white'>
                <div className="my-12">
                    <h3 className='md:text-xl text-lg font-semibold text-[#2D2D2D] text-center mb-8'>Built by water treatment engineers, researchers,
                        and business operators for industry professionals just like you.</h3>
                    <Marquee speed={50} gradient={false} className="flex items-center space-x-8 px-4 sm:px-8 md:px-12">
                        <img src="/landingPage/marqueeSection/openZpp.png" alt="OpenZeppelin" className="px-12 h-11" />
                        <img src="/landingPage/marqueeSection/orac.png" alt="Oracle" className="px-12 h-8" />
                        <img src="/landingPage/marqueeSection/mor.png" alt="Morpheus" className="px-12 h-16" />
                        <img src="/landingPage/marqueeSection/samsun.png" alt="Samsung" className="px-12 h-8" />
                        <img src="/landingPage/marqueeSection/mond.png" alt="Monday" className="px-12 h-12" />
                        <img src="/landingPage/marqueeSection/segm.png" alt="Segment" className="px-12 h-12" />
                        <img src="/landingPage/marqueeSection/pro.png" alt="Protonet" className="px-12 h-12" />
                    </Marquee>
                </div>
            </div>
        </div>
    )
}

export default MarqueeSection



// "use client";

// import Marquee from "react-fast-marquee";
// import Image from "next/image";

// type User = {
//     id: number;
//     name: string;
//     image: string;
//     linkedin: string;
// };

// const users: User[] = [
//     {
//         id: 1,
//         name: "John Doe",
//         image: "/dashboardImage/profileImage.svg",
//         linkedin: "https://www.linkedin.com/in/johndoe",
//     },
//     {
//         id: 2,
//         name: "Jane Smith",
//         image: "/dashboardImage/profileImage.svg",
//         linkedin: "https://www.linkedin.com/in/janesmith",
//     },
//     {
//         id: 3,
//         name: "Alex Brown",
//         image: "/dashboardImage/profileImage.svg",
//         linkedin: "https://www.linkedin.com/in/alexbrown",
//     },
//     {
//         id: 4,
//         name: "Emily Clark",
//         image: "/dashboardImage/profileImage.svg",
//         linkedin: "https://www.linkedin.com/in/emilyclark",
//     },
// ];

// export default function MarqueeSection() {
//     return (
//         <section className='border-t border-b border-gray-200 bg-white my-24'>
//             <h2 className="text-2xl font-semibold text-center pt-8">
//                 Meet Our Professionals
//             </h2>
//             <p className="text-[#636F85] text-[16px] max-w-3xl mx-auto mt-2 text-center px-3 lg:px-0">
//                 Meet the experienced professionals behind our success—industry leaders dedicated to delivering insight, innovation, and measurable impact for every client.
//             </p>

//             {/* <Marquee pauseOnHover speed={40} gradient={false}> */}
//             <div className="flex flex-wrap gap-6 justify-center items-center my-8">
//                 {users.map((user) => (
//                     <div
//                         key={user.id}
//                         className="cursor-pointer"
//                         onClick={() => window.open(user.linkedin, "_blank")}
//                     >
//                         <div className="relative w-[220px] h-[280px] rounded-xl overflow-hidden border hover:scale-105 transition-transform duration-300">

//                             {/* Image */}
//                             <Image
//                                 src={user.image}
//                                 alt={user.name}
//                                 fill
//                                 className="object-cover"
//                             />

//                             {/* Gradient Overlay */}
//                             <div className="absolute bottom-0 left-0 w-full h-[35%]
//                               bg-[linear-gradient(180deg,rgba(54,54,54,0)_0%,rgba(110,81,224,0.8)_100%)]
//                             " />

//                             {/* Text Content */}
//                             <div className="absolute bottom-4 left-4 right-4 text-white">
//                                 <h3 className="text-lg font-semibold leading-tight text-center">
//                                     {user.name}
//                                 </h3>
//                             </div>

//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* </Marquee> */}
//         </section>
//     );
// }
