<template>
  <form @submit.prevent="rateUser">
    <label for="targetUserId">Target User ID:</label>
    <input type="text" v-model="targetUserId" required />

    <label for="like">Like:</label>
    <select v-model="like">
      <option :value="true">Like</option>
      <option :value="false">Dislike</option>
    </select>

    <button type="submit">Rate User</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const targetUserId = ref("");
const like = ref(true);

const rateUser = async () => {
  try {
    await fetchy("/api/rate", "POST", {
      body: { targetUserId: targetUserId.value, like: like.value },
    });
    alert("Match submitted!");
    targetUserId.value = ""; // Reset the input
  } catch (err) {
    console.error(err);
    alert("Failed to submit match.");
  }
};
</script>

<style scoped>
/* Add styles here */
</style>
