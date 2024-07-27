import { Reward } from "~/shared/types";
import { Navbar } from "~/components/navbar/navBar";
import SidebarApp from "~/components/Sidebar/SidebarApp";
import { Input } from '~/base/components/ui/input';

interface ManageRewardFormProps {
  reward: Reward;
}

export default function ManageRewardForm({ reward }: ManageRewardFormProps) {
  return (
    <div className='bg-gray-200 flex flex-col h-full'>
      <Navbar />
      <div className='centered-div flex-1 overflow-hidden'>
        <SidebarApp />
        <div className="bg-white h-[90vh] w-[150vh] mx-auto items-center rounded-xl shadow-md overflow-hidden">
          <div className="text-center p-10">
            <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">Manage Reward</h1>
            <h2 className="text-xl font-semibold mb-4">Edit the details of your reward below.</h2>
            <hr className="border-t border-gray-200 my-4" />
          </div>
          <div className="grid gap-4 grid-cols-2 px-10 pb-10">
            <div className="col-span-1 sm:col-span-1 text-2xl">
              <label htmlFor="rewardName">Reward Name</label>
              <Input id="rewardName" type="text" name="rewardName" placeholder="Enter reward name" defaultValue={reward.rewardName} required readOnly />
            </div>
            <div className="col-span-1 sm:col-span-1 text-2xl">
              <label htmlFor="requiredPoint">Required Points</label>
              <Input id="requiredPoint" type="text" name="requiredPoint" placeholder="Enter required points" defaultValue={reward.requiredPoint} required readOnly />
            </div>
            <div className="col-span-2 sm:col-span-1 text-2xl">
              <label htmlFor="rewardStock">Stock</label>
              <Input id="rewardStock" type="number" name="rewardStock" placeholder="Enter stock amount" defaultValue={reward.rewardStock} required readOnly />
            </div>
            <div className="col-span-2 sm:col-span-1 text-2xl">
              <label htmlFor="expiryDate">Expiry Date</label>
              <Input id="expiryDate" type="date" name="expiryDate" defaultValue={reward.expiryDate} required readOnly />
            </div>
            <div className="col-span-2 sm:col-span-1 text-2xl">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" className="w-full border border-gray-300 rounded-md p-2 h-10 text-gray-500 text-sm" defaultValue={reward.category} required disabled>
                <option value="Food">Food</option>
                <option value="School Supply">School Supplies</option>
                <option value="Event Ticket">Event Tickets</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1 text-2xl">
              <label htmlFor="campus">Campus</label>
              <select id="campus" name="campus" className="w-full border border-gray-300 rounded-md p-2 h-10 text-gray-500 text-sm" defaultValue={reward.campus} required disabled>
                <option value="Main">Main Campus</option>
                <option value="Basak">Basak Campus</option>
                <option value="Balamban">Balamban Campus</option>
              </select>
            </div>
            <div className="col-span-2 text-2xl">
              <label htmlFor="rewardDescription">Reward Description</label>
              <Input id="rewardDescription" type="text" name="rewardDescription" placeholder="Enter reward description" defaultValue={reward.rewardDescription} required readOnly />
            </div>
            <div className="col-span-2 text-2xl">
              <label htmlFor="rewardPicture">Upload Reward Picture</label>
              <Input id="rewardPicture" type="file" name="rewardPicture" placeholder="Upload from your device" accept="image/*" />
            </div>
            <div className="col-span-2 text-center">
              <button type="submit" className="mt-20 px-4 py-2 bg-custom-superdarkgreen hover:bg-custom-darkgreen text-white rounded">Update Reward</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
