import { readSettings } from "$lib/server/settings";
import { db } from "$lib/server/db";
import { sql } from "drizzle-orm";
import { baskets, combined } from "$lib/server/db/schema";
import { chunkArray } from "$lib/server/chunkArray";

export async function GET() {
    const env = readSettings();
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/combined/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({detail: "Error fetching winners"}), {
                status: res.status,
                statusText: res.statusText
            })
        };
        const data = await res.json();
        return new Response(JSON.stringify(data), {status: 200, statusText: "Winners fetched successfully."})
    } else {
        const data = await db.select().from(combined);
        return new Response(JSON.stringify(data), {status: 200, statusText: "Winners loaded successfully."})
    }
}

export async function POST({ request }) {
    const env = readSettings();
    const r_data = await request.json()
    for (let winnerChunk of chunkArray(r_data, 300)) {
        await db.insert(baskets).values(winnerChunk)
            .onConflictDoUpdate({target: [baskets.prefix, baskets.b_id], set: {winning_ticket: sql`excluded.winning_ticket`}})
    }
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/combined/?api_key=${env.TAM3_REMOTE_KEY}`, {
            body: JSON.stringify(r_data),
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
        if (!res.ok) {
            return new Response(JSON.stringify({detail: "Error posting winners."}), {status: res.status, statusText: res.statusText})
        };
    }
    return new Response(JSON.stringify({detail: "Posted winners successfully."}))
}