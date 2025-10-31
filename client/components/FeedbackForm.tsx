import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackFormData {
  name: string;
  department: string;
  rating: number;
  positive: string;
  improvement: string;
  testConsent: boolean;
}

interface FeedbackFormProps {
  onSubmit?: (data: FeedbackFormData) => void;
}

export default function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    department: "",
    rating: 0,
    positive: "",
    improvement: "",
    testConsent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleRatingChange = (stars: number) => {
    setFormData((prev) => ({
      ...prev,
      rating: stars,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        department: "",
        rating: 0,
        positive: "",
        improvement: "",
        testConsent: false,
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      {submitted ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Dank u wel!
          </h3>
          <p className="text-gray-600">
            Uw feedback is succesvol verzonden. We waarderen uw mening!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Naam
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Uw volledige naam"
                required
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Afdeling
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Selecteer uw afdeling</option>
                <option value="planning">Planning</option>
                <option value="uitvoering">Uitvoering</option>
                <option value="administratie">Administratie</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Beoordeling
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= formData.rating
                        ? "fill-green-500 text-green-500"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              {formData.rating > 0 && (
                <span className="ml-2 text-sm text-gray-600 self-center">
                  {formData.rating}/5
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="positive"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Wat vindt u goed aan het dashboard?
            </label>
            <Textarea
              id="positive"
              name="positive"
              value={formData.positive}
              onChange={handleInputChange}
              placeholder="Beschrijf wat goed werkt voor u..."
              className="h-24"
              required
            />
          </div>

          <div>
            <label
              htmlFor="improvement"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Wat kan beter of makkelijker?
            </label>
            <Textarea
              id="improvement"
              name="improvement"
              value={formData.improvement}
              onChange={handleInputChange}
              placeholder="Beschrijf wat verbeterd kan worden..."
              className="h-24"
              required
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <input
              id="testConsent"
              name="testConsent"
              type="checkbox"
              checked={formData.testConsent}
              onChange={handleInputChange}
              className="w-4 h-4 text-green-600 rounded cursor-pointer"
            />
            <label
              htmlFor="testConsent"
              className="text-sm text-gray-900 cursor-pointer"
            >
              Ik wil meedoen aan een korte test of demo.
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Verzenden
          </Button>
        </form>
      )}
    </div>
  );
}
