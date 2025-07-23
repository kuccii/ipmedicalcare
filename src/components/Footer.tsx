import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src="/ip-medical-logo.png" alt="IP Medical Care Logo" className="h-20 w-auto" />
            </Link>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              Trusted supplier of high-quality medical equipment, serving hospitals, clinics, 
              and healthcare facilities across Tanzania and East Africa with precision instruments and reliable solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="group bg-gray-800 p-3 rounded-xl hover:bg-gradient-to-br hover:from-blue-600 hover:to-teal-600 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <Facebook className="h-5 w-5 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group bg-gray-800 p-3 rounded-xl hover:bg-gradient-to-br hover:from-blue-600 hover:to-teal-600 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <Twitter className="h-5 w-5 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group bg-gray-800 p-3 rounded-xl hover:bg-gradient-to-br hover:from-blue-600 hover:to-teal-600 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <Linkedin className="h-5 w-5 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group bg-gray-800 p-3 rounded-xl hover:bg-gradient-to-br hover:from-blue-600 hover:to-teal-600 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <Instagram className="h-5 w-5 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-400 hover:bg-clip-text transition-all duration-200">About Us</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-400 hover:bg-clip-text transition-all duration-200">Products</Link></li>
              <li><Link to="/industries" className="text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-400 hover:bg-clip-text transition-all duration-200">Industries</Link></li>
              <li><Link to="/case-studies" className="text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-400 hover:bg-clip-text transition-all duration-200">Case Studies</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-400 hover:bg-clip-text transition-all duration-200">Resources</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-400 hover:bg-clip-text transition-all duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-2 rounded-lg mt-0.5 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="text-gray-300 text-sm leading-relaxed">
                  <p className="font-medium text-white mb-1">Kariakoo, Lumumba Complex</p>
                  <p>P.O.BOX 19876</p>
                  <p>Dar Es Salaam, Tanzania</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-2 rounded-lg flex-shrink-0">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <p className="text-gray-300 text-sm">+255621232883</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-2 rounded-lg flex-shrink-0">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <p className="text-gray-300 text-sm">info@ipmedicare.co.tz</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 IP Medical Care Tanzania. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-400 hover:bg-clip-text text-sm transition-all duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-400 hover:bg-clip-text text-sm transition-all duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-400 hover:bg-clip-text text-sm transition-all duration-200">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;