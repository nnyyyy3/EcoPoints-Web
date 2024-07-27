import { json, LoaderFunction } from "@remix-run/node";
import { getSession } from "~/shared/session.server";
import { getVendorByUID } from "~/shared/services/VendorService";
import { Vendor } from "~/shared/types";

interface LoaderData {
  vendor: Vendor;
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const vendorID = session.get("userId");

  if (!vendorID) {
    throw new Error("User not authenticated or session expired.");
  }

  const vendor = await getVendorByUID(vendorID);

  if (!vendor) {
    throw new Error("Vendor not found.");
  }

  return json<LoaderData>({ vendor });
};
