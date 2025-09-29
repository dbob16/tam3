import { db } from "$lib/server/db";
import { prefixes, tickets, baskets } from "$lib/server/db/schema";

export async function GET() {
        const p_data = await db.select().from(prefixes);
        const t_data = await db.select().from(tickets);
        const b_data = await db.select().from(baskets);
        return new Response(JSON.stringify({prefixes: p_data, tickets: t_data, baskets: b_data}), {status: 200, statusText: "Loaded backup file successfully."})
}