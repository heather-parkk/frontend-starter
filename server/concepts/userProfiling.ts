import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { BadValuesError, NotFoundError } from "./errors";

export interface ProfileDoc extends BaseDoc {
  user: ObjectId;
  gender: "man" | "woman" | "nonbinary" | "other";
  age: number; // Between 16 and 99
  travelStyle: "relaxed" | "fast-paced";
  location: "Barcelona" | "Thailand" | "London";
  question_1: "Agree" | "Disagree" | "Neutral";
  question_2: "Agree" | "Disagree" | "Neutral";
}

export type ProfileDetails = Omit<ProfileDoc, "user">;

/**
 * concept: UserProfiling
 */
export default class UserProfilingConcept {
  public readonly profiles: DocCollection<ProfileDoc>;

  constructor(collectionName: string) {
    this.profiles = new DocCollection<ProfileDoc>(collectionName);
    void this.profiles.collection.createIndex({ user: 1 });
  }

  async updateProfile(userId: ObjectId, profileDetails: ProfileDetails) {
    await this.assertValidProfileDetails(profileDetails);

    const existingProfile = await this.profiles.readOne({ user: userId });

    if (existingProfile) {
      await this.profiles.partialUpdateOne({ user: userId }, profileDetails);
      return { msg: "Profile updated successfully!" };
    } else {
      await this.profiles.createOne({ user: userId, ...profileDetails });
      return { msg: "Profile created successfully!" };
    }
  }

  async getProfile(userId: ObjectId) {
    const profile = await this.profiles.readOne({ user: userId });
    if (!profile) {
      throw new NotFoundError("Profile not found!");
    }
    return profile;
  }

  async deleteProfile(userId: ObjectId) {
    const deleted = await this.profiles.deleteOne({ user: userId });
    if (!deleted) {
      throw new NotFoundError("Profile not found to delete!");
    }
    return { msg: "Profile deleted successfully!" };
  }

  private async assertValidProfileDetails(profileDetails: ProfileDetails) {
    const { gender, age, travelStyle, location, question_1, question_2 } = profileDetails;

    if (!gender || !age || !travelStyle || !location || !question_1 || !question_2) {
      throw new BadValuesError("All profile fields must be filled.");
    }

    const validGenders = ["man", "woman", "nonbinary", "other"];
    if (!validGenders.includes(gender)) {
      throw new BadValuesError("Gender must be one of: man, woman, nonbinary, other.");
    }

    if (typeof age !== "number" || age < 16 || age > 99) {
      throw new BadValuesError("Age must be a valid number between 16 and 99.");
    }

    const validTravelStyles = ["relaxed", "fast-paced"];
    if (!validTravelStyles.includes(travelStyle)) {
      throw new BadValuesError("Travel style must be either 'relaxed' or 'fast-paced'.");
    }

    const validLocations = ["Barcelona", "Thailand", "London"];
    if (!validLocations.includes(location)) {
      throw new BadValuesError("Location must be either 'Barcelona', 'Thailand', or 'London'.");
    }

    const validResponses = ["Agree", "Disagree", "Neutral"];
    if (!validResponses.includes(question_1) || !validResponses.includes(question_2)) {
      throw new BadValuesError("Responses to questions must be 'Agree', 'Disagree', or 'Neutral'.");
    }
  }
}
