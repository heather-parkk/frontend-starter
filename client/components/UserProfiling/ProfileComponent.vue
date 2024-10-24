<script setup lang="ts">
import CreateProfileForm from "@/components/UserProfiling/CreateProfile.vue";
import ViewProfile from "@/components/UserProfiling/ViewProfile.vue";
import { useUserStore } from "@/stores/user"; // Import the user store
import { computed, onMounted, ref } from "vue";

const userStore = useUserStore();
const profileData = ref(null);

const refreshProfiles = () => {
  void fetchProfileData(); // Refresh profile data when needed
};

const fetchProfileData = async () => {
  try {
    const response = await fetch("/api/profile", { method: "GET" });
    if (response.ok) {
      profileData.value = await response.json();
    } else {
      console.error("Failed to fetch profile data");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};

const isProfileComplete = computed(() => userStore.isProfileComplete);

onMounted(fetchProfileData);
</script>

<template>
  <div>
    <h1>User Profile Management</h1>
    <CreateProfileForm v-if="!isProfileComplete" @refreshProfiles="refreshProfiles" />
    <ViewProfile v-if="profileData" :profile="profileData" />
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
