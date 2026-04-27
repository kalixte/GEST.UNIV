import Layout from "@/components/layout/Layout";
import { Save, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  phone: string;
}

interface SecurityForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialProfile: ProfileData = {
  firstName: "Pierre",
  lastName: "Dupont",
  email: "pierre.dupont@example.com",
  role: "Professeur",
  department: "Informatique",
  phone: "+33 1 23 45 67 89",
};

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [security, setSecurity] = useState<SecurityForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    reminders: true,
  });

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleSecurityChange = (field: keyof SecurityForm, value: string) => {
    setSecurity({ ...security, [field]: value });
  };

  const handleUpdatePassword = async () => {
    if (security.newPassword !== security.confirmPassword) {
      // Show error in real app
      return;
    }
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
    setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { level: 0, text: "", color: "" };
    if (password.length < 8) return { level: 1, text: "Faible", color: "text-danger-600" };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password))
      return { level: 2, text: "Moyen", color: "text-warning-600" };
    return { level: 3, text: "Fort", color: "text-success-600" };
  };

  const passwordStrength = getPasswordStrength(security.newPassword);

  return (
    <Layout
      userRole="admin"
      userName="Pierre Dupont"
      pageTitle="Mon profil"
      breadcrumbs={[{ label: "Paramètres" }, { label: "Profil" }]}
      showSearch={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-border p-8">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-primary-500 flex items-center justify-center text-white mb-4">
                <span className="text-4xl font-bold">PD</span>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Changer la photo
              </button>
            </div>

            {/* Profile Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Prénom
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) =>
                      handleProfileChange("firstName", e.target.value)
                    }
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border border-border",
                      "bg-white text-neutral-900 text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary-500"
                    )}
                  />
                ) : (
                  <p className="text-neutral-900 font-medium">
                    {profile.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Nom
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) =>
                      handleProfileChange("lastName", e.target.value)
                    }
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border border-border",
                      "bg-white text-neutral-900 text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary-500"
                    )}
                  />
                ) : (
                  <p className="text-neutral-900 font-medium">
                    {profile.lastName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      handleProfileChange("email", e.target.value)
                    }
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border border-border",
                      "bg-white text-neutral-900 text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary-500"
                    )}
                  />
                ) : (
                  <p className="text-neutral-900 font-medium">
                    {profile.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Rôle
                </label>
                <p className="px-2.5 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-medium inline-block">
                  {profile.role}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Département
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) =>
                      handleProfileChange("department", e.target.value)
                    }
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border border-border",
                      "bg-white text-neutral-900 text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary-500"
                    )}
                  />
                ) : (
                  <p className="text-neutral-900 font-medium">
                    {profile.department}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Téléphone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      handleProfileChange("phone", e.target.value)
                    }
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border border-border",
                      "bg-white text-neutral-900 text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary-500"
                    )}
                  />
                ) : (
                  <p className="text-neutral-900 font-medium">
                    {profile.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Edit Button */}
            {isEditing ? (
              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className={cn(
                    "flex-1 py-2.5 px-4 rounded-lg bg-primary-500 text-white font-semibold",
                    "hover:bg-primary-600 transition-colors flex items-center justify-center gap-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <Save size={18} />
                  {isSaving ? "Enregistrement..." : "Enregistrer"}
                </button>
                <button
                  onClick={() => {
                    setProfile(initialProfile);
                    setIsEditing(false);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-lg border-2 border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-100 transition-colors"
                >
                  Annuler
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full mt-8 py-2.5 px-4 rounded-lg border-2 border-primary-500 text-primary-600 font-semibold hover:bg-primary-50 transition-colors"
              >
                Modifier le profil
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Security & Notifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Change Password */}
          <div className="bg-white rounded-lg border border-border p-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">
              Changer le mot de passe
            </h3>

            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={security.currentPassword}
                    onChange={(e) =>
                      handleSecurityChange("currentPassword", e.target.value)
                    }
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg border border-border",
                      "bg-white text-neutral-900 text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary-500 pr-12"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        current: !showPasswords.current,
                      })
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
                  >
                    {showPasswords.current ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={security.newPassword}
                    onChange={(e) =>
                      handleSecurityChange("newPassword", e.target.value)
                    }
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg border border-border",
                      "bg-white text-neutral-900 text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary-500 pr-12"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        new: !showPasswords.new,
                      })
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
                  >
                    {showPasswords.new ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {security.newPassword && (
                  <p className={cn("text-xs font-medium mt-2", passwordStrength.color)}>
                    Force: {passwordStrength.text}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={security.confirmPassword}
                    onChange={(e) =>
                      handleSecurityChange("confirmPassword", e.target.value)
                    }
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg border border-border",
                      "bg-white text-neutral-900 text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary-500 pr-12"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        confirm: !showPasswords.confirm,
                      })
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleUpdatePassword}
              disabled={
                isSaving ||
                !security.currentPassword ||
                !security.newPassword ||
                security.newPassword !== security.confirmPassword
              }
              className={cn(
                "mt-6 py-2.5 px-6 rounded-lg bg-primary-500 text-white font-semibold",
                "hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              Mettre à jour
            </button>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-lg border border-border p-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">
              Préférences de notification
            </h3>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      email: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded border-border"
                />
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    Notifications par email
                  </p>
                  <p className="text-xs text-neutral-600">
                    Recevoir les mises à jour importantes par email
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.reminders}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      reminders: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded border-border"
                />
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    Rappels de validation
                  </p>
                  <p className="text-xs text-neutral-600">
                    Recevoir des rappels pour les saisies en attente
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
