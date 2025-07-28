import React from 'react';
import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup } from "flowbite-react";
import { Link } from 'react-router';


const Footer1 = () => {
    return (
        <div>
            <Footer >
                <div className="w-full text-center bg-gray-300 py-10">
                    {/* w-full justify-between sm:flex sm:items-center sm:justify-between */}
                    <div className="w-full flex flex-col items-center">
                        {/* <FooterBrand
                            // href="https://flowbite.com"
                            src="https://i.ibb.co/d00NvDCZ/newlogobr.png"
                            alt="Flowbite Logo"
                            name="MarryNow"
                        /> */}
                        <div className='flex items-center gap-2'>
                            <img className='w-10 h-10' src="https://i.ibb.co/d00NvDCZ/newlogobr.png" alt="" />
                            <h1 className='text-2xl font-semibold'>MarryNow</h1>
                        </div>
                        <FooterLinkGroup className='text-black'>
                            {/* <FooterLink ><Link to='/aboutUs'>About</Link></FooterLink>
                            <FooterLink ><Link to='/'>Privacy Policy</Link></FooterLink>
                            <FooterLink ><Link to='/'>Licensing</Link></FooterLink>
                            <FooterLink ><Link to='/contactUs'>Contact</Link></FooterLink> */}
                            <FooterLink as={Link} to="/aboutUs">About</FooterLink>
                            <FooterLink as={Link} to="/">Privacy Policy</FooterLink>
                            <FooterLink as={Link} to="/">Licensing</FooterLink>
                            <FooterLink as={Link} to="/contactUs">Contact</FooterLink>
                        </FooterLinkGroup>
                    </div>
                    <FooterDivider />
                    {/* <Link className='' to='/'><FooterCopyright by="MarryNow™" year={2025} /></Link> */}
                    {/* <p>Alright reserved by Marrynow</p> */}
                    <p className='text-sm'>Copyright © {new Date().getFullYear()} - All right reserved by MarryNow Ltd</p>
                </div>
            </Footer>
        </div>
    );
};

export default Footer1;