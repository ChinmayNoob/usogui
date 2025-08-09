"use client";

import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

export default function PageTransition({ children }: PropsWithChildren) {
    const pathname = usePathname();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}


