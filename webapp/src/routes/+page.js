export async function load({ fetch }) {
    const res = await fetch('/api/prefixes');
    const check_res = await fetch('/api');
    const check_json = await check_res.json();
    if (res.ok) {
        const data = await res.json();
        return { prefixes: data, status: check_json.detail }
    } else {
        return { prefixes: [], status: check_json.detail }
    }
}