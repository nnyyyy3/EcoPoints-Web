import { AdmnNavbar } from "../adminNavbar/AdmNavbar"
import AdmSidebarApp from "../adminSidebar/AdmSidebarApp"

export default function AdmDashboard(){
    return(
        <div className='bg-gray-200 flex flex-col h-full drop-shadow-xl'>
            <AdmnNavbar />
            <div className='flex-1 flex overflow-hidden'>
                <AdmSidebarApp />
                <div>
                    <p>Hello Welcome</p>
                </div>
            </div>
        </div>
    );
}
