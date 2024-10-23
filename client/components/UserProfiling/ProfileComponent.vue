<script setup lang="ts">
import CreateProfileForm from "@/components/UserProfiling/CreateProfile.vue";
import ViewProfile from "@/components/UserProfiling/ViewProfile.vue";
import { ref } from "vue";

// Use a ref to hold the profile data if needed for reactive updates
const profileData = ref(null);

const refreshProfiles = () => {
  // Logic to refresh profiles or re-fetch data if necessary
  // This could involve an API call to get the latest user profile
  // e.g., fetchProfileData();
};

// You can add a function here to fetch and set the profile data if needed
const fetchProfileData = async () => {
  try {
    // Example API call to fetch the user's profile
    const response = await fetch("/api/profile", { method: "GET" });
    if (response.ok) {
      profileData.value = await response.json(); // Update the profile data
    } else {
      console.error("Failed to fetch profile data");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};

// Call this function to fetch profile data on component mount
void fetchProfileData();
</script>

<template>
  <div>
    <h1>User Profile Management</h1>
    <CreateProfileForm @refreshProfiles="refreshProfiles" />
    <ViewProfile :profile="profileData" />
    <!-- Pass profile data to ViewProfile -->
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
