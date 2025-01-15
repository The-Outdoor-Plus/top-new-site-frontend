import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white py-8">
      {/* Newsletter Section */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          <div className="text-sm font-medium">SIGN UP TO OUR NEWSLETTER FOR UPDATES</div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="border border-gray-300 px-3 py-1 text-sm"
            />
            <button className="bg-[#F97316] text-white px-4 py-1 text-sm hover:bg-[#F97316]/90">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-medium mb-4">About The Outdoor Plus</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/warranty" className="text-blue-600 hover:text-blue-800 text-sm">
                  Warranty Information
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-blue-600 hover:text-blue-800 text-sm">
                  Training With The Outdoor Plus
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-blue-600 hover:text-blue-800 text-sm">
                  Work at The Outdoor Plus
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pdf-catalogs" className="text-blue-600 hover:text-blue-800 text-sm">
                  PDF Catalogs
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-blue-600 hover:text-blue-800 text-sm">
                  Black & White Collection
                </Link>
              </li>
              <li>
                <Link href="/firepits" className="text-blue-600 hover:text-blue-800 text-sm">
                  Fire Pits & Tables
                </Link>
              </li>
              <li>
                <Link href="/bbq" className="text-blue-600 hover:text-blue-800 text-sm">
                  Premium BBQ Grills
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-blue-600 hover:text-blue-800 text-sm">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/inquiry" className="text-blue-600 hover:text-blue-800 text-sm">
                  New Dealer Inquiry
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-blue-600 hover:text-blue-800 text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-blue-600 hover:text-blue-800 text-sm">
                  Quick Reference Installation Guide
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-blue-600 hover:text-blue-800 text-sm">
                  Register Your Product
                </Link>
              </li>
              <li>
                <Link href="/troubleshooting" className="text-blue-600 hover:text-blue-800 text-sm">
                  Troubleshooting Questionnaire
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay in touch Section */}
          <div>
            <h3 className="font-medium mb-4">Stay in touch</h3>
            <p className="text-sm mb-2">701 South Dupont Avenue, Ontario, California 91761</p>
            <p className="text-blue-600 hover:text-blue-800 text-sm mb-4">(909) 460-5579</p>
            <p className="font-medium text-sm mb-2">Open Hours</p>
            <p className="text-sm mb-1">Mon - Fri: 7:00 AM - 5:00 PM PT</p>
            <p className="text-sm">Sat - Sun: CLOSED</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <Link href="/adchoices" className="hover:text-gray-900">AdChoices</Link>
              <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
              <Link href="/google-privacy" className="hover:text-gray-900">Google Privacy Policy</Link>
              <Link href="/google-terms" className="hover:text-gray-900">Google Terms of Service</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="https://facebook.com" className="text-gray-600 hover:text-gray-900">Facebook</Link>
              <Link href="https://instagram.com" className="text-gray-600 hover:text-gray-900">Instagram</Link>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-600">
            2024 The Outdoor Plus Company, Inc. This site is intended for US, Canada and Mexico consumers only.
          </div>
        </div>
      </div>
    </footer>
  );
}