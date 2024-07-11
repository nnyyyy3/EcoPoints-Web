import { ActionFunction, json, redirect } from "@remix-run/node";
import { AddRewardForm } from "~/components/addRewards/AddRewardForm";
import { addRewardToFirestore } from "~/shared/services/productServices";
import { getSession } from "~/shared/session.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const rewardName = formData.get("rewardName") as string;
  const requiredPoint = formData.get("requiredPoint") as string;
  const rewardStock = formData.get("rewardStock") as string;
  const expiryDate = formData.get("expiryDate") as string;
  const rewardDescription = formData.get("rewardDescription") as string;
  const rewardPicture = formData.get("rewardPicture") as File;

  if (!rewardName || !requiredPoint || !rewardStock || !expiryDate || !rewardDescription || !rewardPicture) {
    return json({ error: "Form not submitted correctly." }, { status: 400 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  const vendorID = session.get("vendorID");

  if (!vendorID) {
    return json({ error: "Vendor ID not found." }, { status: 400 });
  }

  const reward = {
    rewardName,
    requiredPoint: parseInt(requiredPoint, 10),
    rewardStock: parseInt(rewardStock, 10),
    expiryDate,
    rewardDescription,
    rewardPicture,
    vendorID, 
  };

  const result = await addRewardToFirestore(reward);

  if (result.success) {
    return redirect("/dashboardRoute");
  } else {
    return json({ error: result.error }, { status: 500 });
  }
};

export default function AddRewardRoute() {
  return (
    <div>
      <AddRewardForm />
    </div>
  );
}
