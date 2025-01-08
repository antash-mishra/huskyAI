'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

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
  const { user, setUser } = useUser(); // Access user context

  const pathname = usePathname();
  const router = useRouter();

  const isSignInPage = pathname === '/';

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
    router.push('/');
  };


  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href="/scrape" 
                className="text-xl font-bold text-gray-800"
              >
                URL Scraper
              </Link>
            </div>
            
            {!isSignInPage && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink href="/history">History</NavLink>
                <NavLink href="/scrape">New Scrape</NavLink>
              </div>
            )}
          </div>
          {!isSignInPage && (
            <div className="flex items-center space-x-4">
              {user && <span className="text-gray-800 font-medium">Welcome, {user.name}!</span>}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden">
      {!isSignInPage && (
        <div className="pt-2 pb-3 space-y-1">
          <NavLink href="/history" isMobile>History</NavLink>
          <NavLink href="/scrape" isMobile>New Scrape</NavLink>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
