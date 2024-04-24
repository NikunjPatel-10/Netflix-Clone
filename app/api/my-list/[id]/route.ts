import { baseUrl } from "@/environment/environment";
import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: any) {
  const { id } = params;
  const { data } = await req.json();

  const listData = data;
  await axios.post(
    `${baseUrl}netflix-clone/users/${id}/my-list.json`,
    listData
  );
}
