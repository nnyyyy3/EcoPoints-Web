import { json, redirect, ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { auth } from "~/shared/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SignupForm } from "~/components/features/auth/signup";
import { addVendorToFirestore } from "~/shared/services/VendorService";
import { commitSession, getSession } from "~/shared/session.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const stallName = formData.get("stallName") as string;
  const ownerName = formData.get("ownerName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const idPicture = formData.get("idPicture") as File;
  const profilePicture = formData.get("profilePicture") as File;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const vendor = {
      stallName,
      ownerName,
      phoneNumber,
      email,
      password,
      idPicture,
      vendorID: user.uid,
      profilePicture,
      role: "Vendor", 
      status: "Pending", 
    };

    const { success, error } = await addVendorToFirestore(vendor);

    if (!success) {
      return json({ error }, { status: 400 });
    }

    const session = await getSession(request.headers.get("Cookie"));
    session.set("userId", user.uid);

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return json({ error: (error as Error).message }, { status: 400 });
  }
};

export default function Signup() {
  const actionData = useActionData<{ error?: string }>();

  return (
    <div>
      <SignupForm error={actionData?.error} />
    </div>
  );
}
