import React from "react";
import { Card, Button } from "flowbite-react";
import { FaBullseye, FaCogs, FaStar, FaRocket, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router";

const AboutUs = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12 ">
            <Card className="bg-white ">
                <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200  mb-4">
                    About Us
                </h1>
                <p className="text-center text-lg text-gray-600 mb-10 dark:text-gray-200">
                    Welcome to <span className="text-blue-600 font-semibold">MarryNow</span> — your trusted partner in finding the right life partner.
                </p>

                <section className="mb-8 ">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 flex items-center justify-center gap-2 mb-4">
                        <FaBullseye className="text-blue-600" /> <span className="dark:text-gray-200">Our Mission</span>
                    </h2>
                    <p className="text-gray-700 text-justify md:text-center dark:text-gray-200">
                        At <strong>MarryNow</strong>, we aim to help people find meaningful and lifelong relationships based on trust, faith, and compatibility.
                        We provide a platform that combines tradition with technology to help you find your perfect match.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 flex items-center justify-center gap-2 mb-4">
                        <FaCogs className="text-blue-600" /> <span className="dark:text-gray-200">What We Do</span>
                    </h2>
                    <p className="text-gray-700 text-justify md:text-center dark:text-gray-200">
                        We offer personalized biodata profiles, smart matchmaking tools, and verified user data to ensure a safe and successful journey toward marriage.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 flex items-center justify-center gap-2 mb-4">
                        <FaStar className="text-yellow-500" /><span className="dark:text-gray-200"> Why Choose MarryNow?</span>
                    </h2>
                    <ul className="list-disc ml-10 text-gray-700 space-y-2 text-left dark:text-gray-200">
                        <li><strong>Verified Profiles:</strong> Every biodata goes through manual screening.</li>
                        <li><strong>Smart Matchmaking:</strong> Match by age, division, profession, and values.</li>
                        <li><strong>Privacy & Security:</strong> We take your safety seriously.</li>
                        <li><strong>Premium Support:</strong> Dedicated support for premium members.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 flex items-center justify-center gap-2 mb-4">
                        <FaRocket className="text-purple-600" /><span className="dark:text-gray-200"> Our Vision</span>
                    </h2>
                    <p className="text-gray-700 text-justify md:text-center dark:text-gray-200">
                        We want to be the most trusted digital marriage platform in Bangladesh and beyond — committed to halal relationships,
                        strong values, and long-term happiness.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2 mb-4">
                        <FaEnvelope className="text-blue-500" /> Need Help?
                    </h2>
                    <p className="text-gray-700 text-center dark:text-gray-200">
                        If you have questions, please visit our{" "}
                        {/* <a href="/contact" className="text-blue-600 underline">
                            Contact Page
                        </a> */}
                        <Link to='/contactUs' className="text-blue-600 underline">
                            Contact Page
                        </Link>
                        {" "}
                        or email us at{" "}
                        {/* <a href="mailto:support@marrynow.com" className="text-blue-600 underline">
                            support@marrynow.com
                        </a> */}
                        <Link to='mailto:support@marrynow.com ' className="text-blue-600 underline">
                            support@marrynow.com
                        </Link>.
                    </p>
                </section>

                <div className="flex justify-center mt-6">
                    <Link to='/register'>
                        <Button color="blue">
                            Join MarryNow Today
                        </Button>
                    </Link>

                </div>
            </Card>
        </div>
    );
};

export default AboutUs;
