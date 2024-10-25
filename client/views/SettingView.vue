<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

const showDeleteModal = ref(false);

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}

function openDeleteModal() {
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
}
</script>

<template>
  <main class="settings-container">
    <section class="settings-header">
      <h1>Settings for {{ currentUsername }}</h1>
    </section>

    <section class="settings-options">
      <UpdateUserForm />

      <div class="buttons">
        <button class="logout-button" @click="logout">Logout</button>
        <button class="delete-button" @click="openDeleteModal">Delete User</button>
      </div>
    </section>

    <!-- Delete User Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        <div class="modal-buttons">
          <button @click="delete_" class="confirm-delete-button">Confirm</button>
          <button @click="closeDeleteModal" class="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

body {
  margin: 0;
  font-family: "Poppins", sans-serif;
  background-color: #f0f4f8; /* Unified background color for the whole page */
}

.settings-container {
  padding: 2em;
  max-width: 800px;
  margin: 0 auto;
}

.settings-header {
  text-align: center;
  font-family: "Montserrat", sans-serif; /* Modern font for headings */
  margin-bottom: 1em; /* Reduced the margin-bottom to reduce the gap */
}

h1 {
  font-size: 2em;
  font-weight: 600;
  font-family: "Montserrat", sans-serif; /* Modern font for headings */
  color: #333;
}

.settings-options {
  display: flex;
  flex-direction: column;
  gap: 1em; /* Reduced gap between elements */
  margin-top: 0; /* Remove unnecessary margin */
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 1em;
}

.logout-button,
.delete-button {
  flex: 1;
  padding: 0.8em 1.5em;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.logout-button {
  background-color: #4caf50; /* Muted green */
  color: white;
}

.logout-button:hover {
  background-color: #388e3c; /* Darker shade for hover effect */
}

.delete-button {
  background-color: #e57373; /* Muted red */
  color: white;
}

.delete-button:hover {
  background-color: #d32f2f; /* Darker shade for hover effect */
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  padding: 2em;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1em;
  margin-top: 1.5em;
}

.confirm-delete-button {
  background-color: #e57373; /* Muted red */
  color: white;
  padding: 0.5em 1.5em;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.confirm-delete-button:hover {
  background-color: #d32f2f;
}

.cancel-button {
  background-color: #757575; /* Muted grey */
  color: white;
  padding: 0.5em 1.5em;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.cancel-button:hover {
  background-color: #616161;
}
</style>
