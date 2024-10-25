<template>
  <div class="rate-users-container">
    <h2>Rate Users</h2>
    <ul class="user-list">
      <li v-for="user in users" :key="user._id" class="user-card">
        <div class="user-info">
          <span class="username">{{ user.username }}</span>
          <div class="user-details">
            <p>Age: {{ user.age }}</p>
            <p>Travel Style: {{ user.travelStyle }}</p>
            <p>Location: {{ user.location }}</p>
            <p>Preference for sleeping in: {{ user.question_1 }}</p>
            <p>Preference for museums over hikes: {{ user.question_2 }}</p>
            <div class="compatibility">Compatibility: {{ compatibility[user._id] }}%</div>
          </div>
        </div>
        <div class="rating-buttons">
          <button class="like-button" @click="rateUser(user._id, true)">👍</button>
          <button class="dislike-button" @click="rateUser(user._id, false)">👎</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";

interface User {
  _id: string;
  username: string;
  age: number;
  travelStyle: string;
  location: string;
  question_1: string; // Adding question_1 response
  question_2: string; // Adding question_2 response
}

const users = ref<User[]>([]);
const compatibility = ref<Record<string, number>>({}); // Compatibility scores for users

const fetchRateableUsers = async () => {
  try {
    const response = await fetchy("/api/rateable-users", "GET"); // Use new route for rateable users
    users.value = response; // Assuming response contains the list of users excluding the current user
  } catch (err) {
    console.error("Failed to fetch rateable users:", err);
  }
};

const rateUser = async (userId: string, like: boolean) => {
  try {
    const response = await fetchy(`/api/rate`, "POST", {
      body: { targetUserId: userId, like },
    });
    compatibility.value[userId] = parseFloat(response.compatibility); // Store compatibility score
  } catch (err) {
    console.error("Failed to rate user:", err);
  }
};

onMounted(fetchRateableUsers); // Call the new function to fetch rateable users
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

.rate-users-container {
  padding: 2em;
  background-color: #f0f4f8;
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
}

h2 {
  text-align: center;
  font-size: 2em;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5em;
}

.user-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5em;
}

.user-card {
  background-color: #ffffff;
  padding: 1.5em;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.user-info {
  margin-bottom: 1.2em;
  text-align: center;
}

.username {
  font-weight: 600;
  font-size: 1.2em;
  color: #007bff;
  margin-bottom: 0.5em;
  display: block;
}

.user-details p {
  margin: 0.5em 0;
  font-size: 1em;
  color: #444;
}

.compatibility {
  font-weight: 600;
  color: #555;
  margin-top: 0.8em;
}

.rating-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5em;
}

.like-button,
.dislike-button {
  background-color: #ffffff;
  border: 2px solid #ddd;
  padding: 0.5em 1.2em;
  border-radius: 8px;
  font-size: 1.2em;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.like-button:hover {
  background-color: #d4edda;
  border-color: #28a745;
}

.dislike-button:hover {
  background-color: #f8d7da;
  border-color: #dc3545;
}

.like-button:focus,
.dislike-button:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.3);
}
</style>
