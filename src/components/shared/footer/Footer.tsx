
import Container from "@/lib/Container";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="py-16 px-6">
      <Container className="max-w-7xl mx-auto">
        <div className="mb-10">
          {/* Logo */}
          <Link href="/" className="text-xl text-[#000000]">
            <div className="flex items-center gap-2">
              <img src="/footer/footerLogo.svg" alt="logo" className='w-5 md:w-6 h-5 md:h-6' />
              <h3 className='text-2xl text-primaryColor font-semibold'>Logo</h3>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="text-headingColor text-sm font-medium">
              Generate precise chemical reports, visualize trends, and automate complex.
            </p>
            <div className="flex items-center gap-8 py-8 bg-white">
              <a href="#" className="text-primaryBgColor hover:text-primaryColor text-primaryColor border p-2 rounded-full transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
              // style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)' }}
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-primaryBgColor hover:text-primaryColor text-primaryColor border p-2 rounded-full transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
              // style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)' }}
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="#" className="text-primaryBgColor hover:text-primaryColor text-primaryColor border p-2 rounded-full transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
              // style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)' }}
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primaryColor font-semibold text-[16px] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-primaryColor transition-colors text-[16px] front-semibold text-[#666666]"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryColor transition-colors text-[16px] front-semibold text-[#666666]"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryColor transition-colors text-[16px] front-semibold text-[#666666]"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-primaryColor font-semibold text-[16px] mb-4">
              Contact us
            </h3>
            <ul className="space-y-2">
              <li className="text-[#666666] text-[16px]">+971123 456 789</li>
              <li className="text-[#666666] text-[16px]">support@p181ux.com</li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h3 className="text-primaryColor font-semibold text-[16px] mb-4">Stay Updated</h3>
            <p className="text-[#666666] text-[16px] mb-4">
              Subscribe to our newsletter for the latest offer.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-2 md:px-4 py-2 bg-white placeholder:text-headingColor rounded-l text-sm focus:outline-none border border-[#D1D6DB]"
              />
              <button className="bg-primaryColor text-white border border-primaryColor hover:bg-primaryColor px-2 md:px-4 py-3 rounded-r text-sm font-medium transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#9BA4B0] pt-6 text-center">
          <p className="text-[#9BA4B0] text-[16px]">
            © 2025 SalesMind.com. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
