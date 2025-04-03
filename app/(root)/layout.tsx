'use client'; // Client-side rendering

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/actions/auth.action';
import Image from 'next/image';
import { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      console.log('Authenticated:', authenticated); // Debugging line

      setIsUserAuthenticated(authenticated);

      if (!authenticated) {
        router.push('/');
      }
    };

    checkAuthentication();
  }, [router]);

  if (isUserAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading state while checking
  }

  return (
    <div className="root-layout">
      <nav>
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </a>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
