"use client"
import NoteCard from "@/components/NoteCard";
import React, { useState } from "react";

function page() {
  const [note, setNote] = useState({});



  return (
    <div>
      <NoteCard {...note} />
    </div>
  );
}

export default page;
