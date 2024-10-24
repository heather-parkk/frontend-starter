<template>
  <div>
    <h2>{{ locationDetails.locationName }}</h2>
    <p>{{ locationDetails.locationDesc }}</p>
    <h3>Attractions</h3>
    <ul>
      <li v-for="attr in locationDetails.locationAttr" :key="attr">{{ attr }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const locationDetails = ref({
  locationName: "",
  locationDesc: "",
  locationAttr: [],
});

// Fetch the location details based on the location name passed through route
const fetchLocationDetails = async (locationName: string) => {
  try {
    const response = await fetchy(`/api/location/${locationName}`);
    locationDetails.value = response;
  } catch (err) {
    console.error("Error fetching location details:", err);
  }
};

onMounted(() => {
  const locationName = route.params.locationName;
  fetchLocationDetails(locationName);
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
