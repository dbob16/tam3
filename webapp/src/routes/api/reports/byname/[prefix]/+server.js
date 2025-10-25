import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { report } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET({ params }) {
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/reports/byname/${params.prefix}/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({detail: "Unable to fetch report."}), {status: res.status, statusText: res.statusText})
        }
        const data = await res.json();
        return new Response(JSON.stringify(data), {status: 200, statusText: "Fetched report successfully."})
    } else {
        const data = await db.select().from(report).where(eq(report.prefix, params.prefix));
        return new Response(JSON.stringify(data), {status: 200, statusText: "Loaded report successfully."})
    }
}