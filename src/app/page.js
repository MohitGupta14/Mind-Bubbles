"use client"
import React, { useState } from 'react';
import Content from "../components/Content";
import { SessionProvider } from "next-auth/react"


export default function Home() {
  return (
    <SessionProvider className="">
      <Content/>
   </SessionProvider>
  );
}

