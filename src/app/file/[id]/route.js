import { NextResponse } from "next/server";

async function handle(req) {
  try {
    const fetchOption = {
      method: req.method,
      headers: req.headers,
      body: req.body,
    };
    const uri = new URL(req.url);
    const url = "https://telegra.ph" + uri.pathname + uri.search;
    console.log(url)
    const response = await fetch(url, fetchOption);
    const newHeaders = new Headers(response.headers);
    newHeaders.delete("content-encoding");
    return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error });
  }
}

export const GET = handle;
