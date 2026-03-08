import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const CallToAction: React.FC = () => {
  return (
    <section
      id="cta"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-2xl"
        >
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-cyan-50/50 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 md:p-16 text-center">
            {/* Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-sm">
              <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 tracking-tight">
              Bersama Lawan Parkir Liar
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Ribuan masyarakat telah melaporkan praktik parkir liar di
              lingkungan mereka. Bergabunglah sekarang, jadilah bagian dari
              perubahan untuk ketertiban bersama.
            </p>

            {/* Button CTA */}
            <Link to="/user/dashboard">
              <button className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-700/50 hover:-translate-y-0.5">
                <span className="relative">Buat Laporan Sekarang</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>

            <p className="mt-4 text-xs text-gray-400">
              Gratis • Tanpa registrasi rumit • Data aman
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
