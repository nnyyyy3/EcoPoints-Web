import { Bell, MoreVertical, User } from 'lucide-react';
import { Link } from "@remix-run/react";

export function AdmnNavbar() {
    return (
        <nav className="bg-white text-black px-4 py-2 flex justify-between items-center">
            <div className="links">
            </div>
            <div className="flex rounded-full border border-gray-300">
                <div className="flex items-center justify-center w-10 h-10 hover:bg-gray-200">
                    <Bell className="text-gray-600" />
                </div>
                <MoreVertical size={30} className="pt-2 pb-2" />
                <Link to="/profileRoute" className="flex items-center justify-center w-10 h-10 hover:bg-gray-200">
                    <User className="text-gray-600" />
                </Link>
            </div>
        </nav>
    );
}
