<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <header>
    <nav>
      <div class="title">
        <img src="@/assets/images/logo.svg" />
        <RouterLink :to="{ name: 'Home' }">
          <h1>Nomad.ly</h1>
        </RouterLink>
      </div>
      <ul>
        <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> Home </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Chats' }" :class="{ underline: currentRouteName == 'Chats' }"> Chats </RouterLink>
        </li>
        <!-- <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Locating' }" :class="{ underline: currentRouteName == 'Locating' }"> Locating </RouterLink>
        </li> -->
        <li v-else>
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
      </ul>
    </nav>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <RouterView />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Montserrat:wght@400;600&display=swap");
@import "./assets/toast.css"; /* Assuming you have additional toast styles in a separate file */

/* Base Styling */
body {
  font-family: "Poppins", sans-serif; /* Base font for the whole application */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f0f4f8; /* Light background to give a travel-oriented feel */
}

/* Navbar Styling */
nav {
  padding: 1em 2em;
  background-color: #eaf4f4; /* Light, airy sea-foam color */
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* Subtle shadow for depth */
  border-radius: 0 0 12px 12px; /* Rounded bottom for aesthetic look */
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

h1 {
  font-size: 1.8em; /* Slightly smaller font for minimalism */
  font-family: "Montserrat", sans-serif; /* Modern font for headings */
  margin: 0;
  color: #333; /* Dark grey for softer text color */
}

img {
  height: 2em; /* Slightly larger logo for emphasis */
  margin-right: 0.5em;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 2em; /* Increase gap for better spacing */
}

a {
  font-size: 1.1em; /* Maintain readability */
  color: #555; /* Softer grey to reduce visual noise */
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  transition:
    color 0.3s ease-in-out,
    transform 0.2s ease-in-out; /* Smooth transition for hover effect */
}

a:hover {
  color: #ff7b54; /* Sunset-inspired color for hover state */
  transform: translateY(-2px); /* Slight upward movement for interaction */
}

.active {
  position: relative;
  font-weight: 600; /* Use a heavier font weight to indicate active link */
}

.active::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ff7b54; /* Highlight with a warm color */
  border-radius: 2px;
}

/* Toast Notification Styling */
.toast {
  position: fixed;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333; /* Dark grey for a less intrusive message */
  color: #fff; /* White text for better contrast */
  padding: 0.8em 1.2em;
  border-radius: 8px; /* Rounder edges for a modern look */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  font-size: 0.9em;
}

/* Additional Styling */
.chat-room {
  display: flex;
  flex-direction: column;
  padding: 1em;
  background-color: #ffffff; /* White background for the chat section */
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1em;
  background-color: #f0f4f8; /* Light grey for message background */
  border-radius: 8px;
}

button {
  background-color: #ff7b54; /* Use the warm color from the navbar */
  color: white;
  padding: 0.6em 1.2em;
  border: none;
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ff5722; /* Slightly darker shade for hover state */
}
</style>
