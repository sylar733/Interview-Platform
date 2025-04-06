import Agent from '@/components/Agent';
import { getCurrentUser } from '@/lib/actions/auth.action';
import React from 'react';

const page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview Generation</h3>
      <Agent userName={user?.name || 'User'} userId={user?.id || 'user1'} type="generation" />
    </>
  );
};

export default page;
