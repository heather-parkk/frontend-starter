<template>
  <div>
    <h2>Rate Users</h2>
    <ul>
      <li v-for="user in users" :key="user._id">
        <span>{{ user.username }}</span>
        <button @click="rateUser(user._id, true)">👍</button>
        <button @click="rateUser(user._id, false)">👎</button>
        <span v-if="compatibility[user._id]"> Compatibility: {{ compatibility[user._id] }}% </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";

// Define the User type
interface User {
  _id: string;
  username: string;
}

const users = ref<User[]>([]); // Use the defined User type
const compatibility = ref<Record<string, number>>({}); // Store compatibility for each user

const fetchUsers = async () => {
  try {
    const response = await fetchy("/api/users", "GET");
    users.value = response;
  } catch (err) {
    console.error("Failed to fetch users:", err);
  }
};

const rateUser = async (userId: string, like: boolean) => {
  try {
    const response = await fetchy(`/api/rate`, "POST", {
      body: { targetUserId: userId, like },
    });
    compatibility.value[userId] = response.compatibility; // Store compatibility score
  } catch (err) {
    console.error("Failed to rate user:", err);
  }
};

onMounted(fetchUsers);
</script>
