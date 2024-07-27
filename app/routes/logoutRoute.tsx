import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/shared/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/LoginForm", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
