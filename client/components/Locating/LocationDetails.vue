<!-- <template>
  <div v-if="locationInfo">
    <h2>{{ locationInfo.locationName }}</h2>
    <p>{{ locationInfo.locationDesc }}</p>
    <h3>Top Attractions:</h3>
    <ul>
      <li v-for="attr in locationInfo.locationAttr" :key="attr">{{ attr }}</li>
    </ul>
  </div>
  <div v-else>
    <p>Loading location information...</p>
  </div>
</template>

<script setup lang="ts">
import { fetchy } from "@/utils/fetchy"; // Your fetch utility
import { onMounted, ref } from "vue";

// Define the structure of locationInfo
interface LocationInfo {
  locationName: string;
  locationDesc: string;
  locationAttr: string[];
}

const locationInfo = ref<LocationInfo | null>(null); // Set the type for locationInfo

// Fetch city details based on location name (e.g., "New York City")
const fetchLocationInfo = async (locationName: string) => {
  try {
    const response = await fetchy(`/api/locating/${locationName}`, "GET");
    locationInfo.value = response; // Assuming the response has the structure matching LocationInfo
  } catch (err) {
    console.error("Error fetching location details:", err);
  }
};

// Get location details when the component is mounted (replace 'New York City' with dynamic input)
onMounted(async () => {
  await fetchLocationInfo("New York City");
});
</script>

<style scoped>
h2 {
  font-size: 1.5em;
}
</style> -->
