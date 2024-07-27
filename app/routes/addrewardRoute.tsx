import { json, redirect, ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { getSession } from "~/shared/session.server";
import { AddRewardForm } from "~/components/addRewards/AddRewardForm";
import { getVendorByVendorID } from "~/shared/services/VendorService";
import { addRewardToFirestore } from "~/shared/services/productServices";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const vendorID = session.get("userId");

  return json({ vendorID });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const rewardName = formData.get("rewardName") as string;
  const requiredPoint = formData.get("requiredPoint") as string;
  const rewardStock = formData.get("rewardStock") as string;
  const expiryDate = formData.get("expiryDate") as string;
  const rewardDescription = formData.get("rewardDescription") as string;
  const rewardPicture = formData.get("rewardPicture") as File;
  const category = formData.get("category") as string;
  const campus = formData.get("campus") as string;

  const session = await getSession(request.headers.get("Cookie"));
  const vendorID = session.get("userId");

  if (!vendorID) {
    return json({ error: "User not authenticated or session expired." }, { status: 400 });
  }


  const vendor = await getVendorByVendorID(vendorID);
  if (!vendor) {
    return json({ error: "Vendor not found." }, { status: 400 });
  }
  const stallName = vendor.stallName;

  try {
    const reward = {
      rewardName,
      requiredPoint: Number(requiredPoint),
      rewardStock: Number(rewardStock),
      expiryDate,
      rewardDescription,
      rewardPicture,
      vendorID,
      stallName,
      category,
      campus,
    };

    const { success, error } = await addRewardToFirestore(reward);

    if (!success) {
      return json({ error }, { status: 400 });
    }

    return redirect("/dashboardRoute");
  } catch (error) {
    return json({ error: (error as Error).message }, { status: 400 });
  }
};

export default function AddRewardRoute() {
  const actionData = useActionData<{ error?: string }>();
  const { vendorID } = useLoaderData<{ vendorID: string }>();

  return (
    <div>
      {actionData?.error && <p>{actionData.error}</p>}
      <AddRewardForm vendorID={vendorID} />
    </div>
  );
}
