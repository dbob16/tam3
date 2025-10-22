<script>
    import { browser } from '$app/environment';
    import FormHeader from '$lib/components/FormHeader.svelte';

    const { data } = $props();
    let prefix = {...data.prefix};
    let pagerForm = $state({id_from: 0, id_to: 0});
    let current_idx = $state(0);
    let current_tickets = $state([]);
    let copy_buffer = $state({prefix: prefix.name, t_id: 0, first_name: "", last_name: "", phone_number: "", preference: "CALL", changed: true});

    function changeFocus(idx) {
        const focusFn = document.getElementById(`${idx}_fn`);
        if (focusFn) {
            focusFn.select();
            focusFn.scrollIntoView({block: "center"});
        }
    }

    const functions = {
        refreshPage: async () => {
            if (current_tickets.length > 0) {
                functions.saveAll();
            };
            const res = await fetch(`/api/tickets/${prefix.name}/${pagerForm.id_from}/${pagerForm.id_to}`);
            if (res.ok) {
                const data = await res.json();
                current_tickets = [...data];
                setTimeout(() => changeFocus(0), 100);
            };
        },
        prevPage: () => {
            const diff = current_tickets.length;
            pagerForm.id_from = pagerForm.id_from - diff;
            pagerForm.id_to = pagerForm.id_to - diff;
            functions.refreshPage()
        },
        nextPage: () => {
            const diff = current_tickets.length;
            pagerForm.id_from = pagerForm.id_from + diff;
            pagerForm.id_to = pagerForm.id_to + diff;
            functions.refreshPage()
        },
        duplicateDown: () => {
            const next_idx = current_idx + 1;
            if (current_tickets[next_idx]) {
                current_tickets[next_idx] = {...current_tickets[current_idx], t_id: current_tickets[next_idx].t_id, changed: true};
                changeFocus(next_idx);
            } else {
                changeFocus(current_idx)
            }
        },
        duplicateUp: () => {
            const prev_idx = current_idx - 1;
            if (prev_idx >= 0) {
                current_tickets[prev_idx] = {...current_tickets[current_idx], t_id: current_tickets[prev_idx].t_id, changed: true};
                changeFocus(prev_idx);
            } else {
                changeFocus(current_idx)
            }
        },
        gotoNext: () => {
            const next_idx = current_idx + 1;
            if (current_tickets[next_idx]) {
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
            copy_buffer = {...current_tickets[current_idx]};
            changeFocus(current_idx);
        },
        paste: () => {
            current_tickets[current_idx] = {...copy_buffer, t_id: current_tickets[current_idx].t_id, changed: true};
            changeFocus(current_idx);
        },
        saveAll: async () => {
            const to_save = current_tickets.filter((ticket) => ticket.changed === true);
            const res = await fetch(`/api/tickets`, {body: JSON.stringify(to_save), method: 'POST', headers: {'Content-Type': 'application/json'}});
            if (res.ok) {
                for (let ticket of current_tickets) {ticket.changed = false};
                changeFocus(0);
            }
        }
    };
    
    if (browser) {
        document.title = `${prefix.name} Ticket Entry`;
        window.addEventListener("beforeunload", function(e) {
            if (current_tickets.filter(ticket => ticket.changed === true).length > 0) {
                e.preventDefault();
            }
        });
    }
</script>

<h1>{prefix.name} Ticket Entry</h1>
<FormHeader {prefix} {functions} bind:pagerForm />
<table>
    <thead>
        <tr>
            <th style="width: 12ch">Ticket ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Preference</th>
            <th>Changed</th>
        </tr>
    </thead>
    <tbody>
        {#each current_tickets as ticket, idx}
        <tr onfocusin={() => current_idx = idx}>
            <td>{ticket.t_id}</td>
            <td><input id="{idx}_fn" type="text" bind:value={ticket.first_name} onchange={() => ticket.changed = true}></td>
            <td><input id="{idx}_ln" type="text" bind:value={ticket.last_name} onchange={() => ticket.changed = true}></td>
            <td><input id="{idx}_pn" type="text" bind:value={ticket.phone_number} onchange={() => ticket.changed = true}></td>
            <td><select id="{idx}_pr" style="width: 100%" bind:value={ticket.preference} onchange={() => ticket.changed = true}>
                <option value="CALL">Call</option>
                <option value="TEXT">Text</option>
            </select></td>
            <td><button tabindex="-1" onclick={() => ticket.changed = !ticket.changed}>{ticket.changed ? "Y" : "N"}</button></td>
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
            border-top: solid 1px;
            border-bottom: solid 1px;
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