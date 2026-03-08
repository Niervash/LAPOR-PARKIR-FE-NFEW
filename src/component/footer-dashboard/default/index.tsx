import React from "react";
import { Shield } from "lucide-react";

const FooterDashboard: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <Shield className="h-4 w-4 text-[#355872]" />
          <span>© {currentYear} ParkWatch. All rights reserved.</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#355872] transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#355872] transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-[#355872] transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterDashboard;
