export async function load({ fetch, params }) {
    const { prefix } = await params;
    const res = await fetch(`/api/prefixes/${prefix}`);
    const prefix_data = await res.json();
    return {prefix: prefix_data}
}