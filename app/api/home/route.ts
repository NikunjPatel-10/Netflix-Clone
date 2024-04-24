import { baseUrl } from "@/environment/environment";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const homeMovieList = await axios.get(`${baseUrl}netflix-clone/home.json`);
    console.log(homeMovieList.data);

    return NextResponse.json(homeMovieList.data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
