<script>
    import { browser } from '$app/environment';
    import FormHeader from '$lib/components/FormHeader.svelte';

    const { data } = $props();
    const prefix = {...data.prefix};
    let pagerForm = $state({id_from: 0, id_to: 0});
    let current_idx = $state(0);
    let current_drawings = $state([]);
    let copy_buffer = $state({prefix: prefix.name, b_id: 1, winning_ticket: 0, winner: ", "});


    const functions = {}

    if (browser) {
        document.title = `${prefix.name} Drawing Form`
    }
</script>

<h1>{prefix.name} Drawing Form</h1>
<FormHeader {prefix} {functions} bind:pagerForm />
<table>
    <thead>
        <tr>
            <th style="width: 12ch">Basket ID</th>
            <th style="width: 20ch">Winning Number</th>
            <th>Winner</th>
            <th style="width: 20ch">Changed</th>
        </tr>
    </thead>
    <tbody>
        {#each current_drawings as drawing, idx}
        <tr>
            <td>{drawing.b_id}</td>
            <td><input type="number" id="{idx}_wt" bind:value={drawing.winning_ticket}></td>
            <td>{drawing.winner}</td>
            <td><button tabindex="-1">{drawing.changed ? "Y" : "N"}</button></td>
        </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        th {
            text-align: left;
        }
        tbody tr:nth-child(2n) {
            background-color: #eeeeee;
        }
        input {
            background: transparent;
            border: solid 1px #000000;
        }
        input, button {
            display: block;
            box-sizing: border-box;
            width: 100%;
        }
    }
</style>