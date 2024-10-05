import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

const getUserById = async (userId) => {
  if (!userId) return;
  const userRef = doc(db, "Users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    return userData;
  } else {
    console.log("Didnt find any user");
  }
};
export const getPetAndOwner = async (userId) => {
  try {
    if (userId) {
      const response = await getUserById(userId);
      return response;
    }
  } catch (error) {
    console.log("Error fetching pet or user:", error);
  }
};
