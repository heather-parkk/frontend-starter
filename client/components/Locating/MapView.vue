<template>
  <div>
    <h2>User Location</h2>
    <div ref="map" class="map-container"></div>
    <button @click="toggleLocationSharing">{{ location.shared ? "Disable" : "Enable" }} Location Sharing</button>
  </div>
</template>

<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import L from "leaflet"; // Import leaflet library for maps
import "leaflet/dist/leaflet.css"; // Import leaflet CSS
import { onMounted, ref } from "vue";

// Map reference and location object
const map = ref<L.Map | null>(null);
const location = ref({ latitude: 0, longitude: 0, shared: false });

// Fetch the user's current location
const fetchLocation = async () => {
  try {
    const userLocation = await fetchy("/api/locating", "GET");
    location.value = userLocation;
    initializeMap();
  } catch (err) {
    console.error("Error fetching location:", err);
  }
};

// Initialize the map with the user's current location
const initializeMap = () => {
  if (!map.value) {
    map.value = L.map("map").setView([location.value.latitude, location.value.longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value);

    // Add marker to the map
    L.marker([location.value.latitude, location.value.longitude]).addTo(map.value).bindPopup("Your location").openPopup();
  }
};

// Toggle the location sharing status
const toggleLocationSharing = async () => {
  const share = !location.value.shared;
  try {
    await fetchy("/api/locating", "POST", { body: { share } });
    location.value.shared = share;
  } catch (err) {
    console.error("Error toggling location sharing:", err);
  }
};

// Fetch the user's location and initialize the map when component is mounted
onMounted(async () => {
  await fetchLocation(); // Ensure the promise is awaited
});
</script>

<style scoped>
.map-container {
  height: 400px;
  width: 100%;
}
</style>
