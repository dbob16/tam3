import { readSettings } from "$lib/server/settings";
import { db } from "$lib/server/db";
import { combined } from "$lib/server/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET({ params }) {
    const env = readSettings();
    const n_b_from = parseInt(params.b_from), n_b_to = parseInt(params.b_to);
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/combined/${params.prefix}/${n_b_from}/${n_b_to}/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({detail: "Unable to fetch winners"}), {status: res.status, statusText: res.statusText})
        };
        const data = await res.json();
        return new Response(JSON.stringify(data), {status: 200, statusText: "Tickets fetched successfully."})
    } else {
        let r_dict = {};
        for (let i = n_b_from; i <= n_b_to; i++) {
            let data = await db.select().from(combined).where(and(eq(combined.prefix, params.prefix), eq(combined.b_id, i)));
            if (data[0]) {
                r_dict[i] = {...data[0], changed: false};
            } else {
                r_dict[i] = {prefix: params.prefix, b_id: i, winning_ticket: 0, winner: ", ", changed: false}
            };
        };
        return new Response(JSON.stringify(Object.values(r_dict)), {status: 200, statusText: "Tickets loaded successfully."})
    }
}