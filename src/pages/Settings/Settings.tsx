import { useState } from "react";
import { User, Bell, Shield, Palette, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Tabs from "../../components/common/Tabs";
import Toggle from "../../components/common/Toggle";

// Profile form schema
const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  bio: z.string().max(200, "Bio must be 200 characters or less").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Password form schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Appearance settings
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  // Profile form
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "John Doe",
      email: "john@example.com",
      company: "Acme Inc",
      bio: "Software developer passionate about building great products.",
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} /> },
  ];

  const handleProfileSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Profile data:", data);
    setIsSaving(false);
  };

  const handlePasswordSubmit = async (data: PasswordFormData) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Password data:", data);
    passwordForm.reset();
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your application settings and preferences.
        </p>
      </div>

      {/* Tabs */}
      <Card padding="none">
        <div className="px-6 pt-6">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <form
              onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Profile Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://i.pravatar.cc/150?img=3"
                      alt="Profile"
                      className="w-20 h-20 rounded-full"
                    />
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>

                  <Input
                    label="Full Name"
                    {...profileForm.register("fullName")}
                    error={profileForm.formState.errors.fullName?.message}
                    fullWidth
                  />

                  <Input
                    label="Email"
                    type="email"
                    {...profileForm.register("email")}
                    error={profileForm.formState.errors.email?.message}
                    fullWidth
                  />

                  <Input
                    label="Company"
                    {...profileForm.register("company")}
                    error={profileForm.formState.errors.company?.message}
                    fullWidth
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Bio
                    </label>
                    <textarea
                      {...profileForm.register("bio")}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Tell us about yourself..."
                    />
                    {profileForm.formState.errors.bio && (
                      <p className="text-sm text-red-600 mt-1">
                        {profileForm.formState.errors.bio.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  leftIcon={<Save size={18} />}
                  isLoading={isSaving}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <Toggle
                    checked={emailNotifications}
                    onChange={setEmailNotifications}
                    label="Email Notifications"
                    description="Receive notifications via email"
                  />
                  <Toggle
                    checked={pushNotifications}
                    onChange={setPushNotifications}
                    label="Push Notifications"
                    description="Receive push notifications in your browser"
                  />
                  <Toggle
                    checked={weeklyDigest}
                    onChange={setWeeklyDigest}
                    label="Weekly Digest"
                    description="Get a weekly summary of your activity"
                  />
                  <Toggle
                    checked={marketingEmails}
                    onChange={setMarketingEmails}
                    label="Marketing Emails"
                    description="Receive emails about new features and updates"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button leftIcon={<Save size={18} />}>Save Preferences</Button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <form
              onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Change Password
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    {...passwordForm.register("currentPassword")}
                    error={
                      passwordForm.formState.errors.currentPassword?.message
                    }
                    fullWidth
                  />

                  <Input
                    label="New Password"
                    type="password"
                    {...passwordForm.register("newPassword")}
                    error={passwordForm.formState.errors.newPassword?.message}
                    helperText="Must be at least 8 characters"
                    fullWidth
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    {...passwordForm.register("confirmPassword")}
                    error={
                      passwordForm.formState.errors.confirmPassword?.message
                    }
                    fullWidth
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Two-Factor Authentication
                </h3>
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Enable 2FA
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Setup
                  </Button>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button
                  type="submit"
                  leftIcon={<Save size={18} />}
                  isLoading={isSaving}
                >
                  Update Password
                </Button>
              </div>
            </form>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Display Settings
                </h3>
                <div className="space-y-4">
                  <Toggle
                    checked={darkMode}
                    onChange={setDarkMode}
                    label="Dark Mode"
                    description="Enable dark theme across the application"
                  />
                  <Toggle
                    checked={compactMode}
                    onChange={setCompactMode}
                    label="Compact Mode"
                    description="Reduce spacing for a more compact layout"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Language & Region
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Language
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Timezone
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC+0 (London)</option>
                      <option>UTC+1 (Paris)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button leftIcon={<Save size={18} />}>Save Preferences</Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Settings;
