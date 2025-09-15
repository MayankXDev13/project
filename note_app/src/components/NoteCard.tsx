import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function NoteCard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("/api/notes");
        setNotes(response.data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

const handleNoteDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
  try {
    const id = e.currentTarget.id; 

    if (!id) {
      console.warn("No id found on button");
      return;
    }

    const response = await axios.delete(`/api/notes/${id}`);

    if (response.data) {
      router.refresh()
    }
    console.log("Deleted:", response.data);
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

  return (
    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {notes.map((note) => (
        <div
          key={note._id}
          className="transform rounded-3xl bg-white/10 p-6 shadow-lg backdrop-blur-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
        >
          <h1 className="mb-2 text-xl font-semibold text-white">
            {note.title}
          </h1>

          <p className="mb-3 text-sm text-gray-300">{note.content}</p>

          <small className="mb-4 block text-xs text-gray-400">
            Created At {new Date(note.createdAt).toLocaleDateString()}
          </small>

          <div className="flex items-center justify-between">
            <Link
              href={`/notes/${note._id}`}
              className="rounded-xl bg-green-500 px-4 py-1.5 text-sm text-white transition duration-200 hover:bg-green-600"
            >
              Edit
            </Link>
            <button
              id={`${note._id}`}
              className="rounded-xl bg-red-500 px-4 py-1.5 text-sm text-white transition duration-200 hover:bg-red-600"
              onClick={handleNoteDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
