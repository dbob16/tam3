import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";
import { prefixes } from "$lib/server/db/schema";
import { env } from "$env/dynamic/private";

export async function GET({ params }) {
    let { name } = params;
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/prefixes/${name}/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({status: "Issue getting prefix."}), {status: res.status, statusText: res.statusText});
        }
        const data = await res.json();
        return new Response(JSON.stringify(data), {status: 200, statusText: "Prefix fetched from remote successfully."})
    } else {
        const data = await db.select().from(prefixes).where(eq(prefixes.name, name));
        if (data[0]) {
            return new Response(JSON.stringify(data[0]), {status: 200, statusText: "Prefix loaded successfully.", headers: {'Content-Type': 'application/json'}})
        } else {
            return new Response(JSON.stringify({status: "Issue loading prefix"}), {status: 404, statusText: "Prefix not found."})
        }
    }
};

export async function DELETE({ params }) {
    let { name } = params;
    await db.delete(prefixes).where(eq(prefixes.name, name))
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/prefixes/?api_key=${env.TAM3_REMOTE_KEY}&prefix_name=${name}`);
        if (!res.ok) {
            return new Response(JSON.stringify({status: "Issue deleting prefix."}), {status: res.status, statusText: res.statusText});
        } else {
            return new Response(JSON.stringify({status: "Prefix deleted from remote successfully"}), {status: 200, statusText: res.statusText});
        };
    } else {
        return new Response(JSON.stringify({status: "Prefix deleted successfully"}), {status: 200, statusText: "Prefix deleted successfully."})
    }
}