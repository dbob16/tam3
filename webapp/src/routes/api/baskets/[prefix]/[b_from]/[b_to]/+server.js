import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { baskets } from "$lib/server/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET({ params }) {
    let n_b_from = parseInt(params.b_from), n_b_to = parseInt(params.b_to);
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/baskets/${n_b_from}/${n_b_to}/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({detail: "Unable to fetch baskets"}), {status: res.status, statusText: res.statusText});
        };
        const data = await res.json();
        return new Response(JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'},
            status: 200,
            statusText: "Baskets fetched successfully"
        })
    } else {
        let r_dict = {};
        for (let i=n_b_from; i <= n_b_to; i++) {
            let data = await db.select().from(baskets).where(and(eq(baskets.prefix, params.prefix), eq(baskets.b_id, i)));
            if (data[0]) {
                r_dict[i] = {...data[0], changed: false};
            } else {
                r_dict[i] = {prefix: params.prefix, b_id: i, description: "", donors: "", winning_ticket: 0, changed: false};
            }
        };
        return new Response(JSON.stringify(Object.values(r_dict)), {
            headers: {'Content-Type': 'application/json'},
            status: 200,
            statusText: "Baskets loaded successfully."
        })
    }
}