import { readSettings, writeSettings } from "$lib/server/settings";

export async function GET() {
    return new Response(JSON.stringify(readSettings()), {status: 200, statusText: "Settings returned successfully"});
}

export async function POST({ request }) {
    const params = await request.json();
    await writeSettings(params);
    return new Response(JSON.stringify({detail: "Settings saved successfully."}), {status: 200, statusText: "Settings saved successfully."})
}