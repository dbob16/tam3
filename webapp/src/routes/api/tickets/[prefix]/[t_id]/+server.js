import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { tickets } from "$lib/server/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET({ params }) {
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/tickets/${params.prefix}/${params.t_id}/?api_key=${env.TAM3_REMOTE}`);
        if (!res.ok) {
            return new Response(JSON.stringify({detail: "Unable to fetch ticket."}), {status: res.status, statusText: res.statusText})
        }
        const data = await res.json()
        return new Response(JSON.stringify(data), {status: 200, statusText: "Ticket fetched successfully."})
    } else {
        let r_data = {};
        const data = await db.select().from(tickets).where(and(eq(tickets.prefix, params.prefix), eq(tickets.t_id, params.t_id)));
        if (data[0]) {
            r_data = {...data[0], changed: false};
        } else {
            r_data = {prefix: params.prefix, t_id: params.t_id, first_name: "", last_name: "", phone_number: "", preference: "CALL", changed: false};
        };
        return new Response(JSON.stringify(r_data), {status: 200, statusText: "Ticket loaded successfully."})
    }
}