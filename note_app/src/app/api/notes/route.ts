import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notes from "../model/notes";

// create a new note POST /api/notes
export async function POST(req: NextRequest) {
  await connectDB();

  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json({
      message: "Title and content are required",
      status: 400,
    });
  }

  // Create a new note
  const newNote = await Notes.create({ title, content });

  return NextResponse.json({
    message: "Note created successfully",
    note: newNote,
    status: 200,
  });
}

// get all notes GET /api/notes
export async function GET() {
  await connectDB();

  const notes = await Notes.find().sort({ createdAt: -1 });

  return NextResponse.json({
    message: "Notes fetched successfully",
    notes,
    status: 200,
  });
}


