"use client"
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
export default function Home() {
  const [showPublicNotes, setShowPublicNotes] = useState(false);

  const togglePublicNotes = () => {
    setShowPublicNotes(!showPublicNotes);
  };

  return (
    <main className="">
      <Navbar onTogglePublicNotes={togglePublicNotes} />
      <Notes showPublicNotes={showPublicNotes} />
   </main>
  );
}

