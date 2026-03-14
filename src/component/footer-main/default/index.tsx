import React from "react";
import { Shield, ChevronUp } from "lucide-react";

const MainFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "#fitur", label: "Fitur" },
    { href: "#cara-kerja", label: "Cara Kerja" },
    { href: "#tentang", label: "Tentang" },
    { href: "#kontak", label: "Kontak" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-yellow-100 pt-12 pb-6 relative shadow-amber-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Shield className="h-7 w-7 text-amber-600" />
              <span className="text-gray-900">Lapor Parkir</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Platform partisipasi masyarakat untuk melaporkan parkir liar.
              Bersama kita ciptakan ketertiban dan keamanan bersama.
            </p>
          </div>

          {/* Navigasi Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900">
              Navigasi
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-amber-600 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} Lapor Parkir. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <a
              href="#privacy"
              className="hover:text-amber-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-amber-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 -top-4 bg-amber-600 text-white p-2 rounded-full shadow-lg hover:bg-amber-700 hover:scale-110 transition-all duration-300"
        aria-label="Kembali ke atas"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default MainFooter;
