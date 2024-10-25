<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Propose a Safe Meeting</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <form @submit.prevent="proposeMeeting">
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="date" v-model="meeting.date" required />
        </div>
        <div class="form-group">
          <label for="time">Time:</label>
          <input type="time" v-model="meeting.time" required />
        </div>
        <div class="form-group">
          <label for="location">Location:</label>
          <input type="text" v-model="meeting.location" placeholder="Location" required />
        </div>
        <div class="form-group">
          <label for="emergencyContact">Emergency Contact:</label>
          <input type="tel" v-model="meeting.emergencyContact" placeholder="Emergency Contact Number" required />
        </div>
        <button type="submit" class="submit-button">Propose Meeting</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import { fetchy } from "../../utils/fetchy"; // Ensure your fetch utility is correctly imported

// Define prop for controlling modal visibility
const props = defineProps({
  showSafeMeetingModal: {
    type: Boolean,
    default: false,
  },
});

const meeting = ref({
  date: "",
  time: "",
  location: "",
  emergencyContact: "",
});

const showModal = ref(props.showSafeMeetingModal);

watch(
  () => props.showSafeMeetingModal,
  (newValue) => {
    showModal.value = newValue;
  },
);

const proposeMeeting = async () => {
  try {
    const response = await fetchy("/api/meetings", "POST", {
      body: { ...meeting.value }, // Send meeting details
    });
    console.log("Meeting proposed:", response);
    alert("Meeting proposed successfully!");
    closeModal();
  } catch (error) {
    console.error("Failed to propose meeting:", error);
    alert("Error proposing meeting. Please try again.");
  }
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  padding: 2em;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.close-button:hover {
  color: #dc3545; /* Red color on hover */
}

.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: 600;
}

input[type="date"],
input[type="time"],
input[type="text"],
input[type="tel"] {
  width: 100%;
  padding: 0.6em;
  margin-top: 0.3em;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.submit-button {
  width: 100%;
  padding: 0.8em;
  background-color: #6cae75;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.submit-button:hover {
  background-color: #558b5a;
}

.submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.3);
}
</style>
