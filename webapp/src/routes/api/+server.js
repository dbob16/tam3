import { env } from "$env/dynamic/private";

export async function GET() {
    if (env.TAM3_REMOTE) {
        const res = await fetch(`${env.TAM3_REMOTE}/api/?api_key=${env.TAM3_REMOTE_KEY}`);
        if (!res.ok) {
            return new Response(JSON.stringify({detail: "Server setup but is getting an error. Check TAM3_REMOTE and TAM3_REMOTE_KEY env variables."}))
        };
        const data = await res.json();
        if (data.auth) {
            return new Response(JSON.stringify({detail: "Remote connection is successful."}))
        } else {
            return new Response(JSON.stringify({detail: "Server is connecting but the api key isn't checking out."}))
        }
    } else {
        return new Response(JSON.stringify({detail: "Operating in offline mode."}))
    }
}