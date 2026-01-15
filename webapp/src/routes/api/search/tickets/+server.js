import { readSettings } from "$lib/server/settings";
import { db } from "$lib/server/db/index.js";
import { tickets } from "$lib/server/db/schema.js";
import { and, like, sql } from "drizzle-orm";

export async function GET({ url }) {
  const env = readSettings();
  const sFirstName = url.searchParams.get("first_name") || "",
    sLastName = url.searchParams.get("last_name") || "",
    sPhoneNumber = url.searchParams.get("phone_number") || "";

  if (env.TAM3_REMOTE) {
    const searchParams = new URLSearchParams({
      api_key: env.TAM3_REMOTE_KEY,
      first_name: sFirstName,
      last_name: sLastName,
      phone_number: sPhoneNumber,
    });
    const res = await fetch(
      `${env.TAM3_REMOTE}/api/search/tickets/?${searchParams.toString()}`,
    );
    if (!res.ok) {
      return new Response(JSON.stringify([]), {
        status: res.status,
        statusText: res.statusText,
      });
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: "Fetched successfully",
      headers: { "Content-Type": "application/json" },
    });
  } else {
    const results = await db
      .select()
      .from(tickets)
      .where(
        and(
          like(tickets.first_name, `%${sFirstName}%`),
          like(tickets.last_name, `%${sLastName}%`),
          like(tickets.phone_number, `%${sPhoneNumber}%`),
        ),
      );
    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
