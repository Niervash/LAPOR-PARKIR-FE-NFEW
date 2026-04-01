import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-white overflow-hidden">
      {/* Background efek dengan tema kuning */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-100/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge / Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-yellow-100/90 to-yellow-50 border border-yellow-200/50 shadow-sm mb-8"
          >
            <AlertTriangle className="w-4 h-4 text-amber-800" />
            <span className="text-sm font-semibold text-black">
              Halaman Tidak Ditemukan
            </span>
          </motion.div>

          {/* 404 Heading */}
          <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-extrabold mb-4 tracking-tighter text-gray-900">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-yellow-500">
              404
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            Oops! Halaman tidak tersedia
          </p>

          <p className="text-lg text-gray-600 max-w-md mx-auto mb-10 px-4">
            Halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau
            tidak pernah ada.
          </p>

          {/* CTA Button */}
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="group inline-flex items-center justify-center gap-3 bg-linear-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-xl shadow-amber-500/30 hover:shadow-amber-600/40"
            >
              <Home className="w-5 h-5" />
              Kembali ke Beranda
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
