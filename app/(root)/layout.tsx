/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '@/lib/actions/auth.action';
import Image from 'next/image';
import { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // ✅ Make sure this is inside the component

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      console.log('Authenticated:', authenticated);

      setIsUserAuthenticated(authenticated);

      // Only redirect if not on homepage
      if (!authenticated && pathname !== '/interview') {
        router.push('/interview');
      }
    };

    checkAuthentication();
  }, [router, pathname]);

  if (isUserAuthenticated === null) {
    return <div>Loading...</div>;
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
