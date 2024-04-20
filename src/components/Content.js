import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SessionProvider, useSession } from "next-auth/react";
import Navbar from './Navbar';
import Notes from './Notes';
import { PulseLoader } from 'react-spinners';

export default function Content() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        if (session && session.user) {
          let cachedUserId = localStorage.getItem('userId');
          if (!cachedUserId) {
            const userResponse = await axios.get('/api/user', { params: { email: session.user.email, name: session.user.name } });
            if (userResponse.status === 200) {
              const { _id } = userResponse.data;
              localStorage.setItem('userId', _id);
              setUserId(_id);
              console.log('User found:', userResponse.data);
            }
          } else {
            setUserId(cachedUserId);
          }
        }
      } catch (error) {
        console.error('Error finding or creating user:', error);
      }
    };

    if (session) {
      fetchUserId();
    }
  }, [session]);

  return (
    <SessionProvider session={session}>
      <Navbar />
      {userId ? (
        <Notes userId={userId} />
      ) : (
        <div className="flex items-center justify-center absolute inset-0 bg-gray-900 bg-opacity-50">
          <PulseLoader color="#5FA5F9" />
        </div>
      )}
    </SessionProvider>
  );
}
