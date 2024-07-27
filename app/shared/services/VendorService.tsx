import { db, storage } from "../utils/firebase";
import { collection, addDoc, getDocs, query, where, Timestamp, doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Vendor } from "~/shared/types";

export async function addVendorToFirestore(vendor: Vendor) {
  if (!vendor.stallName || !vendor.ownerName || !vendor.phoneNumber || !vendor.email || !vendor.password || !vendor.idPicture || !vendor.profilePicture) {
    return { success: false, error: "All fields are required and must be defined." };
  }

  try {
    // Upload ID picture
    const idPictureRef = ref(storage, `vendorIDPictures/${(vendor.idPicture as File).name}`);
    await uploadBytes(idPictureRef, vendor.idPicture as File);
    const idPictureURL = await getDownloadURL(idPictureRef);

    // Upload profile picture
    const profilePictureRef = ref(storage, `vendorProfilePictures/${(vendor.profilePicture as File).name}`);
    await uploadBytes(profilePictureRef, vendor.profilePicture as File);
    const profilePictureURL = await getDownloadURL(profilePictureRef);

    // Add vendor document to Firestore
    const docRef = await addDoc(collection(db, "vendors"), {
      stallName: vendor.stallName,
      ownerName: vendor.ownerName,
      phoneNumber: vendor.phoneNumber,
      email: vendor.email,
      password: vendor.password,
      idPicture: idPictureURL,
      profilePicture: profilePictureURL,
      createdAt: Timestamp.now(),
      vendorID: vendor.vendorID,
    });

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

export async function deleteVendor(vendorId: string) {
  try {
    const vendorDocRef = doc(db, "vendors", vendorId);
    const vendorDoc = await getDoc(vendorDocRef);

    if (vendorDoc.exists()) {
      const vendorData = vendorDoc.data();
      const idPictureRef = ref(storage, vendorData.idPicture);
      await deleteObject(idPictureRef);

      const profilePictureRef = ref(storage, vendorData.profilePicture);
      await deleteObject(profilePictureRef);

      await deleteDoc(vendorDocRef);

      return { success: true };
    } else {
      throw new Error("Vendor not found");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting vendor from Firestore:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error deleting vendor from Firestore:", error);
      return { success: false, error: "Unknown error occurred." };
    }
  }
}

export async function getVendorByUID(uid: string): Promise<Vendor | null> {
  try {
    const vendorsRef = collection(db, "vendors");
    const q = query(vendorsRef, where("vendorID", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    }

    const vendorData = querySnapshot.docs[0].data() as Vendor;
    console.log("Vendor data retrieved:", vendorData);
    return vendorData;
  } catch (error) {
    console.error("Error fetching vendor by vendorID:", error);
    return null;
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

export { getVendorByUID as getVendorByVendorID };
