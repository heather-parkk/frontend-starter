<template>
  <div>
    <h2>Your Profile</h2>
    <ProfileComponent v-if="profile" :profile="profile" />
    <p v-else>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import ProfileComponent from "./ProfileComponent.vue";

const profile = ref(null);

const fetchProfile = async () => {
  try {
    const response = await fetchy("/api/profile", "GET");
    profile.value = response;
  } catch (err) {
    console.error("Failed to fetch profile:", err);
  }
};

onMounted(fetchProfile);
</script>
