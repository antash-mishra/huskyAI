'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isMobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, isMobile = false }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  if (isMobile) {
    return (
      <Link
        href={href}
        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium
          ${isActive
            ? 'bg-blue-50 border-blue-500 text-blue-700'
            : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
          }`}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
        ${isActive 
          ? 'border-blue-500 text-gray-900'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        }`}
    >
      {children}
    </Link>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href="/" 
                className="text-xl font-bold text-gray-800"
              >
                URL Scraper
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="/">History</NavLink>
              <NavLink href="/scrape">New Scrape</NavLink>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <NavLink href="/" isMobile>History</NavLink>
          <NavLink href="/scrape" isMobile>New Scrape</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
