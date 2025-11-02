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
import { useAuthStore } from "../../store/useAuthStore";
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
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  // Profile form
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.user.name || "",
      email: user?.user.email || "",
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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
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
          {/* Profile */}
          {activeTab === "profile" && (
            <form
              onSubmit={profileForm.handleSubmit(() => {})}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Profile Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={user?.user.avatar}
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
                    className="border border-primary/50 focus:border-primary focus:ring-0 focus:outline-0 focus:ring-offset-0"
                  />

                  <Input
                    label="Email"
                    type="email"
                    {...profileForm.register("email")}
                    error={profileForm.formState.errors.email?.message}
                    fullWidth
                    className="border border-primary/50 focus:border-primary focus:ring-0 focus:outline-0 focus:ring-offset-0"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  leftIcon={<Save size={18} />}
                  isLoading={false}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {/* Notifications*/}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <Toggle
                    checked={false}
                    onChange={() => {}}
                    label="Email Notifications"
                    description="Receive notifications via email"
                    className="p-2 border border-primary/50"
                  />
                  <Toggle
                    checked={false}
                    onChange={() => {}}
                    label="Push Notifications"
                    description="Receive push notifications in your browser"
                    className="p-2 border border-primary/50"
                  />
                  <Toggle
                    checked={false}
                    onChange={() => {}}
                    label="Weekly Digest"
                    description="Get a weekly summary of your activity"
                    className="p-2 border border-primary/50"
                  />
                  <Toggle
                    checked={false}
                    onChange={() => {}}
                    label="Marketing Emails"
                    description="Receive emails about new features and updates"
                    className="p-2 border border-primary/50"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button leftIcon={<Save size={18} />}>Save Preferences</Button>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <form
              onSubmit={passwordForm.handleSubmit(() => {})}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
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
                    className="border border-primary/50 focus:border-primary focus:ring-0 focus:outline-0 focus:ring-offset-0"
                  />

                  <Input
                    label="New Password"
                    type="password"
                    {...passwordForm.register("newPassword")}
                    error={passwordForm.formState.errors.newPassword?.message}
                    helperText="Must be at least 8 characters"
                    fullWidth
                    className="border border-primary/50 focus:border-primary focus:ring-0 focus:outline-0 focus:ring-offset-0"
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    {...passwordForm.register("confirmPassword")}
                    error={
                      passwordForm.formState.errors.confirmPassword?.message
                    }
                    fullWidth
                    className="border border-primary/50 focus:border-primary focus:ring-0 focus:outline-0 focus:ring-offset-0"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Two-Factor Authentication
                </h3>
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Enable 2FA
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <div className="text-primary cursor-pointer border border-primary/50 p-2 rounded-lg">
                    Setup
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button
                  type="submit"
                  leftIcon={<Save size={18} />}
                  isLoading={false}
                  variant="primary"
                >
                  Update Password
                </Button>
              </div>
            </form>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Display Settings
                </h3>
                <div className="space-y-4">
                  <Toggle
                    checked={false}
                    onChange={() => {}}
                    label="Dark Mode"
                    description="Enable dark theme across the application"
                  />
                  <Toggle
                    checked={false}
                    onChange={() => {}}
                    label="Compact Mode"
                    description="Reduce spacing for a more compact layout"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Language & Region
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Language
                    </label>
                    <select
                      value={"en-US"}
                      onChange={() => {}}
                      className="w-full px-3 py-2 border border-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="en-US">English (US)</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Timezone
                    </label>
                    <select
                      value={"UTC-8"}
                      onChange={() => {}}
                      className="w-full px-3 py-2 border border-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="UTC-8">UTC-8 (Pacific Time)</option>
                      <option value="UTC-5">UTC-5 (Eastern Time)</option>
                      <option value="UTC+0">UTC+0 (London)</option>
                      <option value="UTC+1">UTC+1 (Paris)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-primary/50">
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
