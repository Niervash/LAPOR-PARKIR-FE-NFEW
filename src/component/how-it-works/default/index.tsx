import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  LogIn,
  LayoutDashboard,
  FileText,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Daftar Akun",
      description:
        "Jika belum punya akun, daftar terlebih dahulu dengan email dan kata sandi. Gratis dan mudah.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: LogIn,
      title: "Login ke Akun",
      description:
        "Sudah punya akun? Login dengan kredensial Anda untuk mengakses dashboard pelaporan.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      description:
        "Setelah login, Anda akan diarahkan ke dashboard. Di sini Anda dapat melihat laporan Anda dan membuat laporan baru.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FileText,
      title: "Isi Form Laporan",
      description:
        "Klik tombol 'Buat Laporan'. Pilih jenis temuan: Juru Parkir Liar atau Kendaraan Parkir Sembarangan. Lengkapi detail lokasi, foto, dan deskripsi.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Send,
      title: "Kirim Laporan",
      description:
        "Laporan akan langsung terkirim ke Dinas Perhubungan. Anda akan mendapatkan notifikasi status tindak lanjut.",
      color: "from-amber-500 to-yellow-500",
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
              <CheckCircle2 className="w-4 h-4 text-amber-800" />
              <span className="text-sm font-semibold text-black">
                Mudah, Cepat, Transparan
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-gray-900">
              Cara Kerja{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-yellow-500">
                Aplikasi
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Laporkan parkir liar dalam 5 langkah mudah. Mulai dari daftar akun
              hingga laporan Anda ditindaklanjuti oleh Dinas Perhubungan.
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 h-full">
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-linear-to-r from-amber-600 to-yellow-500 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                    {index + 1}
                  </div>
                  <div
                    className={`w-16 h-16 rounded-xl bg-linear-to-r ${step.color} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform`}
                  >
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA untuk mulai menggunakan */}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
