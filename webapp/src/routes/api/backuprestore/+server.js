import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { prefixes, tickets, baskets } from "$lib/server/db/schema";
import { sql } from "drizzle-orm";

function chunkArray(arr, chunkSize) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
}

export async function GET() {
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/backuprestore/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({detail: "Unable to get backup file"}), {status: res.status, statusText: res.statusText})
        };
        const data = await res.json();
        return new Response(JSON.stringify(data), {status: 200, statusText: "Fetched backup file successfully."})
    } else {
        const p_data = await db.select().from(prefixes);
        const t_data = await db.select().from(tickets);
        const b_data = await db.select().from(baskets);
        return new Response(JSON.stringify({prefixes: p_data, tickets: t_data, baskets: b_data}), {status: 200, statusText: "Loaded backup file successfully."})
    }
}

export async function POST({ request }) {
    const req = await request.json();
    for (let prefixChunk of chunkArray(req.prefixes, 300)) {
        await db.insert(prefixes).values(prefixChunk).onConflictDoUpdate({target: prefixes.name, set: {color: sql`excluded.color`, weight: sql`excluded.weight`}});
    };
    for (let ticketChunk of chunkArray(req.tickets, 300)) {
            await db.insert(tickets).values(ticketChunk)
                .onConflictDoUpdate({target: [tickets.prefix, tickets.t_id], set: {first_name: sql`excluded.first_name`, last_name: sql`excluded.last_name`, phone_number: sql`excluded.phone_number`, preference: sql`excluded.preference`}});
    };
    for (let basketChunk of chunkArray(req.baskets, 300)) {
            await db.insert(baskets).values(basketChunk)
                .onConflictDoUpdate({target: [baskets.prefix, baskets.b_id], set: {description: sql`excluded.description`, donors: sql`excluded.donors`, winning_ticket: sql`excluded.winning_ticket`}})
    };
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/backuprestore/?api_key=${env.TAM3_REMOTE_KEY}`, {
            body: JSON.stringify(req),
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
        if (!res.ok) {
            return new Response(JSON.stringify({detail: "Error posting file."}), {status: res.status, statusText: "Error posting file."})
        }
    }
    return new Response(JSON.stringify({detail: "File uploaded successfully"}), {status: 200, statusText: "File uploaded successfully."})
}