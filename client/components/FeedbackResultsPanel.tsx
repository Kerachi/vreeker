import { Star, TrendingUp } from "lucide-react";

interface FeedbackSuggestion {
  id: string;
  text: string;
  frequency: number;
}

const feedbackData = {
  averageRating: 4.3,
  totalResponses: 12,
  byDepartment: {
    Planning: 4.5,
    Uitvoering: 4.1,
    Administratie: 4.2,
  },
};

const topSuggestions: FeedbackSuggestion[] = [
  {
    id: "1",
    text: "Verbeter de zoekfunctionaliteit in documenten",
    frequency: 5,
  },
  {
    id: "2",
    text: "Voeg meer filtermogelijkheden toe aan projectenstatus",
    frequency: 4,
  },
  {
    id: "3",
    text: "Maak de interface sneller en responsier",
    frequency: 3,
  },
];

export default function FeedbackResultsPanel() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Feedbackresultaten</h2>
        <TrendingUp className="w-5 h-5 text-green-600" />
      </div>

      <div className="space-y-6">
        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Gemiddelde beoordeling</p>
              <p className="text-4xl font-bold text-green-700">
                {feedbackData.averageRating}
                <span className="text-2xl text-gray-600">/5</span>
              </p>
            </div>
            <div className="flex gap-1 ml-auto">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(feedbackData.averageRating)
                      ? "fill-green-500 text-green-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Gebaseerd op {feedbackData.totalResponses} reacties
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Per afdeling</h3>
          <div className="space-y-2">
            {Object.entries(feedbackData.byDepartment).map(([dept, rating]) => (
              <div key={dept} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{dept}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {rating.toFixed(1)}/5
                  </span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${(rating / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Meest voorkomende suggesties
          </h3>
          <div className="space-y-2">
            {topSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100"
              >
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-amber-200 text-xs font-semibold text-amber-800">
                    {suggestion.frequency}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{suggestion.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
