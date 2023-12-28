"use client"
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
import axios from 'axios';
import { SessionProvider } from "next-auth/react"

import { useEffect } from 'react';

const fetchData = async () => {
  try {
    const response = await axios.get('/api/customers');
    const data = response.data;
    console.log('Data from API:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default function Home() {
  useEffect(() => {
    fetchData();
  }, []);

  const togglePublicNotes = () => {
    setShowPublicNotes(!showPublicNotes);
  };

  return (
    <SessionProvider className="">
      <Navbar onTogglePublicNotes={togglePublicNotes} />
      <Notes />
   </SessionProvider>
  );
}

