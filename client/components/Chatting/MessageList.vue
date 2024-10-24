<template>
  <ul class="message-list">
    <li v-for="msg in props.messages" :key="msg.timestamp.toString()">
      <strong>{{ msg.senderId }}:</strong> {{ msg.message }}
      <span class="timestamp">{{ formatDate(msg.timestamp) }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { ChatMessageDoc } from "../../../server/concepts/chatting"; // Adjust the import path

const props = defineProps({
  messages: Array as () => ChatMessageDoc[], // Ensure the right type
});

const formatDate = (date: string | number | Date) => {
  const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
  return new Date(date).toLocaleString(undefined, options);
};
</script>

<style scoped>
.message-list {
  list-style: none;
  padding: 0;
}
.timestamp {
  font-size: 0.8em;
  color: gray;
}
</style>
