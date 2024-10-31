<template>
  <div class="profile-form-container">
    <form class="profile-form" @submit.prevent="createProfile">
      <h2>Create Your Travel Profile</h2>

      <div class="form-group">
        <label for="gender">Gender:</label>
        <select v-model="profile.gender" required>
          <option disabled value="">Select...</option>
          <option value="man">Man</option>
          <option value="woman">Woman</option>
          <option value="nonbinary">Nonbinary</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" v-model="profile.age" min="16" max="99" required />
      </div>

      <div class="form-group">
        <label for="travelStyle">Travel Style:</label>
        <select v-model="profile.travelStyle" required>
          <option disabled value="">Select...</option>
          <option value="relaxed">Relaxed</option>
          <option value="fast-paced">Fast-Paced</option>
        </select>
      </div>

      <div class="form-group">
        <label for="location">Location:</label>
        <select v-model="profile.location" required>
          <option disabled value="">Select...</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Thailand">Thailand</option>
          <option value="London">London</option>
          <option value="Paris">Paris</option>
          <option value="New York">New York</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Sydney">Sydney</option>
          <option value="Cape Town">Cape Town</option>
          <option value="Dubai">Dubai</option>
          <option value="Rome">Rome</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="Berlin">Berlin</option>
          <option value="Lisbon">Lisbon</option>
          <option value="Istanbul">Istanbul</option>
          <option value="Mexico City">Mexico City</option>
          <option value="Singapore">Singapore</option>
          <option value="Buenos Aires">Buenos Aires</option>
        </select>
      </div>

      <div class="form-group">
        <label for="question_1">I would rather sleep in while traveling than wake up early to go out:</label>
        <select v-model="profile.question_1" required>
          <option disabled value="">Select...</option>
          <option value="Agree">Agree</option>
          <option value="Disagree">Disagree</option>
          <option value="Neutral">Neutral</option>
        </select>
      </div>

      <div class="form-group">
        <label for="question_2">I would rather go to a museum than go on a hike:</label>
        <select v-model="profile.question_2" required>
          <option disabled value="">Select...</option>
          <option value="Agree">Agree</option>
          <option value="Disagree">Disagree</option>
          <option value="Neutral">Neutral</option>
        </select>
      </div>

      <button class="submit-button" type="submit">Create Profile</button>
    </form>
  </div>
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
    // Use profile.value to destructure the properties
    const { gender, age, travelStyle, location, question_1, question_2 } = profile.value;
    await fetchy("/api/profile", "PATCH", {
      body: { gender, age, travelStyle, location, question_1, question_2 },
    });
    userStore.completeProfile(); // Mark profile as complete in user store
  } catch (err) {
    console.error("Error creating profile:", err);
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Montserrat:wght@400&display=swap");

.profile-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8; /* Soft background for a light and welcoming feel */
  padding: 1em;
}

.profile-form {
  background: #ffffff;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  max-width: 450px;
  width: 100%;
  font-family: "Poppins", sans-serif;
}

h2 {
  text-align: center;
  font-family: "Montserrat", sans-serif;
  color: #333;
  margin-bottom: 1em;
}

.form-group {
  margin-bottom: 1.5em;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1.1em;
  margin-bottom: 0.5em;
  color: #555;
  font-weight: 600; /* Slightly heavier to indicate label importance */
}

input,
select {
  padding: 0.8em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease-in-out;
}

input:focus,
select:focus {
  border-color: #ff7b54; /* Highlighted border on focus */
  outline: none;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 1em;
  margin-top: 1.5em;
  background-color: #6cae75;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.submit-button:hover {
  background-color: #558b5a;
}

.submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(255, 123, 84, 0.3); /* Focus outline for accessibility */
}
</style>
