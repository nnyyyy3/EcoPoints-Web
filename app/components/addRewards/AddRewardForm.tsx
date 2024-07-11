import { Input } from '~/base/components/ui/input';
import SidebarApp from '../Sidebar/SidebarApp';
import { Navbar } from '../navbar/navBar';

export function AddRewardForm() {
  const labelStyle = { color: "#1F341D" };

  return (
    <div className='bg-gray-200 flex flex-col h-full'>
      <Navbar/>
      <div className='centered-div flex-1 overflow-hidden'>
        <SidebarApp/>
        <div className="bg-white h-[80vh] w-[150vh] mx-auto items-center rounded-xl shadow-md overflow-hidden">
          <div className="text-center p-10">
            <h1 style={labelStyle} className="text-3xl font-bold text-gray-800 mt-4 mb-2">Add Rewards</h1>
            <h2 style={{ color: 'rgba(31, 52, 29, 0.6)' }} className="text-xl font-semibold mb-4">Enter details below to create a reward.</h2>
            <hr className="border-t border-gray-200 my-4" />
          </div>
          
          <form method="POST" action="/addRewardRoute" className="grid gap-4 grid-cols-2 px-10 pb-10" encType="multipart/form-data">
            <div className="col-span-1 sm:col-span-1 text-2xl">
              <label htmlFor="rewardName" style={labelStyle}>Reward Name</label>
              <Input id="rewardName" type="text" name="rewardName" placeholder="Enter reward name" required />
            </div>

            <div className="col-span-1 sm:col-span-1 text-2xl">
              <label htmlFor="requiredPoint" style={labelStyle}>Required Points</label>
              <Input id="requiredPoint" type="text" name="requiredPoint" placeholder="Enter required points" required />
            </div>

            <div className="col-span-2 sm:col-span-1 text-2xl">
              <label htmlFor="rewardStock" style={labelStyle}>Stock</label>
              <Input id="rewardStock" type="number" name="rewardStock" placeholder="Enter stock amount" required />
            </div>

            <div className="col-span-2 sm:col-span-1 text-2xl">
              <label htmlFor="expiryDate" style={labelStyle}>Expiry Date</label>
              <Input id="expiryDate" type="date" name="expiryDate" required />
            </div>

            <div className="col-span-2 text-2xl">
              <label htmlFor="rewardDescription" style={labelStyle}>Reward Description</label>
              <Input id="rewardDescription" type="text" name="rewardDescription" placeholder="Enter reward description" required />
            </div>

            <div className="col-span-2 text-2xl">
              <label htmlFor="rewardPicture" style={labelStyle}>Upload Reward Picture</label>
              <Input id="rewardPicture" type="file" name="rewardPicture" placeholder="Upload from your device" accept="image/*" required />
            </div>

            <div className="col-span-2 text-center">
              <button type="submit" className="mt-20 px-4 py-2 bg-custom-superdarkgreen hover:bg-custom-darkgreen text-white rounded">Add Reward</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
