import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notes from "../../model/notes";

// get a single note GET /api/notes/:id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDB();
  const { id } = params;

  const note = await Notes.findById(id);

  if (!note) {
    return NextResponse.json({
      message: "Note not found",
      status: 404,
    });
  }

  return NextResponse.json({
    message: "Note fetched successfully",
    note,
    status: 200,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDB();

  const { id } = params;

  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json({
      message: "Title and content are required",
      status: 400,
    });
  }

  const updateNote = await Notes.findOneAndUpdate(
    { _id: id },
    { title, content },
    { new: true },
  );

  return NextResponse.json({
    message: "Note created successfully",
    note: updateNote,
    status: 200,
  });
}



export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB(); // ✅ connect to MongoDB

    const { id } =  await params;

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const deleteNote = await Notes.findByIdAndDelete(id); // ✅ simpler than findOneAndDelete({ _id: id })

    if (!deleteNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Note successfully deleted",
        note: deleteNote,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
