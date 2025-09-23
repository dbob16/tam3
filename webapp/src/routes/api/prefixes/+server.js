import { db } from "$lib/server/db";
import { prefixes } from "$lib/server/db/schema";
import { env } from "$env/dynamic/private";

export async function GET() {
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/prefixes/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({status: "Issue getting prefixes from remote."}), {status: res.status, statusText: res.statusText});
        }
        const data = await res.json();
        return new Response(JSON.stringify(data), {status: 200, statusText: "Prefixes fetched from remote successfully."});
    } else {
        const data = await db.select().from(prefixes).orderBy(prefixes.weight, prefixes.name);
        return new Response(JSON.stringify(data), {status: 200, statusText: "Prefixes loaded successfully."});
    }
}

export async function POST({ request }) {
    const { name, color, weight } = await request.json();
    console.log({name, color, weight})
    await db.insert(prefixes).values({name: name, color: color, weight: weight}).onConflictDoUpdate({target: prefixes.name, set: {color: color, weight: weight}});
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/prefixes/?api_key=${env.TAM3_REMOTE_KEY}`, {
            body: JSON.stringify({name, color, weight}), method: 'POST', headers: {'Content-Type': 'application/json'}
        });
        if (!res.ok) {
            return new Response(JSON.stringify({status: "Issue posting prefixes"}), {status: res.status, statusText: res.statusText});
        }
        const data = await res.json();
    }
    return new Response(JSON.stringify({status: "Prefix posted successfully."}), {status: 200, statusText: "Prefix posted successfully."})
}