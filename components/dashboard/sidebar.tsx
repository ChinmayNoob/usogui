"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart2, CreditCard, Layout, Settings, Users } from "lucide-react";
import { motion } from "motion/react";

export default function DashboardSidebar() {
    return (
        <motion.div
            id="sidebar"
            className="w-[300px] border-r border-dashed hidden md:block"
            initial={{ x: -12, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
            <div className="flex flex-col divide-y border-b border-dashed">
                <motion.div className="w-full" whileHover="hover">
                    <Button variant="ghost" className="flex w-full border-dashed h-14 text-left justify-start pl-8" asChild>
                        <Link href="/dashboard" className="flex w-full items-center gap-2">
                            <motion.span variants={{ hover: { x: 6 } }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="flex items-center gap-2">
                                <Layout />
                                <span>Dashboard</span>
                            </motion.span>
                        </Link>
                    </Button>
                </motion.div>
                <motion.div className="w-full" whileHover="hover">
                    <Button variant="ghost" className="flex w-full border-dashed h-14 text-left justify-start pl-8" asChild>
                        <Link href="/settings" className="flex w-full items-center gap-2">
                            <motion.span variants={{ hover: { x: 6 } }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="flex items-center gap-2">
                                <Settings />
                                <span>Settings</span>
                            </motion.span>
                        </Link>
                    </Button>
                </motion.div>
                <motion.div className="w-full" whileHover="hover">
                    <Button variant="ghost" className="flex w-full border-dashed h-14 text-left justify-start pl-8" asChild>
                        <Link href="/analytics" className="flex w-full items-center gap-2">
                            <motion.span variants={{ hover: { x: 6 } }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="flex items-center gap-2">
                                <BarChart2 />
                                <span>Analytics</span>
                            </motion.span>
                        </Link>
                    </Button>
                </motion.div>
                <motion.div className="w-full" whileHover="hover">
                    <Button variant="ghost" className="flex w-full border-dashed h-14 text-left justify-start pl-8" asChild>
                        <Link href="/users" className="flex w-full items-center gap-2">
                            <motion.span variants={{ hover: { x: 6 } }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="flex items-center gap-2">
                                <Users />
                                <span>Users</span>
                            </motion.span>
                        </Link>
                    </Button>
                </motion.div>
                <motion.div className="w-full" whileHover="hover">
                    <Button variant="ghost" className="flex w-full border-dashed h-14 text-left justify-start pl-8" asChild>
                        <Link href="/billing" className="flex w-full items-center gap-2">
                            <motion.span variants={{ hover: { x: 6 } }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="flex items-center gap-2">
                                <CreditCard />
                                <span>Billing</span>
                            </motion.span>
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}


