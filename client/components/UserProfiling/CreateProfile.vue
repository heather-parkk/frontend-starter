<template>
  <form @submit.prevent="createProfile">
    <label for="gender">Gender:</label>
    <select v-model="profile.gender" required>
      <option disabled value="">Select...</option>
      <option value="man">Man</option>
      <option value="woman">Woman</option>
      <option value="nonbinary">Nonbinary</option>
      <option value="other">Other</option>
    </select>

    <label for="age">Age:</label>
    <input type="number" v-model="profile.age" min="16" max="99" required />

    <label for="travelStyle">Travel Style:</label>
    <select v-model="profile.travelStyle" required>
      <option disabled value="">Select...</option>
      <option value="relaxed">Relaxed</option>
      <option value="fast-paced">Fast-Paced</option>
    </select>

    <label for="location">Location:</label>
    <select v-model="profile.location" required>
      <option disabled value="">Select...</option>
      <option value="Barcelona">Barcelona</option>
      <option value="Thailand">Thailand</option>
      <option value="London">London</option>
    </select>

    <label for="question_1">I would rather sleep in while traveling rather than waking up early to go out:</label>
    <select v-model="profile.question_1" required>
      <option disabled value="">Select...</option>
      <option value="Agree">Agree</option>
      <option value="Disagree">Disagree</option>
      <option value="Neutral">Neutral</option>
    </select>

    <label for="question_2">I would rather go to a museum than go on a hike:</label>
    <select v-model="profile.question_2" required>
      <option disabled value="">Select...</option>
      <option value="Agree">Agree</option>
      <option value="Disagree">Disagree</option>
      <option value="Neutral">Neutral</option>
    </select>

    <button type="submit">Create Profile</button>
  </form>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user"; // Import the user store
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const profile = ref({
  gender: "",
  age: "",
  travelStyle: "",
  location: "",
  question_1: "",
  question_2: "",
});

const userStore = useUserStore();

const createProfile = async () => {
  console.log("Submitting profile:", profile.value); // Log the profile data
  try {
    await fetchy("/api/profile", "PATCH", {
      body: {
        gender: profile.value.gender,
        age: profile.value.age,
        travelStyle: profile.value.travelStyle,
        location: profile.value.location,
        question_1: profile.value.question_1,
        question_2: profile.value.question_2,
      },
    });
    userStore.completeProfile(); // Mark profile as complete in user store
  } catch (err) {
    console.error("Error creating profile:", err);
  }
};
</script>
