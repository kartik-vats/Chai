'use client'; // Add this if you're using the app router and doing client-side interactions

import React from 'react';
import Link from 'next/link';
import './navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
      <Link href="/"><button>Home</button></Link>
      <Link href="/social"><button>Social</button></Link>
      <Link href="/chatarea"><button>Chat</button></Link>
      <Link href="/profile"><button>Profile</button></Link>
    </div>
  );
}

export default Navbar;
