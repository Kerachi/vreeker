import CustomerTopBar from "./CustomerTopBar";

interface CustomerPortalLayoutProps {
  clientName: string;
  children: React.ReactNode;
}

export default function CustomerPortalLayout({
  clientName,
  children,
}: CustomerPortalLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <CustomerTopBar clientName={clientName} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
