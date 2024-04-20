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
    const findUser = async () => {
      try {
        if (session && session.user && !userId) {
          const userResponse = await axios.get('/api/user', { params: { email: session.user.email, name : session.user.name } });
          console.log(userResponse);
          if (userResponse.status === 200) {
            setUserId(userResponse.data._id);
            console.log('User found:', userResponse.data);
          } 
        }
      } catch (findUserError) {
        console.error('Error finding or creating user:', findUserError);
      }
    };  
    if (session && session.user && !userId) {
      findUser();
    }
  
  }, [session, userId]);

  return (
    <SessionProvider session={session}>
      <Navbar />
      {userId ? <Notes userId={userId} /> :  
        <div className="flex items-center justify-center absolute inset-0 bg-gray-900 bg-opacity-50">
          <PulseLoader color="#5FA5F9" />
      </div>}
    </SessionProvider>
  );
}
