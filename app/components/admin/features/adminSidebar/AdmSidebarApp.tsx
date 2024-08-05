import { AdmSidebar, SidebarItem } from "./AdmSidebar";
import { LayoutTemplate, SquareUserRound, Bell, CircleDollarSign, ListChecks } from 'lucide-react';

export default function AdmSidebarApp() {
    return (
        <AdmSidebar>
            <SidebarItem icon={<LayoutTemplate size={20} />} text="Dashboard" to="/admDashRoute" />
            <SidebarItem icon={<SquareUserRound size={20} />} text="Account Verification" to="/accountverRoute" />
            <SidebarItem icon={<ListChecks size={20} />} text="Reward Request List" to="/rewardreqRoute" />
            <SidebarItem icon={<CircleDollarSign size={20} />} text="Cash Out Request List" to="/cashReqRoute" />
            <SidebarItem icon={<Bell size={20} />} text="Notifications" to="/admnotifications" />
     
        </AdmSidebar>
    );
}
