"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src="/images/grocery-stock-logo.jpg" alt="GroceryStocks Logo" className="h-8 w-8 rounded" />
            <a href="#" className="text-2xl font-bold text-primary">
              GroceryStocks
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a href="#top" className="text-gray-700 hover:text-primary font-medium">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-700 hover:text-primary font-medium">
                  About Us
                </a>
              </li>
              <li>
                <a href="#app" className="text-gray-700 hover:text-primary font-medium">
                  The App
                </a>
              </li>
              <li>
                <a href="#user-guide" className="text-gray-700 hover:text-primary font-medium">
                  User Guide
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-700 hover:text-primary font-medium">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-primary focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="px-4 pt-2 pb-4 space-y-2">
            <li>
              <a
                href="#top"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#app"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                The App
              </a>
            </li>
            <li>
              <a
                href="#user-guide"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                User Guide
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

