import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOneDriveLink } from "@/hooks/useOneDriveLink";

export default function Index() {
  const { link: oneDriveLink, isLoading: isOneDriveLoading, error: oneDriveError } = useOneDriveLink();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    document.title = "Planning - Vreeker BV";
  }, []);

  const handleSendPlanning = async () => {
    setIsSending(true);
    try {
      console.log("Sending planning...");
      // Try calling the direct Netlify function path
      const response = await fetch("/.netlify/functions/send-planning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch(err => {
        console.error("Fetch error:", err);
        throw new Error(`Network error: ${err.message}`);
      });

      console.log("Response status:", response.status);
      const data = await response.json().catch(() => ({}));
      console.log("Response data:", data);
      
      if (response.ok) {
        toast({
          title: "Succes",
          description:
            "De planning wordt nu automatisch via e-mail en WhatsApp verstuurd.",
          variant: "default",
        });
      } else {
        const errorMsg = data.message || data.error || data.detail || `Server returned ${response.status}`;
        throw new Error(errorMsg);
      }
    } catch (error: any) {
      console.error("HandleSendPlanning Error:", error);
      toast({
        title: "Versturen mislukt",
        description: error.message || "Onbekende fout bij het versturen.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
        <div>
          <button
            onClick={handleSendPlanning}
            disabled={isSending}
            className="inline-flex flex-row items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg border border-blue-700 transition-colors cursor-pointer px-6 py-3"
          >
            <Send className="w-5 h-5" />
            <span className="text-sm font-medium">
              {isSending ? "Verzenden..." : "Verstuur planning"}
            </span>
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center">
          {isOneDriveLoading ? (
            <div className="flex flex-col items-center justify-center h-[500px] w-full bg-gray-50 rounded-lg border border-gray-200">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
              <p className="text-gray-500">OneDrive rooster laden...</p>
            </div>
          ) : oneDriveLink ? (
            <iframe
              src={oneDriveLink}
              width="1206"
              height="692"
              frameBorder="0"
              scrolling="no"
              className="w-full max-w-full rounded-lg shadow-sm border border-gray-200"
              title="OneDrive Rooster"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] w-full bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500 mb-2">
                {oneDriveError || "Geen OneDrive link gevonden."}
              </p>
              <p className="text-sm text-gray-400">
                Controleer de 'sharliink' tabel in Airtable.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
