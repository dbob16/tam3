export async function load({ fetch }) {
    const res = await fetch('/api/counts');
    const c_data = await res.json();
    const p_res = await fetch('/api/prefixes');
    const p_data = await p_res.json();
    return {counts: c_data, prefixes: p_data}
}