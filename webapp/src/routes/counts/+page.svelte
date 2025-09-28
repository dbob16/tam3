<script>
    import { browser } from '$app/environment';

    const { data } = $props();
    const counts = data.counts;
    const prefixes = data.prefixes;

    let colormap = {};
    for (let prefix of prefixes) {colormap[prefix.name] = prefix.color}

    if (browser) {
        document.title = "Counts of tickets entered";
        setTimeout(() => window.location.reload(true), 60000);
    }
</script>

<h1>Counts of tickets entered</h1>
<table>
    <thead>
        <tr>
            <th>Prefix</th>
            <th>Total Tickets</th>
            <th>Unique Buyers</th>
        </tr>
    </thead>
    <tbody>
        {#each counts as count}
        <tr class={colormap[count.prefix]}>
            <td>{count.prefix}</td>
            <td>{parseInt(count.total_sold).toLocaleString()}</td>
            <td>{parseInt(count.unique_sold).toLocaleString()}</td>
        </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        thead {
            text-align: left;
        }
        tbody tr {
            color: var(--button-fg);
            background-color: var(--button-bg);
            td:first-child {
                font-weight: bold;
                font-style: italic;
            }
        }
        tbody tr td {
            border: solid 1px black;
            padding: 0.3rem;
        }
        tbody tr:last-child {
            color: #000000;
            background-color: #dfdfdf;
            font-weight: bold;
        }
    }
</style>