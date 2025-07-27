import React from "react";
import { Card, Label, TextInput, Textarea, Button } from "flowbite-react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <Card className="bg-white shadow-lg">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
                    Contact Us
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="name" value="Your Name" />
                            <TextInput id="name" type="text" placeholder="Enter your name" required />
                        </div>
                        <div>
                            <Label htmlFor="email" value="Your Email" />
                            <TextInput id="email" type="email" placeholder="Enter your email" required />
                        </div>
                        <div>
                            <Label htmlFor="subject" value="Subject" />
                            <TextInput id="subject" type="text" placeholder="Enter subject" required />
                        </div>
                        <div>
                            <Label htmlFor="message" value="Your Message" />
                            <Textarea id="message" placeholder="Write your message here..." rows={5} required />
                        </div>
                        <Button color="blue">
                            Send Message
                        </Button>
                    </form>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <FaPhoneAlt className="text-blue-600 mt-1" size={20} />
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
                                <p className="text-gray-600">+880-1234-567890</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaEnvelope className="text-blue-600 mt-1" size={20} />
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                                <p className="text-gray-600">support@marrynow.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaMapMarkerAlt className="text-blue-600 mt-1" size={20} />
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Location</h4>
                                {/* <p className="text-gray-600">Dhaka, Bangladesh</p> */}
                                <p>
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
