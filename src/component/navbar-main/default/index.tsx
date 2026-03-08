import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Menu,
  X,
  LogIn,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { GetItem } from "../../../utils/cookies.storage";

const MainNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const { Tokens, role } = GetItem();
    setIsLoggedIn(!!Tokens);
    setRole(role);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { href: "#fitur", label: "Fitur" },
    { href: "#cara-kerja", label: "Cara Kerja" },
    { href: "#tentang", label: "Tentang" },
    { href: "#kontak", label: "Kontak" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return location.hash === href;
    }
    return location.pathname === href;
  };

  // Tentukan path dashboard berdasarkan role
  const getDashboardPath = () => {
    if (role === "admin") return "/admin/dashboard/data";
    // Jika role user atau role lainnya
    return "/user/dashboard";
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight group"
            onClick={closeMenu}
          >
            <Shield className="h-7 w-7 text-blue-600" />
            <span className="text-gray-900">Lapor Parkir</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                } after:absolute after:left-0 after:bottom1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <Link
                to={getDashboardPath()}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  <LogIn className="h-4 w-4" />
                  Masuk
                </Link>
                <Link
                  to="/auth/register"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  <UserPlus className="h-4 w-4" />
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block py-2 text-base ${
                    isActive(link.href)
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-blue-600"
                  } transition-colors duration-200`}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}

              <div className="border-t border-gray-100 my-4"></div>

              <div className="flex flex-col sm:flex-row gap-3">
                {isLoggedIn ? (
                  <Link
                    to={getDashboardPath()}
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      onClick={closeMenu}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 transition-all"
                    >
                      <LogIn className="h-4 w-4" />
                      Masuk
                    </Link>
                    <Link
                      to="/auth/register"
                      onClick={closeMenu}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
                    >
                      <UserPlus className="h-4 w-4" />
                      Daftar
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MainNavbar;
