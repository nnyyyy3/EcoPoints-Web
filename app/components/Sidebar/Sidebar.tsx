import { ChevronFirst, ChevronLast } from "lucide-react";
import PropTypes from 'prop-types';
import { createContext, useContext, useState, ReactNode } from "react";
import { Link } from "@remix-run/react";

interface SidebarProps {
  children: React.ReactNode;
}

interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps>({ expanded: true });

export function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className="h-screen w-45 shadow-lg">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-10 flex justify-between items-center">
          <img src="public/logoText.png" className={`overflow-hidden transition-all ${expanded ? "w-50 h-20" : "w-0 h-0"}`} alt="Logo" />
          <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 w-50 h-20 rounded-lg bg-gray-50 hover:bg-gray-100">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {children}
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  to: string;
}

export function SidebarItem({ icon, text, to }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li className="relative flex items-center py-7 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-custom-darkgreen hover:text-white">
      <Link to={to} className="flex items-center w-full">
        {icon}
        {expanded && <span className="w-30 ml-3 text-2xl">{text}</span>}
      </Link>
      {!expanded && (
        <div className="absolute left-full rounded-md px-5 py-7 ml-6 w-56 text-xl bg-custom-darkgreen text-black invisible group-hover:visible group-hover:opacity-100 opacity-0 transition-all group-hover:translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
}
