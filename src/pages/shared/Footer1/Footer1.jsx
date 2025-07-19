import React from 'react';
import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup } from "flowbite-react";
import { Link } from 'react-router';


const Footer1 = () => {
    return (
        <div>
            <Footer container>
                <div className="w-full text-center">
                    <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
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
                        <FooterLinkGroup>
                            <FooterLink >About</FooterLink>
                            <FooterLink >Privacy Policy</FooterLink>
                            <FooterLink >Licensing</FooterLink>
                            <FooterLink >Contact</FooterLink>
                        </FooterLinkGroup>
                    </div>
                    <FooterDivider />
                    <Link to='/'><FooterCopyright by="MarryNow™" year={2025} /></Link>

                </div>
            </Footer>
        </div>
    );
};

export default Footer1;