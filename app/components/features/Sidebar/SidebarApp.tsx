import { Sidebar, SidebarItem } from "./Sidebar";
import { LayoutTemplate, Plus, Gift, Bell, CircleDollarSign } from 'lucide-react';

export default function SidebarApp() {
    return (
        <Sidebar>
            <SidebarItem icon={<LayoutTemplate size={20} />} text="Dashboard" to="/dashboardRoute" />
            <SidebarItem icon={<Plus size={20} />} text="Add Rewards" to="/addrewardRoute" />
            <SidebarItem icon={<Gift size={20} />} text="Display Rewards" to="/displayrewardRoute" />
            <SidebarItem icon={<Bell size={20} />} text="Notifications" to="/notifications" />
            <SidebarItem icon={<CircleDollarSign size={20} />} text="Cash Out" to="/cash-out" />
        </Sidebar>
    );
}
