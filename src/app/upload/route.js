import { NextResponse } from "next/server";
async function handle(req) {
  try {
    // await connectMongo();
    const newHeaders = new Headers(req.headers);
    newHeaders.delete("host");
    newHeaders.delete("referer");
    const fetchOption = {
      method: req.method,
      headers: newHeaders,
      body: req.body,
      duplex: "half",
    };

    const uri = new URL(req.url);
    const url = "https://telegra.ph/upload" + uri.search;
    const response = await fetch(url, fetchOption);
    const newResHeaders = new Headers();
    newResHeaders.set("Access-Control-Allow-Credentials",false)
    newResHeaders.set("Access-Control-Allow-Origin","*")
    newResHeaders.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,HEADER")
    
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers:newResHeaders
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
export const POST = handle;
