"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Icons } from "@/components/shared/icons";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export default function AuthCard({
    title,
    description,
    mode = "sign-in",
}: {
    title: string;
    description: string;
    mode?: "sign-in" | "sign-up";
}) {
    const [githubLoading, setGithubLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const,
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 10
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut" as const,
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="w-full max-w-md"
        >
            <Card className="w-full rounded-none border-dashed overflow-hidden">
                <CardHeader>
                    <motion.div variants={itemVariants}>
                        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <CardDescription className="text-xs md:text-sm">{description}</CardDescription>
                    </motion.div>
                </CardHeader>
                <CardContent>
                    <motion.div className="grid gap-4" variants={itemVariants}>
                        <div className={cn(
                            "w-full gap-2 flex items-center",
                            "justify-between flex-col"
                        )}>
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full"
                            >
                                <SignInButton
                                    title="Sign in with Github"
                                    provider="github"
                                    loading={githubLoading}
                                    setLoading={setGithubLoading}
                                    callbackURL="/dashboard"
                                    icon={<Icons.Github />}
                                />
                            </motion.div>
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full"
                            >
                                <SignInButton
                                    title="Sign in with Google"
                                    provider="google"
                                    loading={googleLoading}
                                    setLoading={setGoogleLoading}
                                    callbackURL="/dashboard"
                                    icon={<Icons.Google />}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-dashed pt-4">
                    <motion.p
                        className="text-sm text-muted-foreground"
                        variants={itemVariants}
                    >
                        {mode === "sign-in" ? (
                            <>
                                Don't have an account?{" "}
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-block"
                                >
                                    <Link href="/sign-up" className="text-primary font-medium hover:underline">
                                        Sign up
                                    </Link>
                                </motion.span>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-block"
                                >
                                    <Link href="/sign-in" className="text-primary font-medium hover:underline">
                                        Sign in
                                    </Link>
                                </motion.span>
                            </>
                        )}
                    </motion.p>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

const SignInButton = ({
    title,
    provider,
    loading,
    setLoading,
    callbackURL,
    icon,
}: {
    title: string;
    provider: "github" | "google" | "discord";
    loading: boolean;
    setLoading: (loading: boolean) => void;
    callbackURL: string;
    icon: React.ReactNode;
}) => {
    const iconVariants = {
        idle: {
            scale: 1,
            rotate: 0
        },
        hover: {
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: {
                rotate: {
                    duration: 0.4,
                    ease: "easeInOut" as const,
                },
                scale: {
                    duration: 0.2,
                    ease: "easeOut" as const,
                }
            }
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 }
        }
    };

    const textVariants = {
        idle: { x: 0 },
        hover: {
            x: 2,
            transition: {
                duration: 0.2,
                ease: "easeOut" as const,
            }
        }
    };

    return (
        <motion.div
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            className="w-full"
        >
            <Button
                variant="outline"
                size="lg"
                className={cn("w-full gap-2 border-dashed relative overflow-hidden")}
                disabled={loading}
                onClick={async () => {
                    await signIn.social(
                        {
                            provider: provider,
                            callbackURL: callbackURL
                        },
                        {
                            onRequest: (ctx) => {
                                setLoading(true);
                            },
                        },
                    );
                }}
            >
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Loader2 className="w-4 h-4 animate-spin" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="icon"
                            variants={iconVariants}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            {icon}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.span variants={textVariants}>
                    {title}
                </motion.span>

                {/* Subtle background shine effect on hover */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                    variants={{
                        idle: { translateX: '-100%' },
                        hover: {
                            translateX: '100%',
                            transition: {
                                duration: 0.6,
                                ease: "easeInOut" as const,
                            }
                        }
                    }}
                />
            </Button>
        </motion.div>
    )
}
