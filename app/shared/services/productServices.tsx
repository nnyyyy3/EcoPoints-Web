import { db, storage } from "../utils/firebase";
import { collection, addDoc, updateDoc, getDocs, query, where, Timestamp, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Reward } from "~/shared/types";

export async function addRewardToFirestore(reward: Reward) {
  if (!reward.rewardName || !reward.requiredPoint || !reward.rewardStock || !reward.expiryDate || !reward.rewardDescription || !reward.rewardPicture || !reward.vendorID || !reward.category || !reward.campus || !reward.stallName) {
    return { success: false, error: "All fields are required and must be defined." };
  }

  try {
    console.log("Authenticated vendorID:", reward.vendorID);

    const storageRef = ref(storage, `rewardPictures/${(reward.rewardPicture as File).name}`);
    await uploadBytes(storageRef, reward.rewardPicture as File);
    const downloadURL = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(db, "rewards"), {
      rewardName: reward.rewardName,
      requiredPoint: reward.requiredPoint,
      rewardStock: reward.rewardStock,
      expiryDate: reward.expiryDate,
      rewardDescription: reward.rewardDescription,
      rewardPicture: downloadURL,
      vendorID: reward.vendorID,
      stallName: reward.stallName,
      createdAt: Timestamp.now(),
      category: reward.category,
      campus: reward.campus,
    });

    await updateDoc(docRef, { rewardID: docRef.id });

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

export async function getRewardsForVendor(vendorID: string): Promise<Reward[]> {
  console.log("Fetching rewards for vendorID:", vendorID); 
  
  const rewardsCollection = collection(db, "rewards");
  const q = query(rewardsCollection, where("vendorID", "==", vendorID));
  const rewardSnapshot = await getDocs(q);
  const rewardList = rewardSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Reward
  }));
  return rewardList;
}

export async function getRewardsFromFirestore(): Promise<Reward[]> {
  const rewardsCollection = collection(db, "rewards");
  const rewardSnapshot = await getDocs(rewardsCollection);
  const rewardList = rewardSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Reward[];
  return rewardList;
}

export async function getRewardById(rewardId: string): Promise<Reward | null> {
  const rewardDoc = await getDoc(doc(db, "rewards", rewardId));
  if (rewardDoc.exists()) {
    return { id: rewardDoc.id, ...rewardDoc.data() } as Reward;
  } else {
    return null;
  }
}
