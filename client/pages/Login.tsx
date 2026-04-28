import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login - in real app, call API
    setTimeout(() => {
      // Navigate to admin dashboard for demo
      navigate("/admin");
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-primary-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo and Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary-500 text-white mb-4">
              <span className="text-2xl font-bold">G</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">GEST.UNIV</h1>
            <p className="text-base text-neutral-600">
              Gestion des heures d'enseignement
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="votre@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg border border-border",
                  "bg-white text-neutral-900 text-base",
                  "placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500",
                  "transition-all"
                )}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={cn(
                    "w-full px-4 py-2.5 rounded-lg border border-border",
                    "bg-white text-neutral-900 text-base",
                    "placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500",
                    "transition-all pr-12"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-2.5 rounded-full font-semibold text-base transition-all",
                "bg-primary-500 text-white hover:bg-primary-600",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                isLoading && "opacity-50"
              )}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </button>

            {/* Forgot Password Link */}
            <div className="text-center mt-6">
              <a
                href="#"
                className="text-sm text-primary-500 hover:text-primary-600 font-medium"
              >
                Mot de passe oublié?
              </a>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-neutral-500">
            <p>
              Connexion réservée aux enseignants et personnels administratifs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
