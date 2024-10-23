<template>
  <div>
    <h2>Your Matches</h2>
    <ul>
      <li v-for="match in matches" :key="match._id.toString()">Matched with: {{ match.ratee }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { RatingDoc } from "../../../server/concepts/matching";
import { fetchy } from "../../utils/fetchy";

const matches = ref<RatingDoc[]>([]); // Specify the type of matches

const fetchMatches = async () => {
  try {
    const response = await fetchy("/api/matches", "GET"); // Adjust endpoint as necessary
    matches.value = response; // Assuming response is of type MatchDoc[]
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchMatches);
</script>

<style scoped>
/* Add styles here */
</style>
