import { BarChart3 } from "lucide-react";

interface FeedbackStats {
  averageScore?: number;
  totalResponses?: number;
  departmentBreakdown?: Record<string, number>;
}

interface FeedbackSummaryProps {
  stats?: FeedbackStats;
}

export default function FeedbackSummary({ stats }: FeedbackSummaryProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-green-200 flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-green-700" />
        </div>
        <h2 className="text-lg font-semibold text-green-900">
          Feedbackresultaten
        </h2>
      </div>

      {stats && stats.averageScore !== undefined ? (
        <div className="space-y-4">
          <div>
            <p className="text-gray-700 text-sm mb-1">Gemiddelde score</p>
            <p className="text-3xl font-bold text-green-700">
              {stats.averageScore.toFixed(1)}/5
            </p>
          </div>

          {stats.totalResponses !== undefined && (
            <div>
              <p className="text-gray-700 text-sm">
                {stats.totalResponses} reacties ontvangen
              </p>
            </div>
          )}

          {stats.departmentBreakdown && (
            <div className="mt-4 pt-4 border-t border-green-200">
              <p className="text-sm font-medium text-gray-900 mb-3">
                Per afdeling
              </p>
              <div className="space-y-2">
                {Object.entries(stats.departmentBreakdown).map(
                  ([dept, score]) => (
                    <div
                      key={dept}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-700 capitalize">
                        {dept}
                      </span>
                      <span className="text-sm font-medium text-green-700">
                        {score.toFixed(1)}/5
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-700 text-sm">
            Nog geen feedback resultaten beschikbaar
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Resultaten worden hier weergegeven zodra feedback is ingediend
          </p>
        </div>
      )}
    </div>
  );
}
