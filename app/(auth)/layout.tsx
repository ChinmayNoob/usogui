import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between h-screen">
            <div className="hidden lg:block lg:w-1/2 h-full bg-black relative">
                <Image
                    src="/sung.png"
                    alt="auth-bg"
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority
                />
            </div>
            <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-2 md:px-0">
                {children}
            </div>
        </div>
    )
}