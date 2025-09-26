import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { combined } from "$lib/server/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET({ params }) {
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/combined/${params.prefix}/${params.b_id}/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({detail: "Unable to fetch winner"}), {status: res.status, statusText: res.statusText})
        };
        const data = await res.json();
        return new Response(JSON.stringify(data), {status: 200, statusText: "Fetched winner successfully."})
    } else {
        let r_data = {}
        const data = await db.select().from(combined).where(and(eq(combined.prefix, params.prefix), eq(combined.b_id, params.b_id)));
        if (data[0]) {
            r_data = {...data[0], changed: false};
        } else {
            r_data = {prefix: params.prefix, b_id: parseInt(params.b_id), winning_ticket: 0, winner: ", ", changed: false}
        }
        return new Response(JSON.stringify(r_data), {status: 200, statusText: "Loaded winner successfully."});
    }
}