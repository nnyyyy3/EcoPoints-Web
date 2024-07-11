import { useEffect, useState } from "react";
import SidebarApp from '../Sidebar/SidebarApp';
import { Navbar } from '../navbar/navBar';
import { getRewardsFromFirestore } from "~/shared/services/productServices";
import { Reward } from "~/shared/types";

export function DisplayReward() {
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    async function fetchRewards() {
      const rewards = await getRewardsFromFirestore();
      setRewards(rewards);
    }
    fetchRewards();
  }, []);

  return (
    <div className='bg-gray-200 flex flex-col h-full'>
      <Navbar />
      <div className='flex flex-row h-full'>
        <SidebarApp />
        <div className="p-20 bg-gray-200 flex flex-wrap gap-10">
          {rewards.map(reward => (
            <div key={reward.id} className='h-96 w-96 rounded-sm bg-white p-4 flex flex-col items-center'>
              <img src={reward.rewardPicture as string} alt={reward.rewardName} className="h-48 w-full object-cover" />
              <h2 className="text-xl font-bold text-left">{reward.rewardName}</h2>
              <p className="text-gray-700">{reward.rewardDescription}</p>
              <p className="text-gray-700">Points: {reward.requiredPoint}</p>
              <p className="text-gray-700">Stock: {reward.rewardStock}</p>
              <p className="text-gray-700">Expiry: {new Date(reward.expiryDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
