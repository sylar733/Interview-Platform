'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/actions/auth.action';

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; id: string } | null>(null);
  const router = useRouter();

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/sign-in'); // Redirect to sign-in if not authenticated
      } else {
        setUser(currentUser);
      }
    };
    fetchUser();
  }, [router]);

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      setIsProfileOpen(false);
      router.push('/sign-in');
    }
  };

  // Show a loading state while user data is being fetched
  if (!user) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>

        {/* Profile Image */}
        <div className="relative">
          <Image
            src="/profile.svg"
            alt="Profile"
            width={40}
            height={40}
            className="cursor-pointer rounded-full"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          />

          {/* Dropdown for Name and Sign Out */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4">
              <p className="text-gray-800">{user.name}</p> {/* Only name is stored */}
              <button
                onClick={handleSignOut}
                className="mt-2 w-full text-left text-red-500 hover:text-red-700"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {children}
    </div>
  );
};

export default RootLayout;
