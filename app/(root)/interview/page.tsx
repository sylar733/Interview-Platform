import Agent from '@/components/Agent';
import React from 'react';

function page() {
  return (
    <>
      <h3>Interview Generation</h3>
      <Agent userName="You" userId="user1" type="generation" />
    </>
  );
}

export default page;
