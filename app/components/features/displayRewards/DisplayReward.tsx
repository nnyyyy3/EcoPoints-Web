import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import SidebarApp from "../Sidebar/SidebarApp";
import { Navbar } from "../navbar/navBar";
import { getRewardsFromFirestore } from "~/shared/services/productServices";
import { Reward } from "~/shared/types";

interface DisplayRewardProps {
  vendorID: string;
}

export function DisplayReward({ vendorID }: DisplayRewardProps) {
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    async function fetchRewards() {
      const rewards = await getRewardsFromFirestore();
      setRewards(rewards);
    }

    fetchRewards();
  }, []);

  const userRewards = rewards.filter(reward => reward.vendorID === vendorID);

  return (
    <div className="bg-gray-200 flex flex-col h-full">
      <Navbar />
      <div className="flex flex-row h-full">
        <SidebarApp />
        <div className="p-6 bg-gray-200 flex flex-wrap gap-6 justify-center">
          {userRewards.map(reward => (
            <Link to={`/${reward.id}`} key={reward.id} className="w-128 h-96 rounded-3xl bg-white shadow-md overflow-hidden flex flex-col">
              <img src={reward.rewardPicture as string} alt={reward.rewardName} className="h-64 w-full object-cover rounded-t-3xl" />
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{reward.rewardName}</h2>
                  <p className="text-green-600 text-lg font-semibold">{reward.requiredPoint}pts</p>
                </div>
                <p className="text-gray-700 mt-2">{reward.rewardDescription}</p>
                <div className="flex justify-between items-center mt-auto">
                  <p className="text-black text-sm">Claim at {reward.stallName}</p> 
                  <p className="text-gray-500 text-sm">Ends {new Date(reward.expiryDate).toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
