import DashboardLayout from "@/components/DashboardLayout";
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
        <div>
          <button
            onClick={handleSendPlanning}
            disabled={isSending}
            className="w-40 h-40 inline-flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg border border-blue-700 transition-colors cursor-pointer"
          >
            <Send className="w-6 h-6" />
            <span className="text-sm text-center">
              {isSending ? "Verzenden..." : "Verstuur\nplanning"}
            </span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
