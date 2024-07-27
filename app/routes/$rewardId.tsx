import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRewardById } from "~/shared/services/productServices";
import { Reward } from "~/shared/types";
import ManageRewardForm from "~/components/features/manageReward/ManageRewardForm";

interface LoaderData {
  reward: Omit<Reward, "rewardPicture"> & { rewardPicture: string };
}

export const loader: LoaderFunction = async ({ params }) => {
  const { rewardId } = params;

  if (!rewardId) {
    throw new Response("Reward ID not found", { status: 404 });
  }

  const reward = await getRewardById(rewardId);

  if (!reward) {
    throw new Response("Reward not found", { status: 404 });
  }

  return json<LoaderData>({
    reward: {
      ...reward,
      rewardPicture: reward.rewardPicture as string,
    },
  });
};

export default function RewardRoute() {
  const { reward } = useLoaderData<LoaderData>();

  if (!reward) {
    return <div>Reward not found</div>;
  }

  return <ManageRewardForm reward={reward} />;
}
