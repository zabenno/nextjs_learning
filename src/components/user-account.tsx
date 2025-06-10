'use client';

import { useState, useRef, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

interface UserMenuProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export default function UserMenu({avatarUrl }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const name = session?.user?.name || "";
  const email = session?.user?.email || null;

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  

  if (!session) {
    return (<a href="/login" className="hover:text-blue-600 transition">Login</a>);
  }

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <span className="text-sm font-medium text-gray-700">{initials}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold text-gray-800">{name}</p>
            {email && <p className="text-xs text-gray-500 truncate">{email}</p>}
          </div>
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button
                onClick={() => router.push('/account')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Account
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/settings')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={ () => {
                     signOut()
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
