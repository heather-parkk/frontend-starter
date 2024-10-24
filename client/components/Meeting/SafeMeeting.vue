<template>
  <div class="safe-meeting">
    <h2>Propose a Safe Meeting</h2>
    <form @submit.prevent="proposeMeeting">
      <div>
        <label for="date">Date:</label>
        <input type="date" v-model="meeting.date" required />
      </div>
      <div>
        <label for="time">Time:</label>
        <input type="time" v-model="meeting.time" required />
      </div>
      <div>
        <label for="location">Location:</label>
        <input type="text" v-model="meeting.location" placeholder="Location" required />
      </div>
      <div>
        <label for="emergencyContact">Emergency Contact:</label>
        <input type="tel" v-model="meeting.emergencyContact" placeholder="Emergency Contact Number" required />
      </div>
      <button type="submit">Propose Meeting</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy"; // Ensure your fetch utility is correctly imported

const meeting = ref({
  date: "",
  time: "",
  location: "",
  emergencyContact: "",
});

const proposeMeeting = async () => {
  try {
    const response = await fetchy("/api/meetings", "POST", {
      body: { ...meeting.value }, // Send meeting details
    });
    console.log("Meeting proposed:", response);
    alert("Meeting proposed successfully!");
  } catch (error) {
    console.error("Failed to propose meeting:", error);
    alert("Error proposing meeting. Please try again.");
  }
};
</script>

<style scoped>
.safe-meeting {
  margin: 1em;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 0.5em;
}
button {
  margin-top: 1em;
  padding: 0.5em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
