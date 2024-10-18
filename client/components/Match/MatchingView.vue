<template>
  <div>
    <RateUser @refreshRatings="fetchRatings" />
    <RateList />
    <MatchList />
  </div>
  
</template>

  <script setup lang="ts">
    import RateUser from "./RateUser.vue";
    import RateList from "./RateList.vue";
    import MatchList from "./MatchList.vue";
    import { ref } from "vue";

    const ratings = ref([]); // Assuming you'll store ratings here

    const fetchRatings = async () => {
      try {
        const response = await fetchy("/api/rate", "GET"); // Adjust this API endpoint accordingly
        ratings.value = response; // Assuming response is the array of ratings
      } catch (err) {
        console.error("Failed to fetch ratings:", err);
      }
    };
  </script>

  <style scoped>
    /* Add styles here */
  </style>
</template>
