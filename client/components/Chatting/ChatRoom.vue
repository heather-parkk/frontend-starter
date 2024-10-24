<template>
  <div class="chat-room">
    <h2>Chat Room</h2>
    <div class="messages">
      <MessageList :messages="messages" />
    </div>
    <MessageInput @sendMessage="sendMessage" />

    <!-- SafeMeeting button -->
    <button @click="navigateToSafeMeeting">Propose Safe Meeting</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchy } from "../../utils/fetchy";
import MessageInput from "../Chatting/MessageInput.vue";
import MessageList from "../Chatting/MessageList.vue";

const router = useRouter();

const navigateToSafeMeeting = () => {
  router
    .push({ name: "SafeMeeting" })
    .then(() => {
      console.log("Navigation successful!");
    })
    .catch((error) => {
      console.error("Navigation error:", error);
    });
};

// Define props with appropriate types
const props = defineProps<{
  chatId: string;
  userId: string;
}>();

const messages = ref<any[]>([]); // Define the messages array with a specific type if known

const fetchMessages = async () => {
  try {
    const response = await fetchy(`/api/chatting/${props.chatId}`, "GET");
    messages.value = response; // Assuming response contains messages array
  } catch (error) {
    console.error("Failed to fetch messages:", error);
  }
};

// Define the sendMessage function with a specific type for the message parameter
const sendMessage = async (message: string) => {
  try {
    await fetchy(`/api/chatting/${props.chatId}/message`, "POST", {
      body: { senderId: props.userId, message },
    });
    await fetchMessages(); // Refresh messages after sending
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};

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
