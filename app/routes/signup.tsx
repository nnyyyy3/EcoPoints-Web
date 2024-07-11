import { ActionFunction, json, redirect } from "@remix-run/node";
import { SignupForm } from "~/components/features/auth/signup";
import { addVendorToFirestore } from "~/shared/services/VendorService";
import { Vendor } from "~/shared/types";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const displayName = formData.get("displayName") as string;
  const ownerName = formData.get("ownerName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const idPicture = formData.get("idPicture") as File;

  if (!displayName || !ownerName || !phoneNumber || !email || !password || !confirmPassword || !idPicture) {
    return json({ error: "Form not submitted correctly." }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return json({ error: "Passwords do not match." }, { status: 400 });
  }

  const vendor: Vendor = {
    displayName,
    ownerName,
    phoneNumber,
    email,
    password,
    idPicture,
  };

  const result = await addVendorToFirestore(vendor);

  if (result.success) {
    return redirect("/dashboardRoute");
  } else {
    return json({ error: result.error }, { status: 500 });
  }
};

export default function signup() {
  return (
    <div>
      <SignupForm />
    </div>
  );
}
