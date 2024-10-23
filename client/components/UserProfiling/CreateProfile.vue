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
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const profile = ref({
  gender: "",
  age: 16,
  travelStyle: "",
  location: "",
  question_1: "",
  question_2: "",
});

const createProfile = async () => {
  try {
    await fetchy("/api/profile", "PATCH", {
      body: profile.value,
    });
  } catch (err) {
    console.error(err);
  }
};
</script>
