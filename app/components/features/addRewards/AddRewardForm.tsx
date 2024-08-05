import { Input } from '~/base/components/ui/input';
import SidebarApp from '../Sidebar/SidebarApp';
import { Navbar } from '../navbar/navBar';
import { useFetcher } from '@remix-run/react';

interface AddRewardFormProps {
  vendorID: string;
}

export function AddRewardForm({ vendorID }: AddRewardFormProps) {
  const labelStyle = { color: "#1F341D" };
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/addRewardRoute" encType="multipart/form-data">
      <input type="hidden" name="vendorID" value={vendorID} />
      <div className='bg-gray-200 flex flex-col h-full'>
        <Navbar />
        <div className='centered-div flex-1 overflow-hidden'>
          <SidebarApp />
          <div className="bg-white h-[90vh] w-[150vh] mx-auto items-center rounded-xl shadow-md overflow-hidden">
            <div className="text-center p-10">
              <h1 style={labelStyle} className="text-3xl font-bold text-gray-800 mt-4 mb-2">Add Rewards</h1>
              <h2 style={{ color: 'rgba(31, 52, 29, 0.6)' }} className="text-xl font-semibold mb-4">Enter details below to create a reward.</h2>
              <hr className="border-t border-gray-200 my-4" />
            </div>

            <div className="grid gap-4 grid-cols-2 px-10 pb-10">
              <div className="col-span-1 sm:col-span-1 text-2xl">
                <label htmlFor="rewardName">Reward Name</label>
                <Input id="rewardName" type="text" name="rewardName" placeholder="Enter reward name" required />
              </div>

              <div className="col-span-1 sm:col-span-1 text-2xl">
                <label htmlFor="requiredPoint">Required Points</label>
                <Input id="requiredPoint" type="text" name="requiredPoint" placeholder="Enter required points" required />
              </div>

              <div className="col-span-2 sm:col-span-1 text-2xl">
                <label htmlFor="rewardStock">Stock</label>
                <Input id="rewardStock" type="number" name="rewardStock" placeholder="Enter stock amount" required />
              </div>

              <div className="col-span-2 sm:col-span-1 text-2xl">
                <label htmlFor="expiryDate">Expiry Date</label>
                <Input id="expiryDate" type="date" name="expiryDate" required />
              </div>

              <div className="col-span-2 sm:col-span-1 text-2xl">
                <label htmlFor="expiryTime">Expiry Time</label>
                <Input id="expiryTime" type="time" name="expiryTime" required />
              </div>

              <div className="col-span-2 sm:col-span-1 text-2xl">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" className="w-full border border-gray-300 rounded-md p-2 h-10 text-gray-500 text-sm" required>
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="School Supply">School Supplies</option>
                  <option value="Event Ticket">Event Tickets</option>
                </select>
              </div>

              <div className="col-span-2 sm:col-span-1 text-2xl">
                <label htmlFor="campus">Campus</label>
                <select id="campus" name="campus" className="w-full border border-gray-300 rounded-md p-2 h-10 text-gray-500 text-sm" required>
                  <option value="">Select Campus</option>
                  <option value="Main">Main Campus</option>
                  <option value="Basak">Basak Campus</option>
                  <option value="Balamban">Balamban Campus</option>
                </select>
              </div>

              <div className="col-span-2 text-2xl">
                <label htmlFor="rewardDescription">Reward Description</label>
                <Input id="rewardDescription" type="text" name="rewardDescription" placeholder="Enter reward description" required />
              </div>

              <div className="col-span-2 text-2xl">
                <label htmlFor="rewardPicture">Upload Reward Picture</label>
                <Input id="rewardPicture" type="file" name="rewardPicture" placeholder="Upload from your device" accept="image/*" required />
              </div>

              <div className="col-span-2 text-center">
                <button type="submit" className="mt-20 px-4 py-2 bg-custom-superdarkgreen hover:bg-custom-darkgreen text-white rounded">Add Reward</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </fetcher.Form>
  );
}
