<script>
    import { env } from "$env/dynamic/public";
    import { browser } from "$app/environment";

    const { data } = $props();
    const prefix = $derived(data.prefix);
    const report_data = $derived(data.report);
    function copyReportData() {
        return [...report_data];
    }
    let show_data = $state(copyReportData());
    let report_subject = $state("All Preferences");
</script>

<svelte:head>
    <title>{prefix.name} Report By Name</title>
</svelte:head>

<div id="reportheader">
    <div class="flex-row-space {prefix.color}">
        <div class="flex-row">
            <button
                class="styled"
                onclick={() => {
                    show_data = copyReportData();
                    report_subject = "All Preferences";
                }}>All Preferences</button
            >
            <button
                class="styled"
                onclick={() => {
                    show_data = [
                        ...report_data.filter(
                            (entry) => entry.preference === "CALL",
                        ),
                    ];
                    report_subject = "CALL Preference";
                }}>Call</button
            >
            <button
                class="styled"
                onclick={() => {
                    show_data = [
                        ...report_data.filter(
                            (entry) => entry.preference === "TEXT",
                        ),
                    ];
                    report_subject = "TEXT Preference";
                }}>Text</button
            >
        </div>
        <div class="flex-row">
            <button class="styled" onclick={() => window.print()}>Print</button>
        </div>
    </div>
</div>
<table>
    <thead>
        <tr>
            <th colspan="90"
                ><h1>{prefix.name} - Report - {report_subject}</h1></th
            >
        </tr>
        <tr>
            <th>Winner Name</th>
            <th>Phone Number</th>
            <th>Basket ID</th>
            <th>Ticket #</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {#each show_data as report_entry}
            <tr>
                <td>{report_entry.winner_name}</td>
                <td>{report_entry.phone_number}</td>
                <td>{report_entry.b_id}</td>
                <td>{report_entry.winning_ticket}</td>
                <td>{report_entry.description}</td>
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
