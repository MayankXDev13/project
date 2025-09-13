"use client";

import Note from "@/components/Note";
import axios from "axios";
import React, { useEffect, useState, use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params); // ✅ unwrap params with React.use()

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const getNote = async () => {
      try {
        const response = await axios.get(`/api/notes/${id}`);
        setTitle(response.data.note.title);
        setContent(response.data.note.content);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    getNote();
  }, [id]);

  const data = {
    page: "Edit",
    title,
    content,
    id
  };

  return <Note {...data} />;
}
