// components/Header.js
import React, {useState} from 'react';
import Link from 'next/link';
const Navbar = ({ onTogglePublicNotes }) => {
  const [showButton, setshowButton] = useState(true);

  const setShowButtonFunction=()=>{
    setshowButton(!showButton);
  }
  return (
    <nav className="bg-blue-400 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link href="/">
            <h3 className="text-white font-bold text-xl">Note App</h3>
          </Link>
        </div>
        <div className="flex space-x-4 text-white ">
          <Link href="/dashboard" >Dashboard</Link>
          <button onClick={() => {
            onTogglePublicNotes(); // Call the function to toggle public/private
            setShowButtonFunction();
          }}>
            {showButton ? 'Show private' : 'Show public'}
          </button>
          <Link href="/admin">Admin</Link>
          {/* Add more navigation links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
