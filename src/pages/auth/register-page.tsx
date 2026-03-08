// RegisterPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../layout/auth";
import { Register } from "../../component";
import { AuthRegister } from "../../services/auth.service";

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data: {
    nama: string;
    email: string;
    jenis_kelamin: string;
    username: string;
    password: string;
    foto_profil?: string;
  }) => {
    setLoading(true);
    try {
      await AuthRegister(data);
      toast.success("Registrasi berhasil! Silakan login.");
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(error.message || "Registrasi gagal, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Register onSubmit={handleRegister} loading={loading} />
    </AuthLayout>
  );
};

export default RegisterPage;
