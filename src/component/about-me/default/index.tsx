import React from "react";
import { motion } from "framer-motion";
import { User, Target, Eye, Heart, CheckCircle } from "lucide-react";

const AboutMe: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: "Fokus pada Dampak",
      desc: "Setiap laporan adalah langkah menuju perubahan nyata.",
    },
    {
      icon: Eye,
      title: "Transparan",
      desc: "Keterbukaan informasi untuk kepercayaan publik.",
    },
    {
      icon: Heart,
      title: "Peduli Lingkungan",
      desc: "Menciptakan ketertiban demi kenyamanan bersama.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section Kecil */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Tentang{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Saya
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Penggagas platform pelaporan parkir liar yang peduli pada
              ketertiban kota.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profil Singkat */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-sm border border-white/20">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-1 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <User className="w-20 h-20 text-blue-500" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Ahmad Fauzi
                </h2>
                <p className="text-blue-600 font-medium mb-4">
                  Founder & Penggagas ParkirLapor
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Saya memulai inisiatif ini karena melihat banyaknya keluhan
                  masyarakat tentang parkir liar di sekitar pertokoan dan
                  perkantoran. Dengan latar belakang di bidang teknologi dan
                  pemberdayaan masyarakat, saya ingin menciptakan wadah yang
                  memudahkan warga untuk berkontribusi dalam menciptakan
                  ketertiban. Platform ini dikembangkan bersama komunitas dan
                  terbuka untuk masukan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai-nilai Pribadi */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Nilai yang Saya Pegang
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prinsip-prinsip yang menjadi landasan dalam mengembangkan platform
              ini.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pengalaman / Latar Belakang Singkat (opsional) */}
      <section className="py-12 bg-blue-50/50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Latar Belakang
            </h3>
            <p className="text-gray-600 mb-4">
              Sebelumnya saya aktif dalam kegiatan sosial dan pengembangan
              aplikasi berbasis komunitas. Beberapa pencapaian:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  Menginisiasi program "Kampung Tertib Parkir" di 5 kelurahan.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  Bekerja sama dengan Dinas Perhubungan dalam uji coba pelaporan
                  digital.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  Menerima apresiasi dari Walikota atas inovasi partisipasi
                  masyarakat.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
