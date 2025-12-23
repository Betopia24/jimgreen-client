
import Container from "@/lib/Container";
import Link from "next/link";
import { PiGlobeLight } from "react-icons/pi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Footer() {
  return (
    <footer className="py-16 px-6">
      <Container className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          {/* Logo */}
          <Link href="/" className="text-xl text-[#000000]">
            <div className="flex items-center gap-2">
              <img src="/navbar/logo.png" alt="logo" className='w-8 md:w-12 h-8 md:h-12' />
              <h3 className='text-2xl text-primaryBgColor font-semibold'>phora</h3>
            </div>
          </Link>
          <Select>
            <SelectTrigger className="flex items-center gap-2 border border-[#D1D6DB] px-4 py-2 rounded-sm text-[#2D2D2D] focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-[#D1D6DB]
      focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">

              {/* Globe icon on left */}
              <PiGlobeLight size={20} className="text-[#6B7280]" />

              {/* Placeholder with black color */}
              <SelectValue placeholder="Eng" className="text-black" />

            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="English">Eng</SelectItem>
                <SelectItem value="Bangla">Bang</SelectItem>
                <SelectItem value="Arabic">Ara</SelectItem>
                <SelectItem value="Hindi">Hin</SelectItem>
                <SelectItem value="French">Fren</SelectItem>
                <SelectItem value="Spanish">Span</SelectItem>
                <SelectItem value="Italian">Itali</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="text-[#2D2D2D] text-[16px] font-medium">
              Every Emirate. Every Plate. Always Premium.
            </p>
            <div className="flex items-center gap-8 py-8 bg-white">
              <a href="#" className="text-primaryBgColor hover:text-primaryBgColor border p-2 rounded-full transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
              // style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)' }}
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-primaryBgColor hover:text-primaryBgColor border p-2 rounded-full transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
              // style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)' }}
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="#" className="text-primaryBgColor hover:text-primaryBgColor border p-2 rounded-full transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
              // style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)' }}
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primaryBgColor font-semibold text-[16px] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-primaryBgColor transition-colors text-[16px] front-semibold text-[#636F85]"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryBgColor transition-colors text-[16px] front-semibold text-[#636F85]"
                >
                  Benefits
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryBgColor transition-colors text-[16px] front-semibold text-[#636F85]"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryBgColor transition-colors text-[16px] front-semibold text-[#636F85]"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-primaryBgColor font-semibold text-[16px] mb-4">
              Contact us
            </h3>
            <ul className="space-y-2">
              <li className="text-[#636F85] text-[16px]">+971123 456 789</li>
              <li className="text-[#636F85] text-[16px]">support@p181ux.com</li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h3 className="text-primaryBgColor font-semibold text-[16px] mb-4">Stay Updated</h3>
            <p className="text-[#636F85] text-[16px] mb-4">
              Subscribe to our newsletter for the latest offer.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-2 md:px-4 py-2 bg-white placeholder:text-[#2D2D2D] rounded-l text-sm focus:outline-none border border-[#D1D6DB]"
              />
              <button className="bg-primaryBgColor text-white border border-primaryBgColor hover:bg-[#6E51E0] px-2 md:px-4 py-3 rounded-r text-sm font-medium transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#D1D6DB] pt-6 text-center">
          <p className="text-[#9BA4B0] text-[16px]">
            © 2025 SalesMind.com. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
