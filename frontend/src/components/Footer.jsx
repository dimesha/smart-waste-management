"use client";
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from "../assets/logo.png";

export default function Footers() {
  return (
    <Footer container className=" shadow-lg rounded-none bg-[#006400]">
      <div className="w-full ml-auto">
        <div className="grid w-full md:justify-between sm:flex md:grid-cols-1">
          {/* Logo */}
          <div className="mt-5">
            <img
              src={logo}
              className="ml-auto mr-auto h-20 w-auto"
              alt="Logo"
            />
          </div>

          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6 text-white">
            <div className="hidden lg:flex flex-col">
              <Footer.Title title="Reference" className="text-white" />
              {/* Links For Reference */}
              <Footer.LinkGroup col className="text-white">
                <Footer.Link href="#">E - Waste</Footer.Link>
                <Footer.Link href="#">E - Product </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Services" className="text-white" />
              {/* Links For Services */}
              <Footer.LinkGroup col className="text-white">
                <Footer.Link href="#">Garbage Service</Footer.Link>
                <Footer.Link href="#">Vehicle Service</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-white" />
              {/* Links For Legal Information */}
              <Footer.LinkGroup col className="text-white">
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <Footer.Divider />
        <div className="flex w-full justify-between">
          {/* Copyright notice */}
          <div className="hidden lg:flex">
            <Footer.Copyright
              className="text-white"
              by="Copyright Avishka Rathnakumara. All Rights Reserved."
              year={new Date().getFullYear()}
            />
          </div>
          {/* Icons aligned to the right */}
          <div className="flex space-x-6 ">
            <Footer.Icon href="#" icon={BsFacebook} className="text-white" />
            <Footer.Icon href="#" icon={BsInstagram} className="text-white" />
            <Footer.Icon href="#" icon={BsTwitter} className="text-white" />
            <Footer.Icon href="#" icon={BsDribbble} className="text-white" />
          </div>
        </div>
      </div>
    </Footer>
  );
}
