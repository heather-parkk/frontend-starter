<template>
  <form @submit.prevent="submitMessage">
    <input v-model="message" placeholder="Type a message..." required />
    <button type="submit">Send</button>
  </form>
</template>

<script setup lang="ts">
import { defineEmits, ref } from "vue";

// eslint-disable-next-line vue/valid-define-emits
const emit = defineEmits(); // Define emits
const message = ref("");

const submitMessage = () => {
  if (message.value) {
    emit("sendMessage", message.value); // Emit the message to parent
    message.value = ""; // Clear the input after sending
  }
};
</script>

<style scoped>
form {
  display: flex;
}
input {
  flex-grow: 1;
  padding: 0.5em;
}
button {
  padding: 0.5em;
}
</style>
