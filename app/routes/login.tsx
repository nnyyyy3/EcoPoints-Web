import { json, redirect, ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { auth } from "~/shared/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginForm } from "~/components";
import { commitSession, getSession } from "~/shared/session.server";

const ADMIN_EMAIL = "ecopoints.admin@gmail.com";
const ADMIN_REDIRECT_PATH = "/admDashRoute";
const USER_REDIRECT_PATH = "/dashboardRoute";

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
    if (email === ADMIN_EMAIL) {
      session.set("role", "admin");
    } else {
      session.set("role", "user");
    }

    const redirectPath = email === ADMIN_EMAIL ? ADMIN_REDIRECT_PATH : USER_REDIRECT_PATH;

    return redirect(redirectPath, {
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
