import { Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SettingsSecurity() {
  const [twoFA, setTwoFA] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleToggle2FA = () => {
    setTwoFA(!twoFA);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">🔒 Beveiliging</h2>
      </div>

      <div className="space-y-6">
        <div>
          <Button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium"
          >
            Wachtwoord wijzigen
          </Button>
          {showPasswordForm && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Huidig wachtwoord
                </label>
                <input
                  type="password"
                  placeholder="Voer huidig wachtwoord in"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Nieuw wachtwoord
                </label>
                <input
                  type="password"
                  placeholder="Voer nieuw wachtwoord in"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Bevestig nieuw wachtwoord
                </label>
                <input
                  type="password"
                  placeholder="Bevestig nieuw wachtwoord"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setShowPasswordForm(false)}
                >
                  Wachtwoord wijzigen
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowPasswordForm(false)}
                >
                  Annuleren
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <label className="text-sm font-medium text-gray-900">
              Tweestapsverificatie aanzetten
            </label>
            <button
              onClick={handleToggle2FA}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFA ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFA ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {twoFA && (
            <p className="text-xs text-green-700 bg-green-50 p-3 rounded-lg mt-3">
              ✅ Tweestapsverificatie is ingeschakeld. U ontvangt een code per
              e-mail bij het inloggen.
            </p>
          )}
        </div>

        <div className="pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
            ⏱️ Automatisch uitloggen na 15 minuten zonder activiteit
          </p>
        </div>
      </div>
    </div>
  );
}
