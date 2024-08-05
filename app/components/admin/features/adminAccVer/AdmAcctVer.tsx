import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { AdmnNavbar } from "../adminNavbar/AdmNavbar";
import AdmSidebarApp from "../adminSidebar/AdmSidebarApp";
import { db } from "~/shared/utils/firebase"; 
import { collection, getDocs } from "firebase/firestore"; 

interface Vendor {
  id: string;
  stallName: string;
  status: string;
}

export default function AdmAcctVer() {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      const querySnapshot = await getDocs(collection(db, "vendors"));
      const vendorsData: Vendor[] = [];
      querySnapshot.forEach((doc) => {
        vendorsData.push({ id: doc.id, ...doc.data() } as Vendor);
      });
      setVendors(vendorsData);
    };

    fetchVendors();
  }, []);

  return (
    <div className="bg-gray-200 flex flex-col h-full drop-shadow-xl">
      <AdmnNavbar />
      <div className="flex-1 flex overflow-hidden">
        <AdmSidebarApp />
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-white h-[80vh] w-[150vh] mx-auto items-center shadow-md overflow-hidden">
            <div className="p-5 shadow-md border-b border-gray-200">
              <h1 className="text-3xl font-semibold mb-4">Account Verification</h1>
            </div>
            <table className="min-w-full bg-white border-separate">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Reward Giver Name</th>
                  <th className="py-2 px-4 border-b">Credentials</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <tr key={vendor.id}>
                    <td className="py-2 px-4 border-b">{vendor.stallName}</td>
                    <td className="py-2 px-4 border-b">
                      <Link to={`/viewCredential/${vendor.id}`} className="text-blue-500">
                        View Credentials
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">{vendor.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
