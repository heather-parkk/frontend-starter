<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const errorMessage = ref(""); // For storing error messages
const { loginUser, updateSession } = useUserStore();

async function login() {
  errorMessage.value = ""; // Reset error message before login attempt
  try {
    await loginUser(username.value, password.value);
    await updateSession();
    void router.push({ name: "Home" });
  } catch (error) {
    // Type assertion to treat error as an instance of Error
    const typedError = error as Error;
    errorMessage.value = typedError.message || "Login failed. Please try again."; // Handle error gracefully
  }
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="login">
    <h3>Login</h3>
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-name">Username</label>
        <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">Password</label>
        <input v-model.trim="password" type="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="pure-controls">
        <button type="submit" class="pure-button pure-button-primary">Submit</button>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </fieldset>
  </form>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}

.error-message {
  color: red;
  text-align: center;
}
</style>
