import { Input } from "~/base/components/ui/input";
import { AdmnNavbar } from "../adminNavbar/AdmNavbar";
import AdmSidebarApp from "../adminSidebar/AdmSidebarApp";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/base/components/ui/button";

interface ViewCredentialProps {
  vendor: {
    id: string;
    stallName: string;
    ownerName: string;
    phoneNumber: string;
    email: string;
    password: string;
    idPicture: string;
    profilePicture: string;
    vendorID: string;
    status?: string;
  };
}

export default function ViewCredential({ vendor }: ViewCredentialProps) {
  return (
    <div className="bg-gray-200 flex flex-col h-full">
      <AdmnNavbar />
      <div className="centered-div flex-1 overflow-hidden">
        <AdmSidebarApp />
        <div className="bg-white h-[70vh] w-[100vh] mx-auto items-center rounded-xl shadow-md overflow-hidden flex flex-col justify-between">
          <div className="flex flex-col items-center w-full">
            <div className="flex justify-center items-center my-6">
              <div className="text-2xl w-full">
                <Label htmlFor="stallName">Stall Name</Label>
                <Input id="stallName" type="text" name="stallName" value={vendor.stallName} readOnly />
              </div>

              <div className="text-2xl w-full">
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input id="ownerName" type="text" name="ownerName" value={vendor.ownerName} readOnly />
              </div>

              <div className="text-2xl w-full">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" type="text" name="phoneNumber" value={vendor.phoneNumber} readOnly />
              </div>

              <div className="text-2xl w-full">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="text" name="email" value={vendor.email} readOnly />
              </div>

              <div>
                <Label htmlFor="idPicture">ID Picture</Label>
                <img src={vendor.idPicture} alt="ID" className="h-56 w-56 object-cover" />
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full px-10 pb-10">
            <Button type="submit" formAction={`/declineVendor/${vendor.id}`} className="bg-red-500 text-white">
              Decline
            </Button>
            <Button type="submit" formAction={`/acceptVendor/${vendor.id}`} className="bg-green-500 text-white">
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
