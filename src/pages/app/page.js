"use client"

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { SessionProvider, useSession } from "next-auth/react";
import Notes from '../../components/Notes';
import Navbar from '../../components/Navbar';

export default function Home() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null)

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/content', { params: { email: session.user.email } });
        const data = response.data;
        setUserId(response.data._id);
        console.log('Data from API:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const createUser = async () => {
      try {
        await axios.post('/api/user', { email: session.user.email, image: session.user.image, name: session.user?.name });
      } catch (error) {
        console.error('Error creating user:', error);
      }
    };

    if (session) {
      await createUser();
    
      fetchData();
    }
  }, [session]);
  return (
    
      <SessionProvider className="">
        <Navbar />
        {session && userId && <Notes userId={userId} />}
      </SessionProvider>
    
  );
}