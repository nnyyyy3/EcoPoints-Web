import { json, redirect, ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { auth } from "~/shared/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginForm } from "~/components";
import { commitSession, getSession } from "~/shared/session.server";

export const loader: LoaderFunction = () => {
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const session = await getSession(request.headers.get("Cookie"));
    session.set("userId", user.uid);

    return redirect("/dashboardRoute", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return json({ error: (error as Error).message }, { status: 400 });
  }
};

export default function Login() {
  const actionData = useActionData<{ error?: string }>();

  return (
    <div>
      <LoginForm error={actionData?.error} />
    </div>
  );
}
