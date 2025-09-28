import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { counts } from "$lib/server/db/schema";

export async function GET() {
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/counts/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({detail: "Unable to fetch counts."}), {status: res.status, statusText: res.statusText})
        };
        const data = await res.json();
        return new Response(JSON.stringify(data), {status: 200, statusText: "Fetched counts successfully."})
    } else {
        const data = await db.select().from(counts);
        return new Response(JSON.stringify(data), {status: 200, statusText: "Loaded counts successfully"})
    }
}