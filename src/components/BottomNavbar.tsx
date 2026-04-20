import { ReactNode } from 'react';
import { Home, Search, ShoppingBag, User, Heart } from 'lucide-react';

interface NavItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <button className={`flex flex-col items-center justify-center gap-1 transition-all ${
      active ? 'text-vlt-primary scale-110' : 'text-gray-400 hover:text-gray-600'
    }`}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
      {active && <div className="w-1 h-1 bg-vlt-primary rounded-full" />}
    </button>
  );
}

export default function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-3 pb-6 sm:pb-3 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <NavItem icon={<Home size={22} />} label="Home" active />
        <NavItem icon={<Search size={22} />} label="Search" />
        <div className="relative -top-8">
          <button className="w-14 h-14 gradient-header text-white rounded-full flex items-center justify-center shadow-xl shadow-vlt-primary/40 border-4 border-white active:scale-95 transition-transform">
            <ShoppingBag size={24} />
          </button>
        </div>
        <NavItem icon={<Heart size={22} />} label="Wishlist" />
        <NavItem icon={<User size={22} />} label="Profile" />
      </div>
    </nav>
  );
}
