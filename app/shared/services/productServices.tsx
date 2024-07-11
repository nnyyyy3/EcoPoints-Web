import { db, storage } from "../utils/firebase";
import { collection, addDoc, updateDoc, getDocs, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Reward } from "~/shared/types";

export async function addRewardToFirestore(reward: Reward) {
  if (!reward.rewardName || !reward.requiredPoint || !reward.rewardStock || !reward.expiryDate || !reward.rewardDescription || !reward.rewardPicture || !reward.vendorID) {
    return { success: false, error: "All fields are required and must be defined." };
  }

  try {
    // Upload the file to Firebase Storage
    const storageRef = ref(storage, `rewardPictures/${(reward.rewardPicture as File).name}`);
    await uploadBytes(storageRef, reward.rewardPicture as File);
    const downloadURL = await getDownloadURL(storageRef);

    // Save the reward data to Firestore
    const docRef = await addDoc(collection(db, "rewards"), {
      rewardName: reward.rewardName,
      requiredPoint: reward.requiredPoint,
      rewardStock: reward.rewardStock,
      expiryDate: reward.expiryDate,
      rewardDescription: reward.rewardDescription,
      rewardPicture: downloadURL,
      vendorID: reward.vendorID,
      createdAt: Timestamp.now(),
    });

    // Update the document with rewardID
    await updateDoc(docRef, {
      rewardID: docRef.id
    });

    return { success: true, id: docRef.id };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding reward to Firestore:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error adding reward to Firestore:", error);
      return { success: false, error: "Unknown error occurred." };
    }
  }
}

export async function getRewardsFromFirestore(): Promise<Reward[]> {
  const rewardsCollection = collection(db, "rewards");
  const rewardSnapshot = await getDocs(rewardsCollection);
  const rewardList = rewardSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Reward
  }));
  return rewardList;
}
