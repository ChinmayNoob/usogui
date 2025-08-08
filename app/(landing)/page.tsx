"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/shared/user-profile";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { PanelsTopLeft, Shield, Database, Server, Component, Code, ArrowRight, Sparkle, Github, Copy, Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import ThemeToggler from "@/context/theme-toggle";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export default function Home() {
    const [copied, setCopied] = useState(false);
    const { data: session, isPending } = useSession();

    const containerVariants = {
        hidden: { opacity: 0, y: 16, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" as const, staggerChildren: 0.08 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`git clone ${siteConfig.socials.github}`);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <div className="w-full h-auto md:h-screen overflow-y-auto md:overflow-hidden flex flex-col items-center justify-center relative">
            {/* subtle background gradients */}
            <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
                <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_0%_0%,hsl(var(--primary)/0.07),transparent_60%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_100%_20%,hsl(var(--muted-foreground)/0.08),transparent_60%)]"></div>
            </div>
            <motion.div
                className="w-full max-w-7xl mx-auto border border-dashed flex flex-col my-2"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="w-full flex justify-between divide-x">
                    <motion.div
                        variants={itemVariants}
                        className="relative hidden md:flex w-1/3 aspect-square bg-black items-center justify-center group/titan border-dashed overflow-hidden"
                        animate={{ y: [0, -1, 0] }}
                        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        whileHover={{ scale: 1.01 }}
                    >
                        <Image src="/sung.png" alt="usogui" fill className="object-cover z-0" />
                        <div className="pointer-events-none z-10 absolute top-0 left-0 size-4 border-t-2 border-l-2 border-white opacity-0 group-hover/titan:opacity-100 transition-opacity duration-200"></div>
                        <div className="pointer-events-none z-10 absolute top-0 right-0 size-4 border-t-2 border-r-2 border-white opacity-0 group-hover/titan:opacity-100 transition-opacity duration-200"></div>
                        <div className="pointer-events-none z-10 absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-white opacity-0 group-hover/titan:opacity-100 transition-opacity duration-200"></div>
                        <div className="pointer-events-none z-10 absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-white opacity-0 group-hover/titan:opacity-100 transition-opacity duration-200"></div>
                    </motion.div>
                    <div className="flex-1 flex flex-col">
                        <motion.div id="nav" className="w-full flex items-center justify-end border-b border-dashed divide-x" variants={itemVariants}>
                            <motion.div id="brand" className="font-mono text-sm flex-1 flex items-center h-full px-3 border-dashed" variants={itemVariants}>
                                <Link href="/" className="hover:underline">{siteConfig.origin.replace("https://", "")}</Link>
                            </motion.div>
                            {!isPending && (session ? (
                                <Button className="h-full border-dashed hover:bg-accent" size="lg" variant="ghost" asChild>
                                    <Link href="/dashboard" className="flex items-center gap-2 group/nav">
                                        <span>Dashboard</span>
                                        <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
                                            <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
                                            <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
                                        </div>
                                    </Link>
                                </Button>
                            ) : (
                                <Button className="h-full border-dashed hover:bg-accent" size="lg" variant="ghost" asChild>
                                    <Link href="/sign-in" className="flex items-center gap-2 group/nav">
                                        <span>Sign In</span>
                                        <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
                                            <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
                                            <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
                                        </div>
                                    </Link>
                                </Button>
                            ))}
                            <motion.div variants={itemVariants}>
                                <UserProfile className="border-dashed size-10 md:size-14" />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <ThemeToggler className="border-dashed size-10 md:size-14" />
                            </motion.div>
                        </motion.div>
                        <motion.div id="hero" className="flex flex-col p-4" variants={itemVariants}>
                            <motion.h1 className="head-text-md bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent" variants={itemVariants}>Usogui</motion.h1>
                            <motion.div className="h-px w-24 origin-left bg-gradient-to-r from-primary/60 to-transparent mt-2"
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                            <motion.p className="text-muted-foreground max-w-3xl" variants={itemVariants}>{siteConfig.description}</motion.p>
                        </motion.div>
                        <motion.div id="code" className="flex flex-col p-4" variants={itemVariants}>
                            <motion.div className="p-2 border border-dashed hover:border-primary/50 bg-card text-xs md:text-sm flex items-center justify-between transition-all duration-200 delay-75" variants={itemVariants}>
                                <pre className="font-mono bg-linear-to-r from-muted-foreground to-foreground bg-clip-text text-transparent">
                                    git clone {siteConfig.socials.github}
                                </pre>
                                <Button variant="ghost" size="icon" className="size-5 cursor-pointer group/copy" onClick={handleCopy}>
                                    <AnimatePresence mode="wait">
                                        {copied ? (
                                            <motion.div
                                                key="check"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                <Check className="size-3" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="copy"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                <Copy className="size-3 group-hover/copy:text-foreground" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </motion.div>
                        </motion.div>
                        <motion.div id="cta" className="flex items-center gap-4 p-4" variants={itemVariants}>
                            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button variant="outline" asChild className="relative border-dashed overflow-hidden">
                                    <a href={siteConfig.socials.github} target="_blank" className="gap-2 group">
                                        <div className="w-full h-[1px] bg-linear-to-r from-primary/0 via-primary to-primary/0 absolute top-0 -left-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                        <Github className="size-4" />
                                        <span>GitHub</span>
                                    </a>
                                </Button>
                            </motion.div>
                            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button asChild className="relative overflow-hidden">
                                    <Link href="/dashboard" className="gap-2 group">
                                        <span>Get started</span>
                                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-all duration-150" />
                                        <motion.span
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                            whileHover={{ translateX: "100%" }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                        />
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
                <motion.div id="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-dashed" variants={itemVariants}>
                    {techConfig.map((tech, index) => (
                        <motion.a
                            key={index}
                            href={tech.link}
                            target="_blank"
                            className={cn(
                                "relative w-full p-6 hover:bg-muted/50 transition-all duration-150 group/item border-dashed",
                                {
                                    "border-b": index < techConfig.length - 1,
                                    "md:border-b-0": index >= techConfig.length - 2,
                                    "md:border-b": index < techConfig.length - 2,
                                    "lg:border-b-0": index >= techConfig.length - 3,
                                    "lg:border-b": index < techConfig.length - 3,
                                },
                                {
                                    "md:border-r": index % 2 === 0 && index !== techConfig.length - 1,
                                    "lg:border-r": index % 3 !== 2 && index !== techConfig.length - 1,
                                }
                            )}
                            variants={itemVariants}
                            whileHover={{ y: -2, scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/item:opacity-100 bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-200" />
                            {(index === 0 || index === techConfig.length - 1) && (
                                <Sparkle className={cn("absolute w-4 h-4 z-10 fill-current hidden md:block", {
                                    "-bottom-2 -right-2": index === 0,
                                    "-top-2 -left-2": index === techConfig.length - 1,
                                })} />
                            )}
                            <div className="flex items-center justify-between gap-2 mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="group-hover/item:animate-pulse">{tech.icon}</span>
                                    <h3 className="text-zinc-500 dark:text-zinc-400 text-base font-semibold">{tech.category}</h3>
                                </div>
                                <ArrowRight className="size-4 opacity-0 scale-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:-translate-x-0 group-hover/item:scale-100 transition-all duration-150" />
                            </div>
                            <h1 className="text-xl font-semibold font-heading tracking-tight mb-2">{tech.name}</h1>
                            <p className="text-sm text-muted-foreground">
                                {tech.description}
                            </p>
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}

const techConfig = [
    {
        icon: <PanelsTopLeft className="size-4" />,
        category: "Full-stack Framework",
        name: "Next.js 15",
        description: "Modern, full-stack React framework for building web applications.",
        link: "https://nextjs.org"
    },
    {
        icon: <Shield className="size-4" />,
        category: "Authentication",
        name: "Better-Auth",
        description: "Secure authentication solution with OAuth, email/password, magic links, and more",
        link: "https://better-auth.com"
    },
    {
        icon: <Database className="size-4" />,
        category: "ORM",
        name: "Drizzle ORM",
        description: "TypeScript ORM with a focus on type safety and developer experience.",
        link: "https://orm.drizzle.team/"
    },
    {
        icon: <Server className="size-4" />,
        category: "Database",
        name: "Postgres",
        description: "It's a Postgres database, what else do you need?",
        link: "https://neon.tech"
    },
    {
        icon: <Component className="size-4" />,
        category: "UI Components",
        name: "ShadCN/UI",
        description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
        link: "https://ui.shadcn.com"
    },
    {
        icon: <Code className="size-4" />,
        category: "CSS Framework",
        name: "Tailwindcss v4",
        description: "Utility-first CSS framework for rapidly building custom user interfaces.",
        link: "https://tailwindcss.com"
    },
];
