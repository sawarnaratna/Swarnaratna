import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#1a2e1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Company Info */}
          <div className="space-y-8">
            <Link to="/" className="inline transition-transform duration-300 hover:scale-105">
              <img 
                src="/Swarnaratna_Logo.png" 
                alt="Swarnaratna Logo" 
                className="h-25 object-contain"
              />
            </Link>
            <p className="mt-5 text-stone-400 text-[13px] leading-relaxed font-light italic">
              Cultivating a legacy of pure health and luxury since inception. Our commitment to quality is rooted in nature itself.
            </p>
            <div className="flex space-x-6">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="text-stone-500 hover:text-[#d4af37] transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-harvest-gold">Collections</h3>
            <ul className="space-y-4">
              {['Exotic Nuts', 'Premium Dates', 'Dry Berries', 'Gift Hampers', 'Bulk Orders'].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-stone-400 text-[12px] uppercase tracking-widest hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-harvest-gold">Information</h3>
            <ul className="space-y-4">
              {['Our Heritage', 'Monthly Subscription', 'Private Concierge', 'Track Reservation'].map((item) => (
                <li key={item}>
                  <Link to="/about" className="text-stone-400 text-[12px] uppercase tracking-widest hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-[#d4af37]">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-10 text-[#d4af37]" />
                <span className="text-stone-400 text-[12px] font-light leading-relaxed">
                  Plot no 811, Nilay Murarka Marg, Ganeshpeth Colony, Nagpur, Maharashtra 440002
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-4 h-4 text-[#d4af37]" />
                <span className="text-stone-400 text-[12px] font-light tracking-wider">
                  swarnaratna9@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span className="text-stone-400 text-[12px] font-light tracking-wider">
                  +91 88559 68667
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-24 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-600 text-[10px] font-black uppercase tracking-[0.2em]">
            &copy; {currentYear} Swarnaratna Premium Dry Fruits
          </p>
          <div className="flex space-x-8 text-stone-600 text-[10px] font-black uppercase tracking-[0.2em]">
            <Link to="#" className="hover:text-stone-400 transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-stone-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;