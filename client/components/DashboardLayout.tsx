import TopNav from "./TopNav";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full max-w-full overflow-hidden">
      <TopNav />
      <div className="flex flex-1 overflow-hidden w-full max-w-full">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto overflow-x-hidden w-full max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
