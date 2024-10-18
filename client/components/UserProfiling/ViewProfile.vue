<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ProfileDoc } from "../../../server/concepts/userProfiling";
import { fetchy } from "../../utils/fetchy";

const profile = ref<ProfileDoc | null>(null);
const loading = ref(true);
const error = ref("");

const getProfile = async () => {
  try {
    const response = await fetchy("/api/profile", "GET");
    profile.value = response;
  } catch (err) {
    error.value = "Failed to load profile.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(getProfile);
</script>

<template>
  <div>
    <h2>User Profile</h2>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <div v-else-if="profile">
      <p>Gender: {{ profile.gender }}</p>
      <p>Age: {{ profile.age }}</p>
      <p>Travel Style: {{ profile.travelStyle }}</p>
      <p>Location: {{ profile.location }}</p>
      <p>Question 1: {{ profile.question_1 }}</p>
      <p>Question 2: {{ profile.question_2 }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
