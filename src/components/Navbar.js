// components/Header.js
import Link from 'next/link';
const Navbar = () => {

  return (
    <nav className="bg-blue-400 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link href="/">
            <h3 className="text-white font-bold text-xl">Mind Bubbles</h3>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
