import { db } from "$lib/server/db";
import { tickets } from "$lib/server/db/schema";
import { env } from "$env/dynamic/private";
import { eq, and } from "drizzle-orm";

export async function GET({ params }) {
    let n_t_from = parseInt(params.t_from), n_t_to = parseInt(params.t_to);
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/tickets/${params.prefix}/${n_t_from}/${n_t_to}/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({details: "Unable to fetch tickets."}), {status: res.status, statusText: res.statusText})
        };
        const data = await res.json();
        return new Response(JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'},
            status: 200, 
            statusText: "Tickets fetched successfully."
        })
    } else {
        let r_dict = {};
        for (let i=n_t_from; i <= n_t_to; i++) {
            let data = await db.select().from(tickets).where(and(eq(tickets.prefix, params.prefix), eq(tickets.t_id, i)));
            if (data[0]) {
                r_dict[i] = {...data[0], changed: false};
            } else {
                r_dict[i] = {prefix: params.prefix, t_id: i, first_name: "", last_name: "", phone_number: "", preference: "CALL", changed: false};
            }
        };
        return new Response(JSON.stringify(Object.values(r_dict)), {
            headers: {'Content-Type': 'application/json'},
            status: 200, 
            statusText: "Tickets loaded successfully."
        })
    }
}