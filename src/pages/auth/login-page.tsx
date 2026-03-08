import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../layout/auth";
import { AuthLogin } from "../../services/auth.service";
import SignIn from "../../component/login/default";
import { getAuth } from "../../utils/cookies.storage"; // jika perlu

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const result = await AuthLogin({ email, password });

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    toast.success("Login berhasil! Mengalihkan...", {
      duration: 3000,
      position: "top-right",
    });

    // Ambil role dari response atau dari cookie
    const role = result.data?.role; // sesuaikan dengan struktur response
    // Atau bisa juga:
    // const auth = getAuth();
    // const role = auth.role;

    if (role === "admin") {
      navigate("/admin/dashboard/"); // sesuai permintaan
    } else {
      navigate("/user/dashboard");
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
      <SignIn onLogin={handleLogin} loading={loading} error={error} />
    </AuthLayout>
  );
};

export default LoginPage;
