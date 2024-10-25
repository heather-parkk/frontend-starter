<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import MessageInput from "../Chatting/MessageInput.vue";
import MessageList from "../Chatting/MessageList.vue";
import SafeMeeting from "../Meeting/SafeMeeting.vue";

// Use defineProps to properly access props
const props = defineProps<{
  chatId: string;
  userId: string;
}>();

const messages = ref<any[]>([]);
const showModal = ref(false); // Control visibility of SafeMeeting modal

const openSafeMeetingModal = () => {
  showModal.value = true; // Set modal visibility to true
};

const fetchMessages = async () => {
  try {
    const response = await fetchy(`/api/chatting/${props.chatId}`, "GET");
    messages.value = response;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
  }
};

const sendMessage = async (message: string) => {
  try {
    await fetchy(`/api/chatting/${props.chatId}/message`, "POST", {
      body: { senderId: props.userId, message },
    });
    await fetchMessages();
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};

onMounted(fetchMessages);
</script>

<template>
  <div class="chat-room">
    <h2>Chat Room</h2>
    <div class="messages">
      <MessageList :messages="messages" />
    </div>
    <MessageInput @sendMessage="sendMessage" />

    <!-- Propose Safe Meeting Button -->
    <button @click="openSafeMeetingModal" class="propose-meeting-button">Propose Safe Meeting</button>

    <!-- SafeMeeting Modal -->
    <SafeMeeting :showSafeMeetingModal="showModal" />
  </div>
</template>

<style scoped>
.chat-room {
  display: flex;
  flex-direction: column;
}
.messages {
  flex-grow: 1;
  overflow-y: auto;
}

.propose-meeting-button {
  margin-top: 1em;
  padding: 0.5em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.propose-meeting-button:hover {
  background-color: #0056b3;
}
</style>
