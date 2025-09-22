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
        console.log(post_body);
        const res = await fetch("/api/prefixes/", {
            method: 'POST',
            body: JSON.stringify({...prefix_form}),
            headers: {'Content-Type': 'application/json'}
        });
        if (!res.ok) {
            status = `[${res.status}]: ${res.statusText}`;
        } else {
            status = `${res.statusText}`;
            getPrefixes()
        }
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
        <div>
            <button onclick={savePrefix}>Save/Update</button>
            <button onclick={() => {
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
    <div>
        <div>{prefix.name}</div>
        <div>{prefix.color}</div>
        <div>{prefix.weight}</div>
        <div>
            <button>Edit</button>
            <button>Delete</button>
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
    }

    .prefix-list div {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
    }

    .status {
        position: fixed;
        bottom: 0;
        background: #fff;
    }
</style>