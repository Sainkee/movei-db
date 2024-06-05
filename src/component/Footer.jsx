import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <Link to="/terms-of-use" className="text-sm">
            Terms Of Use
          </Link>
          <Link to="/privacy-policy" className="text-sm">
            Privacy Policy
          </Link>
          <Link to="/about" className="text-sm">
            About
          </Link>
          <Link to="/blog" className="text-sm">
            Blog
          </Link>
          <Link to="/faq" className="text-sm">
            FAQ
          </Link>
        </div>
        <p className="text-center text-sm text-gray-700 max-w-2xl mx-auto mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="text-2xl"
          >
            <Facebook />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="text-2xl"
          >
            <Twitter />
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="text-2xl"
          >
            <Instagram />
          </a>
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className="text-2xl"
          >
            <Linkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
