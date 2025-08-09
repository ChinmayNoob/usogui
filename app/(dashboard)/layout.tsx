import DashboardNavbar from "@/components/dashboard/navbar";
import DashboardSidebar from "@/components/dashboard/sidebar";
import PageTransition from "@/components/dashboard/page-transition";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full h-screen overflow-hidden flex flex-col">
            <DashboardNavbar />
            <div className="flex h-full">
                <DashboardSidebar />
                <div id="main" className="flex-1 overflow-y-auto">
                    <PageTransition>{children}</PageTransition>
                </div>
            </div>
        </div>
    )
}