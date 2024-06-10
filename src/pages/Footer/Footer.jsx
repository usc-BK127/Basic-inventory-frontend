// Footer.js
import { Link } from "react-router-dom";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logoBlack from "../../../public/image/logo-only.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 rounded">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="flex flex-col items-center">
          <img src={logoBlack} width="100px" alt="logo" />
          <h3 className="text-white text-lg mb-2">Product Management</h3>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-white text-lg mb-2">Quick Links</h3>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link to="/all-products" className="hover:text-green-500">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/product-report" className="hover:text-green-500">
                  Report
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-green-500">
                  Categories
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-white text-lg mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-green-500">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-gray-500 text-sm">
        &copy; 2024 Product Management. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
