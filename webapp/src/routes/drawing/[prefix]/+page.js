export async function load({ params, fetch }) {
    const res = await fetch(`/api/prefixes/${params.prefix}`);
    const prefix_data = await res.json();
    return {prefix: prefix_data}
}