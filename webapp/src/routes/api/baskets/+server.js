import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { sql } from "drizzle-orm";
import { baskets } from "$lib/server/db/schema";
import { chunkArray } from "$lib/server/chunkArray";

export async function GET() {
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/baskets/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({"detail": "Unable to fetch Baskets"}), {status: res.status, statusText: res.statusText})
        };
        const data = await res.json();
        return new Response(JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'},
            status: 200,
            statusText: "Baskets fetched successfully."
        })
    } else {
        const data = await db.select().from(baskets);
        return new Response(JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'},
            status: 200,
            statusText: "Baskets loaded successfully."
        })
    }
}

export async function POST({ request }) {
        const i_baskets = await request.json();
        for (let basketChunk of chunkArray(i_baskets, 300)) {
            await db.insert(baskets).values(basketChunk)
                .onConflictDoUpdate({target: [baskets.prefix, baskets.b_id], set: {description: sql`excluded.description`, donors: sql`excluded.donors`, winning_ticket: sql`excluded.winning_ticket`}})
        };
        if (env.TAM3_REMOTE) {
            const res = await fetch(`${env.TAM3_REMOTE}/api/baskets/?api_key=${env.TAM3_REMOTE_KEY}`, {
                body: JSON.stringify([...i_baskets]), method: 'POST', headers: {'Content-Type': 'application/json'}
            });
            if (!res.ok) {
                return new Response(JSON.stringify({details: "Issue posting baskets to remote."}), {status: res.status, statusText: res.statusText})
            };
            const data = await res.json();
        };
        return new Response(JSON.stringify({details: "Posted baskets successfully."}), {status: 200, statusText: "Posted baskets successfully."})
}