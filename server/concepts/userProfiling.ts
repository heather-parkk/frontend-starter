import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { BadValuesError } from "./errors";

export interface ProfileDoc extends BaseDoc {
  user: ObjectId;
  gender: "man" | "woman" | "nonbinary" | "other";
  age: number; // Between 16 and 99
  travelStyle: "relaxed" | "fast-paced";
  location:
    | "Barcelona"
    | "Thailand"
    | "London"
    | "Paris"
    | "New York"
    | "Tokyo"
    | "Sydney"
    | "Cape Town"
    | "Dubai"
    | "Rome"
    | "Amsterdam"
    | "Berlin"
    | "Lisbon"
    | "Istanbul"
    | "Mexico City"
    | "Singapore"
    | "Buenos Aires";
  question_1: "Agree" | "Disagree" | "Neutral";
  question_2: "Agree" | "Disagree" | "Neutral";
  dateCreated: Date;
  dateUpdated: Date;
}

export type ProfileDetails = Omit<ProfileDoc, "user">;
export type ProfileUpdate = Omit<ProfileDetails, "dateCreated" | "dateUpdated" | "_id">;

/**
 * concept: UserProfiling
 */
export default class UserProfilingConcept {
  public readonly profiles: DocCollection<ProfileDoc>;

  constructor(collectionName: string) {
    this.profiles = new DocCollection<ProfileDoc>(collectionName);
    // Create the index on the collection for user
    void this.profiles.collection.createIndex({ user: 1 });
  }

  // Fetch a user's profile by their user ID
  async getProfile(userId: ObjectId): Promise<ProfileDoc | null> {
    const profile = await this.profiles.readOne({ user: userId });
    if (!profile) {
      console.log(`Profile not found for user ID: ${userId}`);
    } else {
      console.log(`Profile found for user ID: ${userId}`, profile);
    }
    return profile;
  }

  // Create a new profile with the given user ID and profile data
  async createProfile(userId: ObjectId, profileData: ProfileUpdate): Promise<ProfileDoc> {
    const newProfile = {
      user: userId,
      ...profileData,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    const result = await this.profiles.readOne({ user: userId });

    // Check if the result is null before trying to access _id
    if (!result) {
      throw new Error("Profile not found for the given user.");
    }

    const profileId = result._id; // Now it is safe to access _id since we know result is not null

    // Return the profile with the _id added from the result
    return {
      ...newProfile,
      _id: profileId, // Use the inserted _id from MongoDB
    };
  }

  // Create or update the user profile
  async updateProfile(userId: ObjectId, profileDetails: ProfileUpdate) {
    // Convert age to a number if it's a string
    if (typeof profileDetails.age === "string") {
      profileDetails.age = parseInt(profileDetails.age, 10);
    }

    await this.assertValidProfileDetails(profileDetails);

    const existingProfile = await this.profiles.readOne({ user: userId });
    const currentDate = new Date();

    if (existingProfile) {
      // If the profile exists, update it and set dateUpdated
      await this.profiles.partialUpdateOne({ user: userId }, { ...profileDetails, dateUpdated: currentDate });
      return { msg: "Profile updated successfully!" };
    } else {
      // If the profile doesn't exist, create a new one
      await this.profiles.createOne({
        user: userId,
        ...profileDetails,
        dateCreated: currentDate,
        dateUpdated: currentDate,
      });
      return { msg: "Profile created successfully!" };
    }
  }

  // Internal helper function to validate the profile details
  private async assertValidProfileDetails(profileDetails: ProfileUpdate) {
    const { gender, age, travelStyle, location, question_1, question_2 } = profileDetails;

    if (!gender || !age || !travelStyle || !location || !question_1 || !question_2) {
      console.error("Validation failed: Missing fields", profileDetails);
      throw new BadValuesError("All profile fields must be filled.");
    }

    const validGenders = ["man", "woman", "nonbinary", "other"];
    if (!validGenders.includes(gender)) {
      console.error("Invalid gender:", gender);
      throw new BadValuesError("Gender must be one of: man, woman, nonbinary, other.");
    }

    if (typeof age !== "number" || age < 16 || age > 99) {
      console.error("Invalid age:", age);
      throw new BadValuesError("Age must be a valid number between 16 and 99.");
    }

    const validTravelStyles = ["relaxed", "fast-paced"];
    if (!validTravelStyles.includes(travelStyle)) {
      console.error("Invalid travel style:", travelStyle);
      throw new BadValuesError("Travel style must be either 'relaxed' or 'fast-paced'.");
    }

    const validLocations = [
      "Barcelona",
      "Thailand",
      "London",
      "New York City",
      "Paris",
      "Bangkok",
      "Tokyo",
      "Sydney",
      "Cape Town",
      "Dubai",
      "Rome",
      "Amsterdam",
      "Berlin",
      "Lisbon",
      "Istanbul",
      "Mexico City",
      "Singapore",
      "Buenos Aires",
    ];
    if (!validLocations.includes(location)) {
      console.error("Invalid location:", location);
      throw new BadValuesError("Location must be within our selected list. More cities to be added soon!");
    }

    const validResponses = ["Agree", "Disagree", "Neutral"];
    if (!validResponses.includes(question_1) || !validResponses.includes(question_2)) {
      console.error("Invalid question responses:", question_1, question_2);
      throw new BadValuesError("Responses to questions must be 'Agree', 'Disagree', or 'Neutral'.");
    }
  }
}
