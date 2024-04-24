import { baseUrl } from "@/environment/environment";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movieList = await axios.get(`${baseUrl}netflix-clone/movies.json`);
    return NextResponse.json(movieList.data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
