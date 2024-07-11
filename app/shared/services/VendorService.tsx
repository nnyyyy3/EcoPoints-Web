
import { db, storage } from "../utils/firebase";
import { collection, addDoc, updateDoc, getDocs, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Vendor } from "~/shared/types";

export async function addVendorToFirestore(vendor: Vendor) {
  if (!vendor.displayName || !vendor.ownerName || !vendor.phoneNumber || !vendor.email || !vendor.password || !vendor.idPicture) {
    return { success: false, error: "All fields are required and must be defined." };
  }

  try {
    const storageRef = ref(storage, `vendorIDPictures/${(vendor.idPicture as File).name}`);
    await uploadBytes(storageRef, vendor.idPicture as File);
    const downloadURL = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(db, "vendors"), {
      displayName: vendor.displayName,
      ownerName: vendor.ownerName,
      phoneNumber: vendor.phoneNumber,
      email: vendor.email,
      password: vendor.password,
      idPicture: downloadURL,
      createdAt: Timestamp.now(),
    });

    await updateDoc(docRef, { vendorID: docRef.id });

    return { success: true, id: docRef.id };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding vendor to Firestore:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error adding vendor to Firestore:", error);
      return { success: false, error: "Unknown error occurred." };
    }
  }
}

export async function getVendorsFromFirestore(): Promise<Vendor[]> {
  const vendorsCollection = collection(db, "vendors");
  const vendorSnapshot = await getDocs(vendorsCollection);
  const vendorList = vendorSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Vendor
  }));
  return vendorList;
}
