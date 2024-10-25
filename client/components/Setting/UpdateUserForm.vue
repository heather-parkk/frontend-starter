<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

let username = ref("");
let currentPassword = ref("");
let newPassword = ref("");

const { updateUserUsername, updateUserPassword, updateSession } = useUserStore();

async function updateUsername() {
  await updateUserUsername(username.value);
  await updateSession();
  username.value = "";
}

async function updatePassword() {
  await updateUserPassword(currentPassword.value, newPassword.value);
  await updateSession();
  currentPassword.value = newPassword.value = "";
}
</script>

<template>
  <div class="update-container">
    <h2>Update User Details</h2>
    <form @submit.prevent="updateUsername" class="update-form">
      <fieldset>
        <legend>Change your username</legend>
        <input type="text" placeholder="New username" v-model="username" required />
        <button type="submit" class="button muted-green-button">Update Username</button>
      </fieldset>
    </form>

    <form @submit.prevent="updatePassword" class="update-form">
      <fieldset>
        <legend>Change your password</legend>
        <input type="password" placeholder="Old password" v-model="currentPassword" required />
        <input type="password" placeholder="New password" v-model="newPassword" required />
        <button type="submit" class="button muted-green-button">Update Password</button>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

/* Full-page consistent background */
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #f0f4f8; /* This color covers the whole page */
}

.update-container {
  min-height: 100vh; /* Make sure the container takes the entire viewport height */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Ensure content starts at the top */
  align-items: center;
  padding: 2em;
  gap: 1.5em; /* Adds consistent gap between form elements */
}

h2 {
  text-align: center;
  font-size: 1.8em;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5em; /* Reduce space below the header */
}

.update-form {
  width: 100%;
  max-width: 600px; /* Limits the form width */
  margin-bottom: 1em; /* Controls space between forms */
}

fieldset {
  border: none;
  padding: 1.5em;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5em; /* Space between fieldsets */
}

legend {
  font-weight: 600;
  margin-bottom: 0.5em;
  color: #4a4a4a;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 0.6em;
  margin-top: 0.5em;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.button {
  display: block;
  width: 100%;
  padding: 0.8em;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  margin-top: 1em;
  transition: background-color 0.3s ease-in-out;
}

/* Muted green for buttons */
.muted-green-button {
  background-color: #6cae75;
  color: white;
}

.muted-green-button:hover {
  background-color: #558b5a;
}

/* Responsive design for smaller devices */
@media (max-width: 600px) {
  .update-container {
    padding: 1em;
  }

  input[type="text"],
  input[type="password"] {
    padding: 0.5em;
  }

  .button {
    padding: 0.7em;
  }
}
</style>
