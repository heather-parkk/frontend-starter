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
    <section v-if="isLoggedIn && isProfileComplete">
      <h1>Home Page</h1>
      <h1>Welcome {{ currentUsername }}!</h1>
    </section>

    <CreateProfile v-if="isLoggedIn && !isProfileComplete" />
    <!-- Show CreateProfile if the profile is not complete -->

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
.profile-rating-container {
  display: flex;
  gap: 2em;
  padding: 2em;
}

.view-profile,
.rate-user {
  flex: 1;
}

h1 {
  text-align: center;
}
</style>
