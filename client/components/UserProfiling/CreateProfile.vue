<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const gender = ref("");
const age = ref(0);
const travelStyle = ref("");
const location = ref("");
const question_1 = ref("");
const question_2 = ref("");
const emit = defineEmits(["refreshProfiles"]);

const createOrUpdateProfile = async () => {
  try {
    await fetchy("/api/profile", "PATCH", {
      body: {
        gender: gender.value,
        age: age.value,
        travelStyle: travelStyle.value,
        location: location.value,
        question_1: question_1.value,
        question_2: question_2.value,
      },
    });
    emit("refreshProfiles");
    clearForm();
  } catch (error) {
    console.error(error);
  }
};

const clearForm = () => {
  gender.value = "";
  age.value = 0;
  travelStyle.value = "";
  location.value = "";
  question_1.value = "";
  question_2.value = "";
};
</script>

<template>
  <form @submit.prevent="createOrUpdateProfile">
    <label for="gender">Gender:</label>
    <input type="text" v-model="gender" required />

    <label for="age">Age:</label>
    <input type="number" v-model="age" required />

    <label for="travelStyle">Travel Style:</label>
    <input type="text" v-model="travelStyle" required />

    <label for="location">Location:</label>
    <input type="text" v-model="location" required />

    <label for="question_1">Question 1:</label>
    <input type="text" v-model="question_1" required />

    <label for="question_2">Question 2:</label>
    <input type="text" v-model="question_2" required />

    <button type="submit">Save Profile</button>
  </form>
</template>

<style scoped>
/* Add your styles here */
</style>
