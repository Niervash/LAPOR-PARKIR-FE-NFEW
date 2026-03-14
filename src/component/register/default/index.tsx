import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Camera, User, Mail, Lock } from "lucide-react";
import { Input, Select, Form } from "antd";
import { ILoveparkir } from "../../../assets";

const { Option } = Select;

interface RegisterProps {
  onSubmit: (data: {
    nama: string;
    email: string;
    jenis_kelamin: string;
    username: string;
    password: string;
    foto_profil?: string;
  }) => Promise<void>;
  loading: boolean;
}

const Register: React.FC<RegisterProps> = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = async (values: any) => {
    await onSubmit({
      nama: values.nama,
      email: values.email,
      jenis_kelamin: values.jenis_kelamin,
      username: values.username,
      password: values.password,
      foto_profil: previewUrl || undefined,
    });
  };

  return (
    <>
      {/* Header with logo */}
      <div className="text-center mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white font-bold text-2xl drop-shadow-lg"
        >
          <div className=" bg-white rounded-xl p-2 mr-2">
            <img src={ILoveparkir} alt="logo" className="w-10 h-10 " />
          </div>
          <span>Lapor Parkir</span>
        </Link>
      </div>

      {/* Register Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-500 hover:text-amber-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">Kembali</span>
        </Link>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Daftar Akun</h2>
        <p className="text-sm text-gray-600 mb-6">
          Isi data diri Anda untuk bergabung
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          requiredMark={false}
          size="large"
        >
          {/* Nama Lengkap */}
          <Form.Item
            name="nama"
            label={
              <span className="text-sm font-medium text-gray-700">
                Nama Lengkap <span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: "Nama lengkap wajib diisi" }]}
          >
            <Input
              placeholder="John Doe"
              prefix={<User className="text-gray-400" />}
              className="rounded-lg border-gray-300 hover:border-amber-400 focus:border-amber-500 focus:ring-amber-500 shadow-sm"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label={
              <span className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </span>
            }
            rules={[
              { required: true, message: "Email wajib diisi" },
              { type: "email", message: "Email tidak valid" },
            ]}
          >
            <Input
              placeholder="nama@email.com"
              prefix={<Mail className="text-gray-400" />}
              className="rounded-lg border-gray-300 hover:border-amber-400 focus:border-amber-500 focus:ring-amber-500 shadow-sm"
            />
          </Form.Item>

          {/* Jenis Kelamin */}
          <Form.Item
            name="jenis_kelamin"
            label={
              <span className="text-sm font-medium text-gray-700">
                Jenis Kelamin <span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: "Pilih jenis kelamin" }]}
          >
            <Select
              placeholder="Pilih jenis kelamin"
              className="w-full rounded-lg"
              popupClassName="rounded-lg"
            >
              <Option value="Pria">Pria</Option>
              <Option value="Wanita">Wanita</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          {/* Username */}
          <Form.Item
            name="username"
            label={
              <span className="text-sm font-medium text-gray-700">
                Username <span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: "Username wajib diisi" }]}
          >
            <Input
              placeholder="johndoe123"
              prefix={<User className="text-gray-400" />}
              className="rounded-lg border-gray-300 hover:border-amber-400 focus:border-amber-500 focus:ring-amber-500 shadow-sm"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label={
              <span className="text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: "Password wajib diisi" }]}
          >
            <Input.Password
              placeholder="••••••••"
              prefix={<Lock className="text-gray-400" />}
              className="rounded-lg border-gray-300 hover:border-amber-400 focus:border-amber-500 focus:ring-amber-500 shadow-sm"
            />
          </Form.Item>

          {/* Foto Profil (opsional) */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto Profil{" "}
              <span className="text-gray-400 text-xs">(opsional)</span>
            </label>
            <div className="flex items-center gap-4">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProfilePicture(null);
                      setPreviewUrl(null);
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-gray-400" />
                </div>
              )}
              <input
                type="file"
                id="profile-picture"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() =>
                  document.getElementById("profile-picture")?.click()
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:border-amber-300 transition"
              >
                Pilih Foto
              </button>
            </div>
          </div>

          {/* Submit Button (custom, non-antd) */}
          <Form.Item shouldUpdate>
            {() => (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  "Daftar"
                )}
              </button>
            )}
          </Form.Item>
        </Form>

        {/* Link to Login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Sudah punya akun?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-amber-600 hover:text-amber-700 hover:underline transition"
          >
            Masuk
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
