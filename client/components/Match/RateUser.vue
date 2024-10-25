<template>
  <div>
    <h2>Rate Users</h2>
    <ul>
      <li v-for="user in users" :key="user._id">
        <div>
          <span>Username: {{ user.username }}</span>
          <br />
          <span>Age: {{ user.age }}</span>
          <br />
          <span>Travel Style: {{ user.travelStyle }}</span>
          <br />
          <span>Location: {{ user.location }}</span>
          <br />
          <button @click="rateUser(user._id, true)">👍</button>
          <button @click="rateUser(user._id, false)">👎</button>
          <br />
          <span>Compatibility: {{ compatibility[user._id] }}%</span>
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
