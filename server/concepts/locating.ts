import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { BadValuesError, NotAllowedError, NotFoundError } from "./errors";

export interface LocationDoc extends BaseDoc {
  user: ObjectId;
  latitude: number;
  longitude: number;
  locationName: string;
  shared: boolean; // whether the user is sharing their location
}

export interface LocationInfo {
  locationName: string;
  locationDesc: string;
  locationAttr: string[]; // attractions or notable features
  latitude: number;
  longitude: number;
}

/**
 * concept: Locating
 */
export default class LocatingConcept {
  public readonly locations: DocCollection<LocationDoc>;
  public readonly locationDetails: Map<string, LocationInfo>;

  /**
   * Make an instance of Locating.
   */
  constructor(collectionName: string) {
    this.locations = new DocCollection<LocationDoc>(collectionName);

    // Initialize a sample map of location details
    this.locationDetails = new Map<string, LocationInfo>();
    this.initializeLocationDetails();
  }

  // Share or stop sharing location
  async setLocationSharing(userId: ObjectId, share: boolean) {
    const location = await this.locations.readOne({ user: userId });
    if (!location) {
      throw new NotFoundError("Location not found!");
    }
    await this.locations.partialUpdateOne({ user: userId }, { shared: share });
    return { msg: `Location sharing ${share ? "enabled" : "disabled"}!` };
  }

  // Update a user's location
  async updateLocation(userId: ObjectId, latitude: number, longitude: number, locationName: string) {
    await this.assertValidLocation(latitude, longitude, locationName);
    const existingLocation = await this.locations.readOne({ user: userId });

    if (existingLocation) {
      await this.locations.partialUpdateOne({ user: userId }, { latitude, longitude, locationName });
      return { msg: "Location updated successfully!" };
    } else {
      await this.locations.createOne({ user: userId, latitude, longitude, locationName, shared: false });
      return { msg: "Location set successfully!" };
    }
  }

  // View a user's location
  async viewLocation(userId: ObjectId) {
    const location = await this.locations.readOne({ user: userId, shared: true });
    if (!location) {
      throw new NotAllowedError("User is not sharing their location or location not found.");
    }
    return location;
  }

  // Get location details by location name
  async getLocationDetails(locationName: string) {
    const details = this.locationDetails.get(locationName);
    if (!details) {
      throw new NotFoundError(`Details for location ${locationName} not found.`);
    }
    return details;
  }

