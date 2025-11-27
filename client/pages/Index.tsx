import DashboardLayout from "@/components/DashboardLayout";
import ClockinOverview from "@/components/ClockinOverview";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    document.title = "Portaal - Vreeker BV";
  }, []);

  const handleSendPlanning = async () => {
    setIsSending(true);
    try {
      const response = await fetch("/api/send-planning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Succes",
          description:
            "De planning wordt nu automatisch via e-mail en WhatsApp verstuurd.",
          variant: "default",
        });
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      toast({
        title: "Fout",
        description:
          "Er ging iets mis bij het versturen van de planning. Probeer het later opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
        <div className="max-w-md">
          <button
            onClick={handleSendPlanning}
            disabled={isSending}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg border border-blue-700 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            {isSending ? "Verzenden..." : "Verstuur planning"}
          </button>
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all p-6">
            <iframe
              className="airtable-embed"
              src="https://airtable.com/embed/appHSB36SlsZqJkAi/shrLMiWPAicxPzSdM"
              frameBorder="0"
              width="100%"
              height="533"
              style={{
                background: "white",
                borderRadius: "12px",
                border: "1px solid #eee",
              }}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
