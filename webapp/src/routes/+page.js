export async function load({ fetch }) {
    const res = await fetch('/api/prefixes');
    if (res.ok) {
        const data = await res.json();
        return { prefixes: data, status: "Prefixes fetched successfully." }
    } else {
        return { prefixes: [], status: "Error fetching prefixes."}
    }
}