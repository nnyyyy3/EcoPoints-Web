import { json, redirect, LoaderFunction } from "@remix-run/node";
import { getSession } from "~/shared/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const role = session.get("role");

  if (role !== "admin") {
    return redirect("/login");
  }

  return json({});
};
