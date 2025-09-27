<script>
    import { browser } from '$app/environment';
    import FormHeader from '$lib/components/FormHeader.svelte';
    import hotkeys from 'hotkeys-js';

    const { data } = $props();
    const prefix = {...data.prefix};
    let pagerForm = $state({id_from: 0, id_to: 0});
    let current_idx = $state(0);
    let current_baskets = $state([]);
    let copy_buffer = $state({prefix: prefix.name, b_id: 0, description: "", donors: "", winning_ticket: 0});

    function changeFocus(idx) {
        const focusDe = document.getElementById(`${idx}_de`);
        if (focusDe) {
            focusDe.select();
        }
    }

    const functions = {
        refreshPage: async () => {
            if (current_baskets.length > 0) {
                functions.saveAll()
            }
            const res = await fetch(`/api/baskets/${prefix.name}/${pagerForm.id_from}/${pagerForm.id_to}`);
            if (res.ok) {
                const data = await res.json();
                current_baskets = [...data];
                setTimeout(() => changeFocus(0), 100)
            }
        },
        prevPage: () => {
            const diff = current_baskets.length;
            pagerForm.id_from = pagerForm.id_from - diff;
            pagerForm.id_to = pagerForm.id_to - diff;
            functions.refreshPage();
        },
        nextPage: () => {
            const diff = current_baskets.length;
            pagerForm.id_from = pagerForm.id_from + diff;
            pagerForm.id_to = pagerForm.id_to + diff;
            functions.refreshPage();
        },
        duplicateDown: () => {
            const next_idx = current_idx + 1;
            if (current_baskets[next_idx]) {
                current_baskets[next_idx] = {...current_baskets[current_idx], b_id: current_baskets[next_idx].b_id, winning_ticket: current_baskets[next_idx].winning_ticket, changed: true};
                changeFocus(next_idx);
            } else {
                changeFocus(next_idx);
            }
        },
        duplicateUp: () => {
            const prev_idx = current_idx - 1;
            if (prev_idx >= 0) {
                current_baskets[prev_idx] = {...current_baskets[current_idx], b_id: current_baskets[prev_idx].b_id, winning_ticket: current_baskets[prev_idx].winning_ticket, changed: true};
                changeFocus(prev_idx);
            } else {
                changeFocus(prev_idx);
            }
        },
        gotoNext: () => {
            const next_idx = current_idx + 1;
            if (current_baskets[next_idx]) {
                changeFocus(next_idx);
            } else {
                changeFocus(current_idx);
            }
        },
        gotoPrev: () => {
            const prev_idx = current_idx - 1;
            if (prev_idx >= 0) {
                changeFocus(prev_idx);
            } else {
                changeFocus(current_idx);
            }
        },
        copy: () => {
            copy_buffer = {...current_baskets[current_idx]};
        },
        paste: () => {
            current_baskets[current_idx] = {...copy_buffer, b_id: current_baskets[current_idx].b_id, changed: true}
        },
        saveAll: async () => {
            const to_save = current_baskets.filter((basket) => basket.changed === true);
            const res = await fetch(`/api/baskets`, {body: JSON.stringify(to_save), method: 'POST', headers: {'Content-Type': 'application/json'}});
            if (res.ok) {
                for (let basket of current_baskets) {basket.changed = false};
                changeFocus(0);
            };
        }
    }

    if (browser) {
        document.title = `${prefix.name} Basket Entry`
    }
</script>

<h1>{prefix.name} Basket Entry</h1>
<FormHeader {prefix} {functions} bind:pagerForm />
<table>
    <thead>
        <tr>
            <th style="width: 12ch">Basket ID</th>
            <th>Description</th>
            <th>Donors</th>
            <th>Changed</th>
        </tr>
    </thead>
    <tbody>
        {#each current_baskets as basket, idx}
        <tr onfocusin={() => current_idx = idx}>
            <td>{basket.b_id}</td>
            <td><input type="text" id="{idx}_de" onchange={() => basket.changed = true} bind:value={basket.description}></td>
            <td><input type="text" id="{idx}_do" onchange={() => basket.changed = true} bind:value={basket.donors}></td>
            <td><button tabindex="-1" onclick={() => basket.changed = !basket.changed}>{basket.changed ? "Y" : "N"}</button></td>
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