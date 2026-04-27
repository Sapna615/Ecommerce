import { Facebook, Instagram, Twitter, Youtube, CreditCard, Smartphone } from "lucide-react";

function ShoppingFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/shop/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              {/* <li>
                <a href="/shop/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li> */}
              <li>
                <a href="/shop/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="/shop/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/shop/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/shop/returns" className="text-gray-300 hover:text-white transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="/shop/shipping" className="text-gray-300 hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a href="/shop/mens" className="text-gray-300 hover:text-white transition-colors">
                  Men
                </a>
              </li>
              <li>
                <a href="/shop/womens" className="text-gray-300 hover:text-white transition-colors">
                  Women
                </a>
              </li>
              <li>
                <a href="/shop/kids" className="text-gray-300 hover:text-white transition-colors">
                  Kids
                </a>
              </li>
              {/* <li>
                <a href="/shop/hoodies" className="text-gray-300 hover:text-white transition-colors">
                  Hoodies
                </a>
              </li> */}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow StyleTee Hub on Facebook">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow StyleTee Hub on Instagram">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow StyleTee Hub on Twitter">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <CreditCard className="w-8 h-5 text-gray-400" />
              <Smartphone className="w-8 h-5 text-gray-400" />
              <span className="text-gray-400 text-sm ml-2">Visa, UPI & more</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2026 YourStore. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;
