<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import RateUser from "../components/Match/RateUser.vue"; // Import the RateUser component
import CreateProfile from "../components/UserProfiling/CreateProfile.vue"; // Import CreateProfile

const userStore = useUserStore();
const { currentUsername, isLoggedIn, isProfileComplete } = storeToRefs(userStore);
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <section>
      <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <CreateProfile v-if="isLoggedIn && !isProfileComplete" />
    <!-- Show CreateProfile if profile is not complete -->
    <RateUser v-if="isLoggedIn && isProfileComplete" />
    <!-- Show RateUser only if profile is complete -->
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
