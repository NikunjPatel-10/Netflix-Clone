import { baseUrl } from "@/environment/environment";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const showList = await axios.get(`${baseUrl}netflix-clone/shows.json`);
    return NextResponse.json(showList.data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
