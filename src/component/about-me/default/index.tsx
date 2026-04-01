import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Shield,
  Eye,
  Heart,
  MapPin,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutMe: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: "Transparan",
      description:
        "Setiap laporan dapat dipantau statusnya secara real-time, memberikan kejelasan bagi masyarakat.",
    },
    {
      icon: Users,
      title: "Partisipatif",
      description:
        "Melibatkan peran aktif masyarakat untuk bersama-sama menciptakan ketertiban lalu lintas.",
    },
    {
      icon: Heart,
      title: "Gratis & Anonim",
      description:
        "Layanan 100% gratis tanpa biaya, dan identitas pelapor dapat dirahasiakan.",
    },
    {
      icon: Eye,
      title: "Terintegrasi",
      description:
        "Data langsung terhubung dengan Dinas Perhubungan untuk tindak lanjut yang cepat.",
    },
  ];

  return (
    <section className="relative min-h-screen py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white to-white">
      {/* Background efek dengan tema kuning */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-100/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-yellow-100/90 to-yellow-50 border border-yellow-200/50 shadow-sm mb-8"
            >
              <Users className="w-4 h-4 text-amber-800" />
              <span className="text-sm font-semibold text-black">
                Tentang Kami
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-gray-900">
              Bersama Wujudkan{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-yellow-500">
                Ketertiban Lalu Lintas
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Kami adalah platform partisipasi masyarakat yang memudahkan
              pelaporan parkir liar. Dengan teknologi sederhana dan integrasi
              pemerintah, kami ingin menciptakan ruang publik yang lebih tertib
              dan nyaman.
            </p>
          </motion.div>

          {/* Misi & Visi */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-amber-600" />
                <h2 className="text-2xl font-bold text-gray-800">Misi Kami</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-amber-600">•</span>
                  Menyediakan sarana pelaporan parkir liar yang mudah dan
                  transparan.
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600">•</span>
                  Mempercepat respons Dinas Perhubungan terhadap pelanggaran
                  parkir.
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600">•</span>
                  Meningkatkan kesadaran masyarakat akan pentingnya ketertiban
                  lalu lintas.
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600">•</span>
                  Mendorong kolaborasi antara masyarakat dan pemerintah daerah.
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-amber-600" />
                <h2 className="text-2xl font-bold text-gray-800">Visi Kami</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Menjadi platform partisipasi masyarakat terdepan yang membantu
                menciptakan kawasan perkotaan bebas parkir liar, sehingga ruang
                publik lebih aman, nyaman, dan tertib bagi semua.
              </p>
            </motion.div>
          </div>

          {/* Nilai-Nilai */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              Nilai-Nilai Kami
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-amber-100 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-linear-to-r from-amber-100 to-yellow-100 flex items-center justify-center">
                      <value.icon className="w-7 h-7 text-amber-700" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
