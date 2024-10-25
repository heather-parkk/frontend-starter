<!-- <template>
  <div>
    <h2>{{ locationInfo?.locationName }}</h2>
    <p>{{ locationInfo?.locationDesc }}</p>
    <h3>Top Attractions:</h3>
    <ul>
      <li v-for="attr in locationInfo?.locationAttr" :key="attr">{{ attr }}</li>
    </ul>
    <div ref="map" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";

// Refs to store the location information and the map object
const locationInfo = ref(null);
const map = ref<L.Map | null>(null);

// Fetch location details based on the location name
// Example of calling the new route with a dynamic city name
const fetchLocationInfo = async (locationName: string) => {
  try {
    const response = await fetchy(`/api/locating/${locationName}`, "GET");
    locationInfo.value = response.location; // Update the location info
  } catch (err) {
    console.error("Error fetching location details:", err);
  }
};

// Initialize the map using Leaflet
const initializeMap = () => {
  map.value = L.map("map").setView([51.505, -0.09], 13); // Default coordinates
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);
};

// Update the map with the specific location's latitude and longitude
const updateMap = () => {
  if (map.value && locationInfo.value) {
    const { latitude, longitude } = locationInfo.value;
    map.value.setView([latitude, longitude], 13); // Set the view to the new location
    L.marker([latitude, longitude]).addTo(map.value).bindPopup(`${locationInfo.value.locationName}`).openPopup();
  }
};

// On mount, initialize the map and fetch the location info (you can change 'New York City' to dynamic data)
onMounted(async () => {
  initializeMap();
  await fetchLocationInfo("New York City");
});
</script>

<style scoped>
.map-container {
  height: 400px;
  width: 100%;
}
</style> -->
