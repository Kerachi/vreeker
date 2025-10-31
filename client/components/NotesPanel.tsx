import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Note {
  id: string;
  text: string;
  date: string;
  priority: "high" | "normal" | "low";
}

const priorityConfig = {
  high: "border-l-4 border-l-red-500 bg-red-50",
  normal: "border-l-4 border-l-green-500 bg-green-50",
  low: "border-l-4 border-l-gray-400 bg-gray-50",
};

export default function NotesPanel() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      text: "Controleer grasmaaier inspectie voor volgende week",
      date: "vandaag",
      priority: "high",
    },
    {
      id: "2",
      text: "Bel klant over budget verhoging project uitvoerig",
      date: "gisteren",
      priority: "high",
    },
    {
      id: "3",
      text: "Planten bestellen voor achtertuinproject",
      date: "2 dagen geleden",
      priority: "normal",
    },
  ]);

  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([
        {
          id: Date.now().toString(),
          text: newNote,
          date: "vandaag",
          priority: "normal",
        },
        ...notes,
      ]);
      setNewNote("");
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Notities & updates</h2>

      <div className="mb-4 space-y-2">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Voeg een notitie toe..."
          className="resize-none h-20"
        />
        <Button
          onClick={addNote}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Toevoegen
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {notes.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">
            Geen notities. Voeg er een toe om te beginnen!
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 rounded-lg ${priorityConfig[note.priority]} transition-all hover:shadow-sm`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{note.text}</p>
                  <p className="text-xs text-gray-600 mt-2">{note.date}</p>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="flex-shrink-0 p-1 hover:bg-white/50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
