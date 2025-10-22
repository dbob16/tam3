<script>
    import { env } from '$env/dynamic/public';
    import { browser } from '$app/environment';

    const { data } = $props();
    const prefix = {...data.prefix};
    const report_data = data.report;
    let show_data = $state([...report_data]);
    let report_subject = $state("All Preferences");

    if (browser) {
        document.title = `${prefix.name} Report By Basket ID`
    }
</script>

<div id="reportheader">
    <div class="flex-row-space {prefix.color}">
        <div class="flex-row">
            <button class="styled" onclick={() => {
                show_data = [...report_data];
                report_subject = "All Preferences";
            }}>All Preferences</button>
            <button class="styled" onclick={() => {
                show_data = [...report_data.filter((entry) => entry.preference === "CALL")];
                report_subject = "CALL Preference"
            }}>Call</button>
            <button class="styled" onclick={() => {
                show_data = [...report_data.filter((entry) => entry.preference === "TEXT")];
                report_subject = "TEXT Preference";
            }}>Text</button>
        </div>
        <div class="flex-row">
            <button class="styled" onclick={() => window.print()}>Print</button>
        </div>
    </div>
</div>
<table>
<thead>
    <tr>
        <th colspan="90"><h1>{prefix.name} - Report - {report_subject}</h1></th>
    </tr>
    <tr>
        <th>Basket ID</th>
        <th>Description</th>
        <th>Ticket #</th>
        <th>Winner Name</th>
        <th>Phone Number</th>
    </tr>
</thead>
<tbody>
    {#each show_data as report_entry}
    <tr>
        <td>{report_entry.b_id}</td>
        <td>{report_entry.description}</td>
        <td>{report_entry.winning_ticket}</td>
        <td>{report_entry.winner_name}</td>
        <td>{report_entry.phone_number}</td>
    </tr>
    {/each}
</tbody>
<tfoot>
    <tr>
        <td colspan="3">{env.PUBLIC_TAM3_VENUE || ""}</td>
        <td colspan="2" style="text-align: right">TAM3 by Dilan Gilluly</td>
    </tr>
</tfoot>
</table>

<style>
    table {
        width: 100%;
        th {
            text-align: left;
        }
        td {
            border: solid 1px black;
            padding: 0.2rem;
        }
        
    }
    table tbody tr:nth-child(2n) {
        background-color: #dddddd;
    }
    table tfoot td {
        border: none;
    }
    @media print {
        #reportheader {
            display: none;
        }
        @page {
            margin: 0.25in;
        }
    }
</style>