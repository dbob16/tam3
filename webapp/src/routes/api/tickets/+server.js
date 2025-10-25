import { db } from "$lib/server/db";
import { sql } from "drizzle-orm";
import { tickets } from "$lib/server/db/schema";
import { env } from "$env/dynamic/private";
import { chunkArray } from "$lib/server/chunkArray";

export async function GET() {
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/tickets/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({details: "Couldn't fetch tickets."}), {
                status: res.status,
                statusText: res.statusText,
                headers: {'Content-Type': 'applicaiton/json'}
            })
        };
        const data = await res.json();
        return new Response(JSON.stringify(data), {
            status: 200, 
            statusText: "Tickets fetched successfully.",
            headers: {'Content-Type': 'application/json'}
        })
    } else {
        const data = await db.select().from(tickets);
        return new Response(JSON.stringify(data), {
            status: 200,
            statusText: "Tickets loaded successfully.",
            headers: {'Content-Type': 'application/json'}
        })
    };
};

export async function POST({ request }) {
    const i_tickets = await request.json();
    for (let ticketChunk of chunkArray(i_tickets, 300)) {
        await db.insert(tickets).values(ticketChunk)
            .onConflictDoUpdate({target: [tickets.prefix, tickets.t_id], set: {first_name: sql`excluded.first_name`, last_name: sql`excluded.last_name`, phone_number: sql`excluded.phone_number`, preference: sql`excluded.preference`}});
    };
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/tickets/?api_key=${env.TAM3_REMOTE_KEY}`, {
            body: JSON.stringify([...i_tickets]), method: 'POST', headers: {'Content-Type': 'application/json'}
        });
        if (!res.ok) {
            return new Response(JSON.stringify({details: "Issue posting tickets to remote."}), {status: res.status, statusText: res.statusText})
        };
        const data = await res.json();
    };
    return new Response(JSON.stringify({details: "Posted tickets successfully."}), {status: 200, statusText: "Posted tickets successfully."})
}