import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

// This endpoint is used by X-Cart users to directly log into the site as
// an admin
export const POST = async (request: NextRequest) => {
  const bodySchema = z.object({
    "X-AUTH-TOKEN": z.literal(process.env.NEXT_PUBLIC_WURTH_LAC_API_KEY),
    name: z.literal(SESSION_TOKEN_COOKIE),
    value: z.string(),
    expires: z.string(),
  });

  try {
    const json = await request.json();
    const body = await bodySchema.parseAsync(json);

    // Set the cookie
    const cookiesStore = cookies();
    cookiesStore.set(body.name, body.value, {
      expires: new Date(body.expires),
      path: "/",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  redirect("/");
};
