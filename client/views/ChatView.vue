<template>
  <div class="chat-room">
    <h2>Chat Room</h2>
    <div class="messages">
      <MessageList :messages="messages" />
    </div>
    <MessageInput @sendMessage="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router"; // Import to access route parameters
import { ChatMessageDoc } from "../../server/concepts/chatting";
import MessageInput from "../components/Chatting/MessageInput.vue";
import MessageList from "../components/Chatting/MessageList.vue";
import { fetchy } from "../utils/fetchy";

// Get route parameters
const route = useRoute();
const chatId = route.params.chatId as string; // Assuming chatId is part of the route
const userId = "your-user-id"; // Replace this with the actual user ID from your store or authentication context

// Messages state
const messages = ref<ChatMessageDoc[]>([]);

// Fetch messages when the component is mounted
const fetchMessages = async () => {
  try {
    const response = await fetchy(`/api/chatting/${chatId}`, "GET");
    messages.value = response; // Assuming response contains the messages array
  } catch (error) {
    console.error("Failed to fetch messages:", error);
  }
};

// Send message function
const sendMessage = async (message: string) => {
  try {
    await fetchy(`/api/chatting/${chatId}/message`, "POST", {
      body: { senderId: userId, message }, // Ensure message is passed correctly
    });
    await fetchMessages(); // Refresh messages after sending
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};

// Fetch messages when the component mounts
onMounted(fetchMessages);
</script>

<style scoped>
.chat-room {
  display: flex;
  flex-direction: column;
}
.messages {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
