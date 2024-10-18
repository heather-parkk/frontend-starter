<template>
  <div>
    <h2>Your Ratings</h2>
    <ul>
      <li v-for="rating in ratings" :key="rating._id.toString()">Rated {{ rating.ratee }}: {{ rating.rating ? "Like" : "Dislike" }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { RatingDoc } from "../../../server/concepts/matching";
import { fetchy } from "../../utils/fetchy";

const ratings = ref<RatingDoc[]>([]); // Specify the type of ratings

const fetchRatings = async () => {
  try {
    const response = await fetchy("/api/rate", "GET");
    ratings.value = response; // Assuming the response is of type RatingDoc[]
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchRatings);
</script>

<style scoped>
/* Add styles here */
</style>
