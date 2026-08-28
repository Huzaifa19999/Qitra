import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-400 relative pt-16 pb-8 border-t border-[#d4af37]/20">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <h3 className="font-playfair text-2xl text-[#d4af37] tracking-wider mb-6">LUXE PARFUM</h3>
            <p className="text-sm leading-relaxed">
              Discover the essence of luxury with our curated collection of fine fragrances. 
              Each scent is carefully selected to offer an unforgettable olfactory experience.
            </p>
          </div>

          <div>
            <h4 className="font-playfair text-[#d4af37] text-lg mb-6 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors duration-200">About Us</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors duration-200">All Products</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors duration-200">Your Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-[#d4af37] text-lg mb-6 uppercase tracking-widest">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/category/men" className="hover:text-white transition-colors duration-200">Men's Fragrances</Link></li>
              <li><Link href="/category/women" className="hover:text-white transition-colors duration-200">Women's Fragrances</Link></li>
              <li><Link href="/category/unisex" className="hover:text-white transition-colors duration-200">Unisex Collection</Link></li>
              <li><Link href="/category/children" className="hover:text-white transition-colors duration-200">Children's Scents</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-[#d4af37] text-lg mb-6 uppercase tracking-widest">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="text-[#d4af37] mr-3">⚲</span>
                123 Luxury Avenue, Paris, France 75008
              </li>
              <li className="flex items-center">
                <span className="text-[#d4af37] mr-3">✉</span>
                contact@luxeparfum.com
              </li>
              <li className="flex items-center">
                <span className="text-[#d4af37] mr-3">☏</span>
                +33 1 23 45 67 89
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Luxe Parfum. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