  // Initialize some sample location details
  private initializeLocationDetails() {
    this.locationDetails.set("New York City", {
      locationName: "New York City",
      locationDesc: "The largest city in the USA, known for Times Square, Central Park, and Broadway.",
      locationAttr: ["Times Square", "Central Park", "Statue of Liberty"],
      latitude: 40.7128,
      longitude: -74.006,
    });
    this.locationDetails.set("Paris", {
      locationName: "Paris",
      locationDesc: "The capital of France, known for the Eiffel Tower, art, and culture.",
      locationAttr: ["Eiffel Tower", "Louvre Museum", "Notre Dame"],
      latitude: 48.8566,
      longitude: 2.3522,
    });
    this.locationDetails.set("Bangkok", {
      locationName: "Bangkok",
      locationDesc: "The bustling capital of Thailand, known for ornate shrines and vibrant street life.",
      locationAttr: ["Grand Palace", "Wat Arun", "Floating Markets"],
      latitude: 13.7563,
      longitude: 100.5018,
    });
    this.locationDetails.set("Barcelona", {
      locationName: "Barcelona",
      locationDesc: "A Spanish city famed for its art, architecture, and the iconic Sagrada Familia.",
      locationAttr: ["Sagrada Familia", "Park Güell", "La Rambla"],
      latitude: 41.3851,
      longitude: 2.1734,
    });
    this.locationDetails.set("Tokyo", {
      locationName: "Tokyo",
      locationDesc: "The bustling capital of Japan, famous for its skyscrapers, shopping, and cherry blossoms.",
      locationAttr: ["Shibuya Crossing", "Tokyo Tower", "Meiji Shrine"],
      latitude: 35.6895,
      longitude: 139.6917,
    });
    this.locationDetails.set("Sydney", {
      locationName: "Sydney",
      locationDesc: "The largest city in Australia, known for the Sydney Opera House and beautiful beaches.",
      locationAttr: ["Sydney Opera House", "Bondi Beach", "Sydney Harbour Bridge"],
      latitude: -33.8688,
      longitude: 151.2093,
    });
    this.locationDetails.set("Cape Town", {
      locationName: "Cape Town",
      locationDesc: "A coastal city in South Africa, famous for Table Mountain and vibrant culture.",
      locationAttr: ["Table Mountain", "Cape Point", "Robben Island"],
      latitude: -33.9249,
      longitude: 18.4241,
    });
    this.locationDetails.set("Dubai", {
      locationName: "Dubai",
      locationDesc: "A luxury destination in the UAE, known for the Burj Khalifa and expansive malls.",
      locationAttr: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall"],
      latitude: 25.2048,
      longitude: 55.2708,
    });
    this.locationDetails.set("Rome", {
      locationName: "Rome",
      locationDesc: "The capital of Italy, rich in history with ancient ruins like the Colosseum.",
      locationAttr: ["Colosseum", "Vatican City", "Trevi Fountain"],
      latitude: 41.9028,
      longitude: 12.4964,
    });
    this.locationDetails.set("Amsterdam", {
      locationName: "Amsterdam",
      locationDesc: "The capital of the Netherlands, known for its canals, museums, and cycling culture.",
      locationAttr: ["Rijksmuseum", "Anne Frank House", "Canal District"],
      latitude: 52.3676,
      longitude: 4.9041,
    });
    this.locationDetails.set("Berlin", {
      locationName: "Berlin",
      locationDesc: "The capital of Germany, known for its WWII history and vibrant art scene.",
      locationAttr: ["Brandenburg Gate", "Berlin Wall", "Museum Island"],
      latitude: 52.52,
      longitude: 13.405,
    });
    this.locationDetails.set("Lisbon", {
      locationName: "Lisbon",
      locationDesc: "The hilly, coastal capital city of Portugal known for its tiles and historic tram rides.",
      locationAttr: ["Belem Tower", "Alfama District", "Jerónimos Monastery"],
      latitude: 38.7169,
      longitude: -9.1399,
    });
    this.locationDetails.set("Istanbul", {
      locationName: "Istanbul",
      locationDesc: "A transcontinental city in Turkey known for its rich history and vibrant bazaars.",
      locationAttr: ["Hagia Sophia", "Blue Mosque", "Grand Bazaar"],
      latitude: 41.0082,
      longitude: 28.9784,
    });
    this.locationDetails.set("Mexico City", {
      locationName: "Mexico City",
      locationDesc: "The bustling capital of Mexico, known for its historic sites and vibrant culture.",
      locationAttr: ["Zócalo", "Frida Kahlo Museum", "Chapultepec Castle"],
      latitude: 19.4326,
      longitude: -99.1332,
    });
    this.locationDetails.set("Singapore", {
      locationName: "Singapore",
      locationDesc: "A modern city-state in Southeast Asia, known for its cleanliness and Gardens by the Bay.",
      locationAttr: ["Gardens by the Bay", "Marina Bay Sands", "Sentosa Island"],
      latitude: 1.3521,
      longitude: 103.8198,
    });
    this.locationDetails.set("Buenos Aires", {
      locationName: "Buenos Aires",
      locationDesc: "The capital of Argentina, known for tango, European architecture, and vibrant culture.",
      locationAttr: ["Obelisco", "La Boca", "Recoleta Cemetery"],
      latitude: -34.6037,
      longitude: -58.3816,
    });
  }

  // Internal helper function to validate location data
  private async assertValidLocation(latitude: number, longitude: number, locationName: string) {
    if (!locationName || typeof latitude !== "number" || typeof longitude !== "number") {
      throw new BadValuesError("Location name, latitude, and longitude must be valid.");
    }
  }
}
