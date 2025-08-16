import React, { useRef } from "react";
import { Card, Label, TextInput, Textarea, Button } from "flowbite-react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
    const formRef = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            import.meta.env.VITE_SERVICE_ID,
            import.meta.env.VITE_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_PUBLIC_KEY
        )
            .then(
                (result) => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Email Send Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                        background: 'black',
                        color: 'white'
                    });

                    e.target.reset();
                },
                (error) => {
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "Email not sent",
                        showConfirmButton: false,
                        timer: 1500,
                        background: 'black',
                        color: 'white'
                    });
                }
            );
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <Card className="bg-white shadow-lg">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-2 dark:text-gray-200">
                    Contact Us
                </h1>
                <p className="text-center text-gray-600 mb-8 dark:text-gray-200">
                    We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <form ref={formRef} onSubmit={sendEmail} className="space-y-4 dark:text-gray-200">
                        <div>
                            <label className="label">
                                <span className="label-text mb-1">Your Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"   //  required for {{name}}
                                placeholder="Enter your name"
                                className="border border-gray-300 mt-1 rounded dark:bg-gray-800 w-full"
                                required
                            />
                        </div>
                        <div >
                            <label className="label">
                                <span className="label-text mb-1">Your Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"  // required for {{email}}
                                placeholder="Enter your email"
                                className="border border-gray-300 mt-1 w-full rounded dark:bg-gray-800 dark:text-gray-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text mb-1">Write your message here</span>
                            </label>
                            <textarea
                                name="message" //  required for {{message}}
                                className="border border-gray-300 textarea textarea-bordered w-full rounded dark:bg-gray-800 mt-1"
                                rows="5"
                                placeholder="Type your message..."
                                required
                            ></textarea>
                        </div>
                        <button className=" px-4 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 ">Send Message</button>
                    </form>
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <FaPhoneAlt className="text-blue-600 mt-1" size={20} />
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Phone</h4>
                                <p className="text-gray-600 dark:text-gray-200">+880-1234-567890</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaEnvelope className="text-blue-600 mt-1" size={20} />
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Email</h4>
                                <p className="text-gray-600 dark:text-gray-200">support@marrynow.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaMapMarkerAlt className="text-blue-600 mt-1" size={20} />
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Location</h4>
                                {/* <p className="text-gray-600">Dhaka, Bangladesh</p> */}
                                <p className="dark:text-gray-200">
                                    MarryNow Headquarters<br />
                                    5th Floor, Orchid Plaza<br />
                                    Road No. 11, Gulshan-1<br />
                                    Dhaka-1212, Bangladesh
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ContactUs;
