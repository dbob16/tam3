import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { baskets, combined } from "$lib/server/db/schema";

export async function GET() {
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
    const r_data = await request.json()
    for (let winner of r_data) {
        await db.insert(baskets).values({prefix: winner.prefix, b_id: winner.b_id, winning_ticket: winner.winning_ticket})
            .onConflictDoUpdate({target: [baskets.prefix, baskets.b_id], set: {winning_ticket: winner.winning_ticket}})
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