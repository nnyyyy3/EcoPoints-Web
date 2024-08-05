import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/shared/session.server";
import DisplayReward from "~/components/features/displayRewards/DisplayReward";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const vendorID = session.get("userId");

  return json({ vendorID });
};

export default function DisplayRewardRoute() {
  const { vendorID } = useLoaderData<{ vendorID: string }>();

  return <DisplayReward vendorID={vendorID} />;
}
