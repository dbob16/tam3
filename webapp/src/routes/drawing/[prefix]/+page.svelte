<script>
    import { browser } from '$app/environment';
    import FormHeader from '$lib/components/FormHeader.svelte';

    const { data } = $props();
    const prefix = {...data.prefix};
    let pagerForm = $state({id_from: 0, id_to: 0});
    let current_idx = $state(0);
    let current_drawings = $state([]);
    let copy_buffer = $state({prefix: prefix.name, b_id: 1, winning_ticket: 0, winner: ", "});

    function changeFocus(idx) {
        const focusWt = document.getElementById(`${idx}_wt`);
        if (focusWt) {
            focusWt.select();
            focusWt.scrollIntoView({block: "center"});
        }
    }

    const functions = {
        refreshPage: async () => {
            if (current_drawings.length > 0) {
                functions.saveAll()
            }
            const res = await fetch(`/api/combined/${prefix.name}/${pagerForm.id_from}/${pagerForm.id_to}`);
            if (res.ok) {
                const data = await res.json();
                current_drawings = [...data];
                setTimeout(() => changeFocus(0), 100);
            }
        },
        prevPage: () => {
            const diff = current_drawings.length;
            pagerForm.id_from -= diff;
            pagerForm.id_to -= diff;
            functions.refreshPage();
        },
        nextPage: () => {
            const diff = current_drawings.length;
            pagerForm.id_from += diff;
            pagerForm.id_to += diff;
            functions.refreshPage();
        },
        duplicateDown: () => {
            const next_idx = current_idx + 1;
            if (current_drawings[next_idx]) {
                current_drawings[next_idx] = {...current_drawings[current_idx], b_id: current_drawings[next_idx].b_id, changed: true};
                changeFocus(next_idx);
            } else {
                changeFocus(current_idx);
            }
        },
        duplicateUp: () => {
            const prev_idx = current_idx - 1;
            if (prev_idx >= 0) {
                current_drawings[prev_idx] = {...current_drawing[current_idx], b_id: current_drawings[prev_idx].b_id, changed: true};
                changeFocus(prev_idx);
            } else {
                changeFocus(current_idx);
            }
        },
        gotoNext: () => {
            const next_idx = current_idx + 1;
            if (current_drawings[next_idx]) {
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
            copy_buffer = {...current_drawings[current_idx]};
        },
        paste: () => {
            current_drawings[current_idx] = {...copy_buffer, b_id: current_drawings[current_idx], changed: true};
        },
        saveAll: async () => {
            const to_save = current_drawings.filter((drawing) => drawing.changed === true);
            const res = await fetch("/api/combined", {body: JSON.stringify(to_save), method: 'POST', headers: {'Content-Type': 'application/json'}});
            if (res.ok) {
                for (let drawing of current_drawings) {drawing.changed = false};
                changeFocus(0);
            }
        }
    }

    if (browser) {
        document.title = `${prefix.name} Drawing Form`
        window.addEventListener("beforeunload", function(e) {
            if (current_drawings.filter(drawing => drawing.changed === true).length > 0) {
                e.preventDefault();
            }
        });
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
        <tr onfocusin={() => current_idx = idx}>
            <td>{drawing.b_id}</td>
            <td><input type="number" id="{idx}_wt" bind:value={drawing.winning_ticket} onchange={async () => {
                drawing.changed = true;
                const res = await fetch(`/api/tickets/${prefix.name}/${drawing.winning_ticket}`);
                if (res.ok) {
                    const t_data = await res.json()
                    drawing.winner = `${t_data.last_name}, ${t_data.first_name}`
                }
            }}></td>
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
        tbody tr:focus-within td:first-child {
            font-weight: bold;
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