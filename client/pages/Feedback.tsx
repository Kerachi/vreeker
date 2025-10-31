import DashboardLayout from "@/components/DashboardLayout";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackSummary from "@/components/FeedbackSummary";
import { useState } from "react";

interface FeedbackStats {
  averageScore: number;
  totalResponses: number;
  departmentBreakdown: Record<string, number>;
}

export default function Feedback() {
  const [feedbackStats, setFeedbackStats] = useState<FeedbackStats | undefined>(
    undefined
  );

  const handleFeedbackSubmit = (data: any) => {
    console.log("Feedback submitted:", data);
    // Here you would typically send the feedback to a backend API
    // For now, we'll just update the stats as a demo
    if (!feedbackStats) {
      setFeedbackStats({
        averageScore: 4.2,
        totalResponses: 1,
        departmentBreakdown: {
          [data.department]: data.rating,
        },
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Feedback over het nieuwe Vreeker Dashboard
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl">
            We horen graag wat u vindt van het nieuwe digitale systeem. Uw
            mening helpt ons om het gebruik makkelijker en beter te maken.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </div>

          <div>
            <FeedbackSummary stats={feedbackStats} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
