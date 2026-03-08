import React from "react";
import { motion } from "framer-motion";
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
  const benefits = [
    "Laporkan Parkir Liar dalam 1 Menit",
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
    <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Background efek sederhana (tanpa data URI) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-3xl" />

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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 shadow-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">
                Sistem Pelaporan Parkir Liar Terintegrasi
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-gray-900">
              Laporkan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              <Link to="/user/dashboard" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-600/40">
                  Buat Laporan Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link to="/demo" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 border border-gray-200/80 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-gray-200/50">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  Lihat Peta Laporan
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Statistik */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 shadow-sm"
              >
                <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero Image / Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="relative mt-16 mx-auto max-w-6xl"
        >
          {/* Decorative elements */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-3xl blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />

          {/* Mockup Container */}
          <div className="relative rounded-2xl bg-white/10 p-3 ring-1 ring-inset ring-white/30 backdrop-blur-sm shadow-2xl">
            <div className="rounded-xl bg-white shadow-inner overflow-hidden">
              {/* Gambar preview peta dengan titik laporan */}
              <div className="aspect-[16/9] relative bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
                {/* Simulasi peta dengan titik-titik */}
                <div className="absolute inset-0">
                  {/* Grid garis peta sederhana (tanpa data URI) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Marker titik laporan */}
                  <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-yellow-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute top-2/3 left-3/4 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute top-1/4 left-2/3 w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-purple-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                </div>

                {/* Label area */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium shadow-md flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Alfamidi, Jl. Sudirman • 3 laporan</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium shadow-md flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-green-600" />
                  <span>Update 5 menit lalu</span>
                </div>

                {/* Pesan tengah jika gambar tidak muncul */}
                <span className="text-gray-400 text-sm">
                  Peta interaktif akan tampil di sini
                </span>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-sm text-gray-400 mt-4">
            *Peta menunjukkan titik-titik laporan parkir liar di wilayah Jakarta
            Selatan
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MainHero;
