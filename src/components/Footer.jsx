import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Transparentlogofile2.png";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaTwitter, FaXTwitter } from "react-icons/fa6";
import {HashLink} from "react-router-hash-link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      

      <footer id="contact">
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div className="footer-logo-row">
              <img src={Logo} alt="JobChoice Consulting" />
            </div>
            <p className="footer-tagline">
              Your trusted partner in finding the perfect career opportunities.
              We connect talent with success.
            </p>
            <div className="footer-socials">
              {[
                { id:"fb", label: <FaFacebook size={window.innerWidth < 768 ? 18 : 28}  style={{color:'#0148e2'}}/>,  href: "https://www.linkedin.com/company/jobchoiceconsulting" },
                { id:"x",  label: <FaXTwitter size={window.innerWidth < 768 ? 18 : 25}  style={{color:'#111112'}}/>,  href: "https://www.linkedin.com/company/jobchoiceconsulting" },
                { id:"li",  label: <FaLinkedin size={window.innerWidth < 768 ? 18 : 28}  style={{color:'#2769ab'}}/>, href: "https://www.linkedin.com/company/jobchoiceconsulting" },
                { id:"in",  label: <FaInstagram size={window.innerWidth < 768 ? 18 : 28}  style={{color:'#900000'}}/>, href: "https://www.instagram.com/jobchoice_consulting/?utm_source=ig_web_button_share_sheet" },
              ].map(({id, label, href }) => (
                <a key={id} className="social-btn" onClick={() => window.open(href, "_blank")}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              <li><HashLink to="/#home">Home</HashLink></li>
              <li><HashLink to="/jobs#jobs">Job Opportunities</HashLink></li>
              <li><HashLink to="/services#services">Services</HashLink></li>
              <li><HashLink to="/about#about">About Us</HashLink></li>
              <li><HashLink to="/contact#contact">Contact</HashLink></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="footer-col-title">Our Services</div>
            <ul className="footer-links">
              <li><HashLink to="/services#placement">Career Counseling</HashLink></li>
              <li><HashLink to="/services#training">Technical Recruitment</HashLink></li>
              <li><HashLink to="/services#payroll">Payroll Staffing</HashLink></li>
              <li><HashLink to="/services#bulkhiring">Bulk Hiring</HashLink></li>
              <li><HashLink to="/services#executive">Executive Hiring</HashLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-title">Contact Us</div>
            <div className="fc-row">
              <span className="fc-icon"><MapPin size={16} /></span>
              <span className="fc-text">
                Office No. 17, 3rd Floor, Kedar  Empire,<br />
                Near Nal Stop Metro Station,<br />
                Erandwane, Pune - 411004
              </span>
            </div>
            <div className="fc-row">
              <span className="fc-icon"><Phone size={16} /></span>
              <a href="tel:+918999571951" className="fc-text">
                +91 8999571951
              </a>
            </div>
            <div className="fc-row">
              <span className="fc-icon"><Mail size={16} /></span>
              <a href="mailto:hr@jobchoiceconsulting.com" className="fc-text">
                hr@jobchoiceconsulting.com
              </a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          &copy; {year} JobChoice Consulting. All rights reserved.
        </div>
      </footer>
    </>
  );
}