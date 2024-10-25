<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import RateUser from "../components/Match/RateUser.vue";
import CreateProfile from "../components/UserProfiling/CreateProfile.vue";
import ViewProfile from "../components/UserProfiling/ViewProfile.vue";

const userStore = useUserStore();
const { currentUsername, isLoggedIn, isProfileComplete } = storeToRefs(userStore);
</script>

<template>
  <main>
    <!-- If not logged in, show Welcome message with background -->
    <section v-if="!isLoggedIn" class="welcome-section">
      <div class="overlay">
        <h1>Welcome to <span class="fancy-font">Nomad.ly</span>!</h1>
        <p class="description">Discover your next adventure. Connect with fellow travelers and find companions for your journey.</p>
      </div>
    </section>

    <!-- Show CreateProfile component only if profile is not complete -->
    <CreateProfile v-if="isLoggedIn && !isProfileComplete" />

    <!-- Show profile and rate user components if the profile is complete -->
    <div v-if="isLoggedIn && isProfileComplete" class="profile-rating-container">
      <div class="view-profile">
        <ViewProfile />
      </div>
      <div class="rate-user">
        <RateUser />
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap");

/* Background only for the login/registration (when not logged in) */
.welcome-section {
  height: 100vh;
  background-image: url("../assets/images/thailand.jpg"); /* Your background image */
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2em;
  border-radius: 12px;
  text-align: center;
}

h1 {
  font-size: 3em;
  font-weight: 600;
}

.fancy-font {
  font-family: "Alex Brush", cursive;
  font-size: 1.5em;
  color: #ffffff; /* Luxurious color */
}

.description {
  font-size: 1.2em;
  font-weight: 300;
  margin-top: 0.5em;
}

/* No special background for the logged-in view */
.profile-rating-container {
  display: flex;
  gap: 2em;
  padding: 2em;
}

.view-profile,
.rate-user {
  flex: 1;
}
</style>
