import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const teamMembers = [
    {
        name: "Md Hasan Sarder",
        role: "Founder & CEO",
        image:
            "https://i.ibb.co.com/zWdq3V1f/hasan22.jpg", // replace with real image
        facebook: "https://www.facebook.com/sarder81",
        twitter: "https://x.com/MdHasan810",
        linkedin: "https://www.linkedin.com/in/hasan6nh/",
    },
    {
        name: "Ashadul Islam",
        role: "Co-Founder",
        image:
            "https://i.ibb.co.com/wrMsSY8B/m3.jpg",
        facebook: "https://www.facebook.com/sarder81",
        twitter: "https://x.com/MdHasan810",
        linkedin: "https://www.linkedin.com/in/hasan6nh/",
    },
    {
        name: "Anowar Hossain",
        role: "Lead Developer",
        image:
            "https://i.ibb.co.com/cckkNM4L/parke.jpg",
        facebook: "https://www.facebook.com/sarder81",
        twitter: "https://x.com/MdHasan810",
        linkedin: "https://www.linkedin.com/in/hasan6nh/",
    },
    {
        name: "Sarah Khan",
        role: "UI/UX Designer",
        image:
            "https://i.ibb.co.com/DHmmzCHJ/images-4.jpg",
        facebook: "https://www.facebook.com/sarder81",
        twitter: "https://x.com/MdHasan810",
        linkedin: "https://www.linkedin.com/in/hasan6nh/",
    },
];

export default function OurTeam() {
    return (
        <section className="py-10   w-11/12 mx-auto mt-10">
            <div className="">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-3xl font-semibold text-gray-800 dark:text-white">
                        Meet Our Team
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        The passionate people behind <span className="font-semibold text-blue-600">MarryNow</span>
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                {member.name}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-300">{member.role}</p>

                            {/* Social Links */}
                            <div className="flex justify-center gap-4 mt-4">
                                <Link
                                    target="_blank"
                                    to={member.facebook}

                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <FaFacebook size={20} />
                                </Link>
                                <Link
                                    target="_blank"
                                    to={member.twitter}
                                    className="text-blue-400 hover:text-blue-600"
                                >
                                    <FaTwitter size={20} />
                                </Link>
                                <Link
                                    target="_blank"
                                    to={member.linkedin}
                                    className="text-blue-700 hover:text-blue-900"
                                >
                                    <FaLinkedin size={20} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
