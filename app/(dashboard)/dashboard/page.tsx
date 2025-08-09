"use client";

import { motion } from "motion/react";
import HoverGallery from "@/components/dashboard/hover-gallery";

export default function DashboardPage() {
  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
        <motion.div
          className="mt-10 flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HoverGallery />
        </motion.div>
      </div>
    </div>
  );
}