"use client";

import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  className?: string;
}

export default ({ open, onClose, children, title, className }: Props) => {

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.45))]"
            />

            <motion.div
              initial={{ scale: 0.8, transition: { type: "spring", visualDuration: 0.3, bounce: 0.3 } }}
              animate={{ scale: 1, transition: { type: "spring", visualDuration: 0.3, bounce: 0.3 } }}
              exit={{ scale: 0.8, opacity: 0, transition: { type: "spring", visualDuration: 0.3, bounce: 0.3 } }}
              className={`overflow-hidden absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-2xl border border-[#e5e7eb] w-[95%] sm:w-[640px] ${className}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-800">{title}</h3>

                <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer">
                  <IoClose className="text-lg text-gray-400" />
                </button>
              </div>

              <div className="mt-2">
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}