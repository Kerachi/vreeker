import { Send, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  author: string;
  role: string;
  text: string;
  date: string;
  isClient: boolean;
}

interface CommunicationProps {
  projectLeader: string;
  initialMessages: Message[];
}

export default function Communication({
  projectLeader,
  initialMessages,
}: CommunicationProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        author: "Sandra",
        role: "Klant",
        text: newMessage,
        date: "Vandaag",
        isClient: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col h-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Communicatie</h2>

      <div className="flex-1 overflow-y-auto mb-6 space-y-4 max-h-96">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Nog geen berichten. Stuur een bericht naar {projectLeader}.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isClient ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isClient ? "bg-green-100" : "bg-gray-200"
                }`}
              >
                <User
                  className={`w-4 h-4 ${
                    message.isClient ? "text-green-600" : "text-gray-600"
                  }`}
                />
              </div>
              <div className={message.isClient ? "text-right" : ""}>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    {message.author}
                  </p>
                  <p className="text-xs text-gray-500">{message.role}</p>
                  <p className="text-xs text-gray-500">{message.date}</p>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    message.isClient
                      ? "bg-green-100 text-green-900"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Bericht sturen naar {projectLeader}
        </label>
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Typ uw bericht hier..."
            className="resize-none h-16"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-green-600 hover:bg-green-700 text-white h-16 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
