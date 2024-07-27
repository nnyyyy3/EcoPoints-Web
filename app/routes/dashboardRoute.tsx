import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import SidebarApp from "~/components/Sidebar/SidebarApp";
import { Navbar } from "~/components/navbar/navBar";
import { getRewardsForVendor } from "~/shared/services/productServices";
import { getSession } from "~/shared/session.server";
import { Reward } from "~/shared/types";

interface LoaderData {
  rewards: Reward[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const vendorID = session.get("userId");

  if (!vendorID) {
    throw new Error("User not authenticated or session expired.");
  }

  const rewards = await getRewardsForVendor(vendorID);

  return json<LoaderData>({ rewards });
};

export default function Dashboard() {
  const { rewards } = useLoaderData<LoaderData>();
  const labelStyle = { color: "#1F341D" };

  return (
    <div className='bg-gray-200 flex flex-col h-full drop-shadow-xl'>
      <Navbar />
      <div className='flex-1 flex overflow-hidden'>
        <SidebarApp />
        <div className="flex-grow p-6 bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow-md">
              <div className="text-center p-10">
                <h1 style={labelStyle} className="text-3xl font-bold text-gray-800 mt-4 mb-2">500</h1>
                <h2 style={{ color: 'rgba(31, 52, 29, 0.6)' }} className="text-xl font-semibold mb-4">Total EcoPoints</h2>
              </div>
            </div>
            <div className="lg:col-span-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">List of Posted Rewards</h3>
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Stocks Available</th>
                    <th className="text-left">Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rewards.map((reward) => (
                    <tr key={reward.id} className={reward.rewardStock > 0 ? "bg-green-200" : "bg-red-200"}>
                      <td>{reward.rewardName}</td>
                      <td>{reward.rewardStock}</td>
                      <td>{new Date(reward.expiryDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="lg:col-span-12 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">Most Redeemed Reward</h3>
              <div className="mt-4">
                <p>Chart will be here</p>
                {/* Add chart code or component */}
              </div>
            </div>
            <div className="lg:col-span-12 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">Redemption Trends by Time and Day</h3>
              <div className="mt-4">
                <p>Chart will be here</p>
                {/* Add chart code or component */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
