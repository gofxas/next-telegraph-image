import { NextResponse } from "next/server";

async function handle(req) {
  try {
    // await connectMongo();
    
    const fetchOption = {
        method: req.method,
        headers: req.headers,
        body: req.body,
        "duplex": "half"
    }
    const uri = new URL(req.url);
    const url = 'https://telegra.ph/upload'+ uri.search;
    const response = await fetch(url, fetchOption);
    const result = await response.json();
    console.log(result)
    return NextResponse.json(result);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error });
  }
}
export const POST = handle;