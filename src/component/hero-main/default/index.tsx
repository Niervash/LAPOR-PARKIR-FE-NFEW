import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MapPin,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const MainHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const benefits = [
    "Pantau Status Laporan Real-time",
    "Data Terintegrasi dengan Dinas Perhubungan",
    "100% Gratis & Anonim",
  ];

  const stats = [
    { label: "Laporan Masuk", value: "2.500+", icon: TrendingUp },
    { label: "Area Terpantau", value: "15 Kecamatan", icon: MapPin },
    { label: "Tindak Lanjut", value: "85%", icon: Shield },
    { label: "Respon Rata-rata", value: "< 2 Jam", icon: Clock },
  ];

  return (
    <section className="relative pt-24 lg:pt-32 pb-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-white to-white">
      {/* Background efek dengan tema kuning */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-yellow-100/90 to-yellow-50 border border-yellow-200/50 shadow-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-amber-800" />
              <span className="text-sm font-semibold text-black">
                Sistem Pelaporan Parkir Liar Terintegrasi
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-gray-900">
              Laporkan{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-yellow-500">
                Parkir Liar
              </span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>di Sekitar Anda
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 px-4 leading-relaxed">
              Bantu ciptakan ketertiban di area pertokoan dan perkantoran.
              Laporkan juru parkir liar melalui platform partisipasi masyarakat
              yang cepat, aman, dan transparan.
            </p>

            {/* Benefits List */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-2 text-sm sm:text-base text-gray-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <Link to="/auth/login" className="w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              >
                <div className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-linear-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-xl shadow-amber-500/30 hover:shadow-amber-600/40">
                  Buat Laporan Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>{" "}
            </Link>
          </motion.div>
        </div>

        {/* Hero Image / Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="relative mt-16 mx-auto max-w-6xl"
        >
          {/* Decorative elements dengan tema kuning */}
          <div className="absolute -inset-2 bg-linear-to-r from-amber-500/20 to-yellow-400/20 rounded-3xl blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl" />

          {/* Mockup Container */}
          {/* Tambahkan ilustrasi atau gambar mockup di sini jika diperlukan */}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-amber-800/60 flex justify-center pt-5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 rounded-full bg-amber-800/50"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default MainHero;
