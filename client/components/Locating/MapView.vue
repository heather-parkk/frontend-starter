<template>
  <div>
    <h2>Map View</h2>
    <div ref="map" class="map-container"></div>
    <button @click="toggleLocationSharing">{{ location.shared ? "Disable" : "Enable" }} Location Sharing</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import the Leaflet CSS styles
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

// Access user information from store
const userStore = useUserStore();
const { currentUsername } = storeToRefs(userStore); // Using currentUsername

const map = ref<L.Map | null>(null); // Correctly type the map ref
const location = ref({ latitude: 0, longitude: 0, shared: false });

// Fetch user's location when component is mounted
const fetchLocation = async () => {
  try {
    const userLocation = await fetchy("/api/locating", "GET");
    location.value = userLocation;
    updateMap();
  } catch (err) {
    console.error("Error fetching location:", err);
  }
};

// Initialize the map (using Leaflet as an example)
const initializeMap = () => {
  var map = L.map("map").setView([51.505, -0.09], 13);

  if (map.value === null) {
    map.value = L.map("map").setView([location.value.latitude, location.value.longitude], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([location.value.latitude, location.value.longitude]).addTo(map.value).bindPopup("Your location").openPopup();
  }
};

// Update the map with the user's new location
const updateMap = () => {
  if (map.value) {
    map.value.setView([location.value.latitude, location.value.longitude], 13);
    const marker = L.marker([location.value.latitude, location.value.longitude]).addTo(map.value);
    marker.bindPopup("Your current location").openPopup();
  }
};

// Toggle location sharing
const toggleLocationSharing = async () => {
  const share = !location.value.shared;
  try {
    await fetchy(`/api/locating`, "POST", { body: { share } });
    location.value.shared = share;
  } catch (err) {
    console.error("Error toggling location sharing:", err);
  }
};

onMounted(async () => {
  await fetchLocation();
  initializeMap();
});
</script>

<style scoped>
.map-container {
  height: 400px;
  width: 100%;
}
</style>
