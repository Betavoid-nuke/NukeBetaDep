"use client"

import React, { useState, useEffect } from 'react';

const Users = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {

      // Simulating an async function, e.g., an API call
      const response: string = await new Promise(resolve => setTimeout(() => resolve('Data fetched'), 2000));
      setData(response);
      setIsLoading(false);

    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className='text-light-1'>Loading...</div>;
  }

  return (
    <div className='text-light-1'>{data}</div>
  );

}

export default Users;
