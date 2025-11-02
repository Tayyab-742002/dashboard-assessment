import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  weeklyDigest: boolean;
  marketing: boolean;
}

interface AppearancePreferences {
  darkMode: boolean;
  compactMode: boolean;
  language: string;
  timezone: string;
}

interface PreferencesState {
  notifications: NotificationPreferences;
  appearance: AppearancePreferences;
  updateNotifications: (preferences: Partial<NotificationPreferences>) => void;
  updateAppearance: (preferences: Partial<AppearancePreferences>) => void;
}

const defaultNotifications: NotificationPreferences = {
  email: true,
  push: false,
  weeklyDigest: true,
  marketing: false,
};

const defaultAppearance: AppearancePreferences = {
  darkMode: false,
  compactMode: false,
  language: "en-US",
  timezone: "UTC-8",
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      notifications: defaultNotifications,
      appearance: defaultAppearance,
      updateNotifications: (preferences) =>
        set((state) => ({
          notifications: { ...state.notifications, ...preferences },
        })),
      updateAppearance: (preferences) =>
        set((state) => ({
          appearance: { ...state.appearance, ...preferences },
        })),
    }),
    {
      name: "preferences-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
