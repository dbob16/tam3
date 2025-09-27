export async function load({ fetch, params }) {
    let res = await fetch(`/api/prefixes/${params.prefix}`);
    const prefix_data = await res.json();
    res = await fetch(`/api/reports/bybasket/${params.prefix}`);
    const report_data = await res.json()
    return {prefix: prefix_data, report: report_data}
}