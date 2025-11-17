import { Plus, Trash2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ItemType = "update" | "note";
type Category =
  | "Verkoop"
  | "Werkvoorbereiding"
  | "HR"
  | "Administratie"
  | "Techniek";

interface TeamUpdate {
  id: string;
  type: ItemType;
  category: Category;
  message: string;
  timestamp: string;
  priority?: "high" | "normal" | "low";
  icon?: string;
}

const categoryColors: Record<
  Category,
  { bg: string; text: string; border: string }
> = {
  Verkoop: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  Werkvoorbereiding: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
  },
  HR: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-200",
  },
  Administratie: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-200",
  },
  Techniek: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
  },
};

const priorityIcons = {
  high: "🔴",
  normal: "🟡",
  low: "🔵",
};

const initialUpdates: TeamUpdate[] = [
  {
    id: "1",
    type: "update",
    category: "Verkoop",
    message: "Offerte voor klant De Jong is goedgekeurd.",
    timestamp: "Vandaag 14:30",
    icon: "💬",
  },
  {
    id: "2",
    type: "update",
    category: "Werkvoorbereiding",
    message: "Planning voor project Hoflaan is bijgewerkt.",
    timestamp: "Vandaag 11:15",
    icon: "📅",
  },
  {
    id: "3",
    type: "note",
    category: "Administratie",
    message: "Controleer grasmaaier inspectie voor volgende week",
    timestamp: "vandaag",
    priority: "high",
  },
  {
    id: "4",
    type: "note",
    category: "Werkvoorbereiding",
    message: "Bel klant over budget verhoging project uitvoerig",
    timestamp: "gisteren",
    priority: "high",
  },
  {
    id: "5",
    type: "note",
    category: "HR",
    message: "Planten bestellen voor achtertuinproject",
    timestamp: "2 dagen geleden",
    priority: "normal",
  },
];

export default function TeamUpdates() {
  const [updates, setUpdates] = useState<TeamUpdate[]>(initialUpdates);
  const [newMessage, setNewMessage] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("Werkvoorbereiding");
  const [showForm, setShowForm] = useState(false);

  const handleAddUpdate = () => {
    if (newMessage.trim()) {
      const newUpdate: TeamUpdate = {
        id: Date.now().toString(),
        type: "note",
        category: selectedCategory,
        message: newMessage,
        timestamp: "vandaag",
        priority: "normal",
      };
      setUpdates([newUpdate, ...updates]);
      setNewMessage("");
      setShowForm(false);
    }
  };

  const handleDeleteUpdate = (id: string) => {
    setUpdates(updates.filter((update) => update.id !== id));
  };

  const categories: Category[] = [
    "Verkoop",
    "Werkvoorbereiding",
    "HR",
    "Administratie",
    "Techniek",
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
            <MessageCircle className="w-4 h-4 text-green-600" />
            Teamupdates
          </h2>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 rounded-full border border-blue-200">
            <span className="text-xs font-medium text-blue-700">Blueprint – Visueel voorbeeld</span>
          </div>
        </div>
      </div>

      {/* Category Filter Tags */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {categories.map((category) => {
          const colors = categoryColors[category];
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? `${colors.bg} ${colors.text} border-2 border-current`
                  : `border border-gray-300 text-gray-700 hover:border-gray-400`
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Updates List */}
      <div className="overflow-y-auto space-y-1 mb-2 max-h-[280px]">
        {updates.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-3">
            Geen updates. Voeg er een toe om te beginnen!
          </p>
        ) : (
          updates.map((update) => {
            const colors = categoryColors[update.category];
            const priorityIcon = update.priority
              ? priorityIcons[update.priority]
              : null;

            return (
              <div
                key={update.id}
                className={`rounded-lg p-2 border ${colors.border} bg-gradient-to-r from-white to-gray-50 hover:shadow-sm transition-all`}
              >
                <div className="flex items-start gap-2">
                  {update.icon && (
                    <span className="text-base flex-shrink-0">{update.icon}</span>
                  )}
                  {priorityIcon && (
                    <span
                      className="text-base flex-shrink-0"
                      title={update.priority}
                    >
                      {priorityIcon}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <span
                        className={`inline-flex items-center px-1.5 py-0 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}
                      >
                        {update.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {update.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-gray-900">{update.message}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteUpdate(update.id)}
                    className="flex-shrink-0 p-0.5 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-3 h-3 text-gray-500 hover:text-red-500" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Update Form */}
      {showForm && (
        <div className="mb-2 p-2 bg-green-50 rounded-lg border border-green-200 space-y-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category)}
            className="w-full px-2 py-1 border border-gray-300 rounded-lg text-xs bg-white"
          >
            {Object.keys(categoryColors).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Voeg een update toe..."
            className="resize-none h-16 text-xs"
          />
          <div className="flex gap-1.5">
            <Button
              onClick={handleAddUpdate}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-1"
            >
              Toevoegen
            </Button>
            <Button
              onClick={() => setShowForm(false)}
              variant="outline"
              className="flex-1 text-xs py-1"
            >
              Annuleren
            </Button>
          </div>
        </div>
      )}

      {/* Add Update Button */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium text-xs py-1"
        >
          <Plus className="w-3 h-3 mr-1" />
          Nieuwe update
        </Button>
      )}
    </div>
  );
}
