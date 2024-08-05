import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/shared/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import ViewCredential from "~/components/admin/features/adminAccVer/ViewCredential";
import { Vendor } from "~/shared/types";

interface LoaderData {
  vendor: Omit<Vendor, 'idPicture' | 'profilePicture'> & { idPicture: string, profilePicture: string, id: string };
}

export const loader: LoaderFunction = async ({ params }) => {
  const { vendorId } = params;

  if (typeof vendorId !== "string") {
    throw new Response("Invalid vendor ID", { status: 400 });
  }

  const vendorDoc = await getDoc(doc(db, "vendors", vendorId));

  if (!vendorDoc.exists()) {
    throw new Response("Vendor not found", { status: 404 });
  }

  const vendorData = vendorDoc.data();

  if (!vendorData) {
    throw new Response("Vendor data is undefined", { status: 500 });
  }
}

  // Explicitly convert the Firestore data to the expected types
//   const vendor: LoaderData['vendor'] = {
//     id: vendorId,
//     stallName: vendorData.stallName as string,
//     ownerName: vendorData.ownerName as string,
//     phoneNumber: vendorData.phoneNumber as string,
//     email: vendorData.email as string,
//     password: vendorData.password as string,
//     idPicture: typeof vendorData.idPicture === 'string' ? vendorData.idPicture : '',
//     profilePicture: typeof vendorData.profilePicture === 'string' ? vendorData.profilePicture : '', 
//     vendorID: vendorData.vendorID as string,
//     status: vendorData.status as string | undefined,
//   };

//   return json<LoaderData>({ vendor });
// };

export default function VendorCredential() {
  const { vendor } = useLoaderData<LoaderData>();

  return <ViewCredential vendor={vendor} />;
}
