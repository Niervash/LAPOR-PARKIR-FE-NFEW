// AuthLayout.tsx
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background Image dengan efek blur */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
          alt="Parking background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      {/* Konten */}
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
