import { db } from "$lib/server/db";
import { tickets } from "$lib/server/db/schema";
import { env } from "$env/dynamic/private";

export async function GET({ params }) {
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/tickets/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({details: "Couldn't fetch tickets."}), {
                status: res.status,
                statusText: res.statusText
            });
        };
        const data = await res.json();
        return new Response(JSON.stringify(data), {status: 200, statusText: "Tickets fetched successfully."})
    } else {
        const data = await db.select().from(tickets);
        return new Response(JSON.stringify(data), {status: 200, statusText: "Tickets loaded successfully."})
    };
}