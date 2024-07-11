import { json, redirect,  ActionFunction, LoaderFunction  } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { auth } from "~/shared/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginForm } from "~/components/features/auth/login/LoginForm";

export const loader: LoaderFunction = () => {
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return redirect("/dashboardRoute");
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
