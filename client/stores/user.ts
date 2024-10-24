import { fetchy } from "@/utils/fetchy";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUsername = ref("");
    const isProfileComplete = ref(false); // New state to track profile completeness

    const isLoggedIn = computed(() => currentUsername.value !== "");

    const resetStore = () => {
      currentUsername.value = "";
      isProfileComplete.value = false; // Reset profile completeness on logout
    };

    const createUser = async (username: string, password: string) => {
      await fetchy("/api/users", "POST", {
        body: { username, password },
      });
    };

    const loginUser = async (username: string, password: string) => {
      await fetchy("/api/login", "POST", {
        body: { username, password },
      });
    };

    const updateSession = async () => {
      try {
        const { username, profileComplete } = await fetchy("/api/session", "GET", { alert: false });
        currentUsername.value = username;
        isProfileComplete.value = profileComplete; // Set profile completeness based on session data
      } catch {
        currentUsername.value = "";
        isProfileComplete.value = false; // Reset on error
      }
    };

    const logoutUser = async () => {
      await fetchy("/api/logout", "POST");
      resetStore();
    };

    const completeProfile = () => {
      isProfileComplete.value = true; // Mark profile as complete
    };

    const updateUserUsername = async (username: string) => {
      await fetchy("/api/users/username", "PATCH", { body: { username } });
    };

    const updateUserPassword = async (currentPassword: string, newPassword: string) => {
      await fetchy("/api/users/password", "PATCH", { body: { currentPassword, newPassword } });
    };

    const deleteUser = async () => {
      await fetchy("/api/users", "DELETE");
      resetStore();
    };

    return {
      currentUsername,
      isLoggedIn,
      isProfileComplete, // Expose the profile completeness state
      createUser,
      loginUser,
      updateSession,
      logoutUser,
      completeProfile, // Expose the completeProfile method
      updateUserUsername,
      updateUserPassword,
      deleteUser,
    };
  },
  { persist: true },
);
