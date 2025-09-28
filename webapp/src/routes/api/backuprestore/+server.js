import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { prefixes, tickets, baskets } from "$lib/server/db/schema";

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
    for (let prefix of req.prefixes) {
        await db.insert(prefixes).values({name: prefix.name, color: prefix.color, weight: prefix.weight}).onConflictDoUpdate({target: prefixes.name, set: {color: prefix.color, weight: prefix.weight}});
    };
    for (let ticket of req.tickets) {
            await db.insert(tickets).values({prefix: ticket.prefix, t_id: ticket.t_id, first_name: ticket.first_name, last_name: ticket.last_name, phone_number: ticket.phone_number, preference: ticket.preference})
                .onConflictDoUpdate({target: [tickets.prefix, tickets.t_id], set: {first_name: ticket.first_name, last_name: ticket.last_name, phone_number: ticket.phone_number, preference: ticket.preference}});
    };
    for (let basket of req.baskets) {
            await db.insert(baskets).values({prefix: basket.prefix, b_id: basket.b_id, description: basket.description, donors: basket.donors, winning_ticket: basket.winning_ticket})
                .onConflictDoUpdate({target: [baskets.prefix, baskets.b_id], set: {description: basket.description, donors: basket.donors, winning_ticket: basket.winning_ticket}})
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