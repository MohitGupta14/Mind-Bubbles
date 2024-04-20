// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-400 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center"> {/* Added a new flex container */}
          <Link href="/">
            <h3 className="text-white font-bold text-xl cursor-pointer mr-100px">Mind Bubbles</h3>
          </Link>
        </div>
        <div>
          <Link href="/api/auth/signout">
            <button className="text-white font-semibold hover:text-gray-200 focus:outline-none">
              Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
