<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
</script>

<template>
  <main class="auth-container">
    <div class="auth-card">
      <h1 class="auth-heading">Welcome to Nomad.ly!</h1>
      <p class="auth-subheading">Please login or register to get started on your journey.</p>
      <div class="form-container">
        <LoginForm />
        <span class="or-divider">OR</span>
        <RegisterForm />
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap");

body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  font-family: "Poppins", sans-serif;
}

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full screen height */
  background-color: rgba(0, 0, 0, 0.6); /* Dark overlay for better text contrast */
  padding: 0 1em;
}

.auth-card {
  background-color: white;
  padding: 2.5em 2em;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  width: 100%;
  text-align: center;
}

.auth-heading {
  font-size: 2.5em;
  font-weight: 600;
  margin-bottom: 0.5em;
  color: #333;
}

.auth-subheading {
  font-size: 1em;
  font-weight: 300;
  margin-bottom: 2em;
  color: #555;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5em; /* Space between forms */
}

form {
  width: 100%; /* Make sure form inputs take full width */
  display: flex;
  flex-direction: column;
  align-items: center;
}

input[type="text"],
input[type="password"] {
  width: 90%; /* Ensure inputs are aligned and have some margin from the edges */
  padding: 0.8em;
  margin-top: 0.5em;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.or-divider {
  display: block;
  text-align: center;
  font-size: 0.9em;
  color: #aaa;
  margin: 1em 0;
  position: relative;
}

.or-divider:before,
.or-divider:after {
  content: "";
  width: 40%;
  height: 1px;
  background-color: #ddd;
  position: absolute;
  top: 50%;
}

.or-divider:before {
  left: 0;
}

.or-divider:after {
  right: 0;
}

button {
  width: 90%; /* Match button width with input fields */
  padding: 0.8em;
  font-size: 1em;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  margin-top: 1em;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

/* Muted green for buttons */
button {
  background-color: #4caf50;
  color: white;
}

button:hover {
  background-color: #388e3c;
}

@media (max-width: 600px) {
  .auth-card {
    padding: 1.5em;
    margin: 1em;
  }

  .auth-heading {
    font-size: 1.8em;
  }

  .auth-subheading {
    font-size: 0.9em;
  }
}
</style>
