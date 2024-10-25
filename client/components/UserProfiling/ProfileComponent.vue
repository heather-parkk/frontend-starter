<template>
  <div>
    <h2>Your Profile</h2>
    <div v-if="profile">
      <p>Age: {{ profile.age }}</p>
      <p>Travel Style: {{ profile.travelStyle }}</p>
      <p>Location: {{ profile.location }}</p>
      <p>Preference for sleeping in: {{ profile.question_1 }}</p>
      <p>Preference for museums over hikes: {{ profile.question_2 }}</p>
    </div>
    <p v-else>Loading profile details...</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

// Define the props to receive profile data from parent component
const props = defineProps<{
  profile: {
    username: string;
    age: number;
    travelStyle: string;
    location: string;
    question_1: string;
    question_2: string;
  } | null;
}>();
</script>

<style scoped>
/* Add your styles here */
h2 {
  font-family: "Poppins", sans-serif;
  color: #333;
  text-align: center;
  margin-bottom: 1em;
}

p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  line-height: 1.5;
  color: #444;
  margin-bottom: 0.5em;
}

div {
  padding: 1em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}
</style>
