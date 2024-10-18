<script setup lang="ts">
import CreateProfileForm from "@/components/UserProfiling/CreateProfile.vue";
import ViewProfile from "@/components/UserProfiling/ViewProfile.vue";

const refreshProfiles = () => {
  // Logic to refresh profiles or re-fetch data if necessary
};
</script>

<template>
  <div>
    <h1>User Profile Management</h1>
    <CreateProfileForm @refreshProfiles="refreshProfiles" />
    <ViewProfile />
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
