import { NextResponse } from "next/server";

import ImageReview from './lib/image.review'
export async function middleware(request) {
  const url = new URL(request.url);
  if (process.env.IMGKEY) {
    const r = await ImageReview(url);
    if (r) {
      return NextResponse.redirect(url.origin+'/R.jpg');
    }
  }
  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: "/file/:path*",
};
