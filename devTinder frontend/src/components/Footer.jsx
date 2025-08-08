// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
// NEW: Importing specific, high-quality icons
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    // The main footer container. It uses theme-aware colors and a top border.
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      
      {/* This div centers the content and sets up the main columns */}
      <div className="flex flex-col md:flex-row justify-between items-start p-10 max-w-7xl mx-auto gap-8">
        <aside>
          {/* A more modern, code-themed SVG logo */}
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current text-primary">
            <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <p className="font-bold text-lg">
            devTinder
          </p>
          <p>
            Connecting developers, one line of code at a time.
          </p>
        </aside>
        
        {/* Navigation column for key app pages */}
         <div className="flex flex-wrap gap-12">
            <nav className="flex flex-col gap-2">
              <h6 className="footer-title">Navigate</h6>
              <Link to="/feed" className="link link-hover">Feed</Link>
              <Link to="/connections" className="link link-hover">Connections</Link>
              <Link to="/profile" className="link link-hover">My Profile</Link>
            </nav>

            <nav className="flex flex-col gap-2">
              <h6 className="footer-title">Legal</h6>
              <a href="#" className="link link-hover">Terms of use</a>
              <a href="#" className="link link-hover">Privacy policy</a>
              <a href="#" className="link link-hover">Cookie policy</a>
            </nav>

            <nav className="flex flex-col gap-2">
                <h6 className="footer-title">Social</h6>
                <div className="flex gap-4">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="link link-hover text-2xl"><FaGithub /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="link link-hover text-2xl"><FaLinkedin /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="link link-hover text-2xl"><FaTwitter /></a>
                </div>
            </nav>
        </div>
      </div>

      {/* A separate, centered section for the final copyright notice */}
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          {/* The copyright year will update automatically */}
          <p>Copyright © {new Date().getFullYear()} - All right reserved by devTinder Industries Ltd</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;