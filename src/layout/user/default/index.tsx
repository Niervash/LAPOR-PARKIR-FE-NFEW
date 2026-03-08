import React from "react";
import { MainFooter, MainNavbar } from "../../../component";

interface props {
  children: any;
}

const UserLayout: React.FC<props> = ({ children }) => {
  return (
    <div>
      <MainNavbar />
      <section className="relative min-h-screen hero-gradient overflow-hidden ">
        {children}
      </section>
      <MainFooter />
    </div>
  );
};

export default UserLayout;
