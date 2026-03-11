import React from "react";
import { motion } from "framer-motion";

interface CardWrapperProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  title,
  icon: Icon,
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="overflow-hidden rounded-2xl "
  >
    <div className="bg-white flex items-center gap-2.5  px-5 py-4">
      <div className="bg-white rounded-lg p-1.5">
        <div className="p-1.5 rounded-lg bg-sky-100">
          {" "}
          <Icon className="h-3.5 w-3.5 text-sky-600" />
        </div>
      </div>
      <h3 className="text-sm font-semibold text-black bg-white">{title}</h3>
    </div>
    <div className=" text-black">{children}</div>
  </motion.div>
);

export default CardWrapper;
