<script>
    import { browser } from "$app/environment";

    let all_prefixes = $state([]);
    let prefix_form = $state({name: "", color: "white", weight: 0})
    let status = $state(``)

    async function getPrefixes() {
        const res = await fetch("/api/prefixes/");
        if (!res.ok) {
            status = `[${res.status}]: ${res.statusText}`;
        } else {
            const data = await res.json();
            if (data[0]) {
                all_prefixes = [...data];
            };
            status = `${res.statusText}`;
        }
    }

    async function savePrefix() {
        const post_body = JSON.stringify({...prefix_form});
        const res = await fetch("/api/prefixes/", {
            method: 'POST',
            body: JSON.stringify({...prefix_form}),
            headers: {'Content-Type': 'application/json'}
        });
        if (!res.ok) {
            status = `[${res.status}]: ${res.statusText}`;
        } else {
            status = `${res.statusText}`;
            getPrefixes();
        }
    }

    async function delPrefix(name) {
        const res = await fetch(`/api/prefixes/${name}`, { method: 'DELETE' });
        if (!res.ok) {
            status = `[${res.status}]: ${res.statusText}`;
        } else {
            status = `${res.statusText}`;
            getPrefixes();
        };
    }

    if (browser) {
        getPrefixes()
    }
</script>

<h1>Prefix Editor</h1>
<div class="form">
    <div>
        <div>Name</div>
        <div><input type="text" class="one-hundred" bind:value={prefix_form.name}></div>
    </div>
    <div>
        <div>Color</div>
        <div><select style="display: block; width: 100%" bind:value={prefix_form.color}>
            <option value="white">White</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
        </select></div>
    </div>
    <div>
        <div>Weight</div>
        <div><input class="one-hundred" type="number" bind:value={prefix_form.weight}></div>
    </div>
    <div>
        <div>Commands</div>
        <div class="flex-row {prefix_form.color}">
            <button class="styled" onclick={() => {
                if (prefix_form.name !== "") {
                    savePrefix();
                };
            }}>Save/Update</button>
            <button class="styled" onclick={() => {
                prefix_form = {name: "", color: "white", weight: 0};
            }}>Reset</button>
        </div>
    </div>
</div>
<div class="prefix-list">
    <div>
        <div>Name</div>
        <div>Color</div>
        <div>Weight</div>
        <div>Commands</div>
    </div>
    {#each all_prefixes as prefix}
    <div class="row">
        <div>{prefix.name}</div>
        <div>{prefix.color}</div>
        <div>{prefix.weight}</div>
        <div class="flex-row {prefix.color}">
            <button class="styled" onclick={() => {
                prefix_form = {...prefix}
            }}>Edit</button>
            <button class="styled" onclick={() => {
                delPrefix(prefix.name);
            }}>Delete</button>
        </div>
    </div>
    {/each}
</div>
<div class="status">
    {status}
</div>

<style>
    .one-hundred {
        display: block;
        width: 100%;
        box-sizing: border-box;
    }

    .form {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }

    .prefix-list {
        margin-top: 3rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .prefix-list div {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: center;
        gap: 1rem;
        padding: 0.25rem;
    }

    .prefix-list div.row:nth-child(2n) {
        background: #ddd;
    }

    .status {
        position: fixed;
        bottom: 0;
        background: #fff;
    }
</style>