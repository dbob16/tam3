<script>
    import { browser } from "$app/environment";
    const { data } = $props();

    function copySettings() {
        return { ...data.settings };
    }
    let stagingSettings = $state(copySettings());
    let status = $state("");

    async function saveChanges() {
        const res = await fetch("/api/settings", {
            method: "POST",
            body: JSON.stringify(stagingSettings),
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            status = "Changes saved successfully";
            setTimeout(() => {
                status = "";
            }, 5000);
        } else {
            status =
                "Error saving changes, check config file path, make sure folder exists";
            setTimeout(() => {
                status = "";
            }, 5000);
        }
    }

    function cancelChanges() {
        stagingSettings = { ...data.settings };
    }

    if (browser) {
        document.title = "TAM3 - Settings";
    }
</script>

<h1>Settings</h1>

<div>
    <h2>Remote Server</h2>
    <div><strong>Address:</strong></div>
    <div><em>For example: https://ip_or_hostname:8443</em></div>
    <div><input type="text" bind:value={stagingSettings.TAM3_REMOTE} /></div>
    <div><strong>API Key:</strong></div>
    <div class="flex-row">
        <input type="password" bind:value={stagingSettings.TAM3_REMOTE_KEY} />
        <button
            class="styled"
            onclick={() => {
                stagingSettings.TAM3_REMOTE_KEY = "";
            }}>Clear</button
        >
    </div>
</div>

<br />

<div class="flex-row">
    <button class="styled" onclick={saveChanges}>Save</button>
    <button class="styled" onclick={cancelChanges}>Cancel</button>
</div>

<br />

<div class="status">
    <div>{status}</div>
</div>
