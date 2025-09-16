"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface NoteProps {
  title?: string;
  content?: string;
  page?: string;
  id?: string;
}

export default function Note({
  title: initialTitle = "",
  content: initialContent = "",
  page,
  id,
}: NoteProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const router = useRouter();

  console.log(title, content, page, id);

  useEffect(() => {
    if (page === "Edit") {
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [page, initialTitle, initialContent]);

  const handleCreateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      console.log("Title and content are required!");
      return;
    }

    try {
      const response = await axios.post("/api/notes", {
        title,
        content,
      });
      
      console.log("Note submitted:", response.data);

      
      setTitle("");
      setContent("");
      router.push("/notes")      
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleUpdateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      console.error("Note ID is missing, cannot update!");
      return;
    }

    if (title === initialTitle && content === initialContent) {
      console.log("No changes detected, skipping update request.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      console.log("Title and content are required!");
      return;
    }

    try {
      const response = await axios.put(`/api/notes/${id}`, {
        title,
        content,
      });
      console.log("Note updated:", response.data);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-2xl bg-neutral-950 p-6 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-neutral-50">
        {page ? `${page} a Note` : "Create a Note"}
      </h1>

      <form
        onSubmit={page ? handleUpdateNote : handleCreateNote}
        className="space-y-5"
      >
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl bg-neutral-50 p-3 text-neutral-900 placeholder-neutral-400 shadow-sm transition focus:ring-2 focus:ring-orange-600 focus:outline-none"
        />

        {/* Content Textarea */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-36 w-full resize-none rounded-xl bg-neutral-50 p-3 text-neutral-900 placeholder-neutral-400 shadow-sm transition focus:ring-2 focus:ring-orange-600 focus:outline-none"
        />

        {/* Character count */}
        <p className="text-right text-sm text-neutral-400">
          {content.length} / 500
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full transform rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 p-3 font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
        >
          {page === "Edit" ? "Update Note" : "Add Note"}
        </button>
      </form>
    </div>
  );
}
