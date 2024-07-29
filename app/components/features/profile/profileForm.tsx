import { useLoaderData, Form } from "@remix-run/react";
import { Navbar } from "../navbar/navBar";
import SidebarApp from "../Sidebar/SidebarApp";
import { Vendor } from "~/shared/types";

interface LoaderData {
  vendor: Vendor;
}

export default function ProfileForm() {
  const { vendor } = useLoaderData<LoaderData>();

  return (
      <div className='bg-gray-200 flex flex-col h-full'>
        <Navbar />
        <div className='centered-div flex-1 overflow-hidden'>
          <SidebarApp />
          <div className="bg-white h-[70vh] w-[100vh] mx-auto items-center rounded-xl shadow-md overflow-hidden flex flex-col justify-between">
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-center items-center my-6">
                <div className="rounded-full bg-black h-56 w-56 flex justify-center items-center overflow-hidden">
                  <img id="profilePicturePreview" src={vendor.profilePicture as string} alt="Profile" className="h-full w-full object-cover" />
                </div>
              </div>

              <div className="flex flex-col gap-4 px-10 pb-10 w-full">
                <div className="text-2xl w-full">
                  <label htmlFor="stallName">Stall Name</label>
                  <input id="stallName" type="text" name="stallName" value={vendor.stallName} readOnly className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none" />
                </div>

                <div className="text-2xl w-full">
                  <label htmlFor="ownerName">Owner Name</label>
                  <input id="ownerName" type="text" name="ownerName" value={vendor.ownerName} readOnly className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none" />
                </div>

                <div className="text-2xl w-full">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input id="phoneNumber" type="text" name="phoneNumber" value={vendor.phoneNumber} readOnly className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none" />
                </div>

                <div className="text-2xl w-full">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="text" name="email" value={vendor.email} readOnly className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="w-full px-10 pb-10 flex justify-center">
              <Form method="post" action="/logoutRoute">
                <button type="submit" className="text-red-600 text-lg text-center cursor-pointer">
                  Log Out
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
  );
}
