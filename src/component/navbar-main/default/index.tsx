import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Menu,
  X,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetItem, setLogout } from "../../../utils/cookies.storage";
import { ILoveparkir } from "../../../assets";

const MainNavbar: React.FC = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { Tokens, role } = GetItem();
    setIsLoggedIn(!!Tokens);
    setRole(role);
  }, []);

  const toggleMenu = () => setMobileNav(!mobileNav);
  const closeMenu = () => setMobileNav(false);

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

  const getDashboardPath = () => {
    if (role === "admin") return "/admin/dashboard";
    return "/user/dashboard";
  };

  const handleLogout = () => {
    setLogout(); // hapus token dan role dari cookies/storage
    setIsLoggedIn(false);
    setRole(null);
    navigate("/"); // redirect ke home
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 pt-4">
        <div className="flex items-center justify-between h-14 px-5 rounded-2xl bg-amber-300/20 backdrop-blur-xl shadow-2xl shadow-yellow-600/20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-yellow-700 font-bold text-lg tracking-tight"
            onClick={closeMenu}
          >
            <div className="w-7 h-7 bg-white/30 rounded-lg flex items-center justify-center">
              <img src={ILoveparkir} alt="logo" className="w-5 h-5" />
            </div>
            Lapor Parkir
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 font-medium ${
                  isActive(link.href)
                    ? "text-amber-800 bg-amber-400/30"
                    : "text-gray-700 hover:text-amber-700 hover:bg-amber-400/30"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  to={getDashboardPath()}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition shadow-sm"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-200 text-gray-700 text-sm font-semibold hover:bg-amber-300 transition shadow-sm"
                >
                  <LogOut className="h-4 w-4" />
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="px-4 py-1.5 rounded-lg text-gray-700 text-sm font-medium hover:text-amber-700 hover:bg-amber-400/30 transition"
                >
                  Masuk
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-1.5 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition shadow-sm shadow-yellow-600/40"
                >
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-amber-700 p-1"
            aria-label="Toggle menu"
          >
            {mobileNav ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileNav && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mt-2 p-4 rounded-2xl bg-amber-500/90 backdrop-blur-xl border border-amber-300/30 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`px-3 py-2.5 text-sm font-medium rounded-xl transition ${
                    isActive(link.href)
                      ? "text-amber-900 bg-amber-300/50"
                      : "text-white hover:text-amber-900 hover:bg-amber-300/50"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-amber-300/30">
              {isLoggedIn ? (
                <>
                  <Link
                    to={getDashboardPath()}
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-amber-600 text-sm font-semibold"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white text-white text-sm font-medium hover:bg-amber-400/30"
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/auth/login"
                    onClick={closeMenu}
                    className="flex-1 text-center px-4 py-2.5 rounded-xl border border-amber-300/50 text-white text-sm font-medium hover:bg-amber-400/30"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={closeMenu}
                    className="flex-1 text-center px-4 py-2.5 rounded-xl bg-white text-amber-600 text-sm font-semibold hover:bg-amber-50"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MainNavbar;
